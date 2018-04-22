import React from 'react';
import { Howl, Howler } from 'howler';

// Default Sounds
import BirdSound from '../sounds/birds.mp3';
import Clap from '../sounds/clap.wav';
import Applause from '../sounds/applause.wav';
import Ping from '../sounds/beep.wav';
import Waves from '../sounds/waves.wav'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        var sound1 = new Howl({
            src: [BirdSound],
            onend: this.previewEnd.bind(this)
        });
        
        var sound2 = new Howl({
            src: [Clap],
            onend: this.previewEnd.bind(this)
        });

        var sound3 = new Howl({
            src: [Applause],
            onend: this.previewEnd.bind(this)
        });

        var sound4 = new Howl({
            src: [Ping],
            onend: this.previewEnd.bind(this)
        });

        var sound5 = new Howl({
            src: [Waves],
            onend: this.previewEnd.bind(this)
        });



        this.state = {
            soundFile: [
                {sound: sound1, name: "Birds", previewClass: "", playStop: "play"},
                {sound: sound2, name: "Clap", previewClass: "", playStop: "play"},
                {sound: sound3, name: "Applause", previewClass: "", playStop: "play"},
                {sound: sound4, name: "Ping", previewClass: "", playStop: "play"},
                {sound: sound5, name: "Waves", previewClass: "", playStop: "play"},
            ],
            playingIDs: [],
            messageClass: "hidden"
        };
    }

    selectFile(event) {
        var fileObj = event.target.files[0];

        if(!fileObj)
            return;

        var objectURL = window.URL.createObjectURL(fileObj)

        var type = fileObj.type.split("/")[1];


        var sound = new Howl({
            src: [objectURL],
            format: type,
            onend: this.previewEnd.bind(this)
        });

        this.setState({
            soundFile: [{sound: sound, name: fileObj.name, previewClass: "", playStop: "play"}, ...this.state.soundFile],
            messageClass: "moveInLeft"
        });

        setTimeout(() => {
            this.setState({
                messageClass: "moveOutRight"
            })
        }, 2000);


        //console.log(event.target.files[0]);
    }

    previewEnd(id) {
        this.state.playingIDs.map( (playingID, index) => {
            if(playingID.id === id) {
                console.log(playingID.index);

                var playingIDs = this.state.playingIDs;
                playingIDs.splice(index, 1);

                var current = this.state.soundFile;
                current[playingID.index].previewClass = "";
                current[playingID.index].playStop = "play";

                this.setState({
                    soundFile: current,
                    playingIDs,
  
                })
            }
        }); 
            
    }

    handleDelete(event) {
        //console.log(event.target.parentElement.id);
        var indexRemove = event.target.parentElement.id;
 
        var current = this.state.soundFile;
        current.splice(indexRemove, 1);

        this.setState({
            soundFile: current,
        });
    }

    handlePreview(event) {
        //console.log(event.target);
        var indexPreview = event.target.parentElement.parentElement.id;

        if(!this.state.soundFile[indexPreview])
            return;

        if(this.state.soundFile[indexPreview].playStop==="play") {

            var id = this.state.soundFile[indexPreview].sound.play();

            var current = this.state.soundFile;
            current[indexPreview].previewClass = "playing";
            current[indexPreview].playStop = "stop";

            this.setState({
                soundFiles: current,  
                playingIDs: [...this.state.playingIDs, {index: indexPreview, id: id} ],
            });
        } else {
            this.stopPreview(indexPreview);
        }
        
    }

    stopPreview(index) {
        if(this.state.soundFile[index])
            this.state.soundFile[index].sound.stop();
    

        var playingIDs = this.state.playingIDs;
        var splice = 0;
        this.state.playingIDs.map( (playingID, index) => {
            if(playingID.index === index)
                splice = index;
        });

        playingIDs.splice(splice, 1);

        var current = this.state.soundFile;
        current[index].previewClass = "";
        current[index].playStop = "play";


        this.setState({
            soundFile:current,
            playingIDs,
        });
    }

    handleAddSound(event) {
        if(event.target.tagName==="SPAN" || event.target.tagName==="BUTTON")
            return;

        var selectedID = event.target.id;
        var selectedSound = this.state.soundFile[selectedID].sound;
        //console.log(selectedSound);
    }



    render() {
        return (
            <div>
                
                <div>
                    <div className="dropdown">
                        
                        <div className="dropdown-left">
                            <button className="button button__add-sound"> Add Sound </button> 
                            <p className={"bar__message " + this.state.messageClass}>
                                Sound Added
                            </p>
                        </div>
                        <div className="dropdown-content">
    
                    
                            {
                                this.state.soundFile.map((sound, index) => {
                           

                                    return (
                                        <div className="select-new" key={index} id={index} onClick={this.handleAddSound.bind(this)}>
                                            <button 
                                                className={"button button__preview " + this.state.soundFile[index].previewClass}
                                                onClick={this.handlePreview.bind(this)}
                                            >   
                                                <span className={"fas fa-" + this.state.soundFile[index].playStop}></span>
                                            </button>

                                            {/* {this.getDuration()} */}

                                            {this.state.soundFile[index].name}
                                            <button 
                                                className="button button__delete"
                                                onClick={this.handleDelete.bind(this)}
                                            > 
                                                X 
                                            </button>
                                            
                                        </div>
                                    )
                                })
                            }
                        
                        </div>
                    </div>
                    
                </div>

                
                
                <input className="bar__file-input" type="file" accept=".mp3,.mpeg,.opus,.ogg,.oga,.wav,.aac,.caf,.m4a,.mp4,.weba,.webm,.dolby,.flac" onChange={this.selectFile.bind(this)} />
                <button className="button button__add-files"> Add Files + </button>

                

                

                
            </div>
            
        )
    }


}

