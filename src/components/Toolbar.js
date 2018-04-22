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
            sounds: [sound1, sound2, sound3, sound4, sound5],
            fileNames: ["Birds", "Clap", "Applause", "Ping", "Waves"],
            previewClasses: ["", "", "", "", ""],
            playingIDs: [],
            playStop: ["play", "play", "play", "play", "play"]
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
            sounds: [sound, ...this.state.sounds],
            fileNames: [fileObj.name, ...this.state.fileNames],
            previewClasses: ["", ...this.state.previewClasses],
            playStop: [ "play", ...this.state.playStop]
        })

        //console.log(event.target.files[0]);
    }

    previewEnd(id) {
        this.state.playingIDs.map( (playingID, index) => {
            if(playingID.id === id) {
                console.log(index);

                var previewClasses = this.state.previewClasses;
                var playingIDs = this.state.playingIDs;
                
                previewClasses[playingID.index] = "";
                playingIDs.splice(index, 1);

                var playStop = this.state.playStop;
                playStop[playingID.index] = "play";


                this.setState({
                    previewClasses,
                    playingIDs,
                    playStop
                })
            }
        }); 
            
    }

    handleDelete(event) {
        //console.log(event.target.parentElement.id);
        var indexRemove = event.target.parentElement.id;
        var sounds = this.state.sounds;
        var fileNames = this.state.fileNames;
        var previewClasses = this.state.previewClasses;
        var playStop = this.state.playStop;

        if(this.state.playStop[indexRemove]  === "stop") 
           this.stopPreview(indexRemove);
        

        sounds.splice(indexRemove, 1);
        fileNames.splice(indexRemove, 1);
        previewClasses.splice(indexRemove, 1);
        playStop.splice(indexRemove, 1);
       

        this.setState({
            sounds,
            fileNames,
            previewClasses,
            playStop
        });
    }

    handlePreview(event) {
        //console.log(event.target);
        var indexPreview = event.target.parentElement.parentElement.id;

        if(this.state.playStop[indexPreview]  === "play") {
            if(this.state.sounds[indexPreview]) 
                var id = this.state.sounds[indexPreview].play();

            var previewClasses = this.state.previewClasses;
            previewClasses[indexPreview] = "playing";

            var playStop = this.state.playStop;
            playStop[indexPreview] = "stop";

            this.setState({
                previewClasses,
                playingIDs: [...this.state.playingIDs, {index: indexPreview, id: id} ],
                playStop,
            });
        } else {
            this.stopPreview(indexPreview);

        }
        
    }

    stopPreview(index) {
        if(this.state.sounds[index])
            this.state.sounds[index].stop();
        
        var playStop = this.state.playStop;
        playStop[index] = "play";

        var previewClasses = this.state.previewClasses;
        previewClasses[index] = ""; 

        var playingIDs = this.state.playingIDs;
        var splice = 0;
        this.state.playingIDs.map( (playingID, index) => {
            if(playingID.index === index)
                splice = index;
        });

        playingIDs.splice(splice, 1);

        this.setState({
            playStop,
            previewClasses,
            playingIDs,
        });
    }

    render() {
        return (
            <div>
                
                <div>
                    <div className="dropdown">
                        <button className="button button__add-sound"> Add Sound </button>
                        <div className="dropdown-content">
    
                    
                            {
                                this.state.sounds.map((sound, index) => {
                                    return (
                                        <div className="select-new" key={index} id={index}>
                                            <button 
                                                className={"button button__preview " + this.state.previewClasses[index]}
                                                onClick={this.handlePreview.bind(this)}
                                            >   
                                                <span className={"fas fa-" + this.state.playStop[index]}></span>
                                            </button>
                                            {this.state.fileNames[index]}
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

