import React from 'react';
import { Howl, Howler } from 'howler';

// Default Sounds

import Clap from '../sounds/clap.wav';
import Applause from '../sounds/applause.wav';
import Ping from '../sounds/beep.wav';
import Waves from '../sounds/waves.wav';
import Crowd from '../sounds/crowd.wav';
import Seagulls from '../sounds/seagulls.wav';
import Playing from '../sounds/playing.mp3';

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    secs = Math.ceil(secs);
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);


        
        var sound2 = new Howl({
            src: [Clap],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });

        var sound3 = new Howl({
            src: [Applause],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });

        var sound4 = new Howl({
            src: [Ping],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });

        var sound5 = new Howl({
            src: [Waves],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });

        var sound6= new Howl({
            src: [Crowd],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });


        var sound7 = new Howl({
            src: [Seagulls],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });


        var sound8 = new Howl({
            src: [Playing],
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });






        this.state = {
            soundFile: [
               
                {sound: sound2, src: Clap, type: "", name: "Clap", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound3, src: Applause, type: "", name: "Applause", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound4, src: Ping, type: "", name: "Ping", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound5, src: Waves, type: "", name: "Waves", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound6, src: Crowd, type: "", name: "Crowd", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound7, src: Seagulls, type: "", name: "Seagulls", duration: "--:--", previewClass: "", playStop: "play"},
                {sound: sound8, src: Playing, type: "", name: "Playing", duration: "--:--", previewClass: "", playStop: "play"}
            ],
            playingIDs: [],
            messageClass: "hidden",
            hideDropdown: ""
        };
    }

    selectFile(event) {
        var fileObj = event.target.files[0];

        if(!fileObj)
            return;

        var objectURL = window.URL.createObjectURL(fileObj);

        var type = fileObj.type.split("/")[1];


        var sound = new Howl({
            src: [objectURL],
            format: type,
            onend: this.previewEnd.bind(this),
            onload: this.updateDuration.bind(this)
        });

        this.setState({
            soundFile: [{sound: sound, name: fileObj.name, src: objectURL, type: type, previewClass: "", playStop: "play"}, ...this.state.soundFile],
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


        var indexRemove = event.target.id;

        
        console.log(event.target.id);

        this.state.soundFile[indexRemove].sound.stop();

        var current = this.state.soundFile;
        current.splice(indexRemove, 1);

        this.setState({
            soundFile: current,
        });
        

        
    }

    handlePreview(event) {
        //console.log(event.target);
        var indexPreview = event.target.parentElement.id;


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

    updateDuration() {
        //console.log("loaded");

        var current = this.state.soundFile;
        this.state.soundFile.map( (file, index) => {
            current[index].duration = fancyTimeFormat(file.sound.duration());
        });

        //console.log(current);
        this.setState({
            soundFile: current,
        });


    }

    handleAddSound(event) {
        //console.log(event.target.tagName);
        if(event.target.tagName==="I" || event.target.tagName==="SPAN" || event.target.tagName==="BUTTON")
            return;

        var selectedID = event.target.id;
        var selectedSoundFile = this.state.soundFile[selectedID];

        this.setState({
            hideDropdown: "disable",
        }, function() {
            setTimeout(function() {
                this.setState({
                    hideDropdown: "",
                });
            }.bind(this), 500);
        });

       

        


        this.props.onAddSource( selectedSoundFile.src, selectedSoundFile.name, selectedSoundFile.type );


    }

    



    render() {
        return (
            <div>
                
                <div>
                    <div className={"dropdown "+ this.state.hideDropdown}>
                        <div className="dropdown-left">
                            <button className="button button__add-sound"> Add Sound </button> 
                            <p className={"bar__message " + this.state.messageClass}>
                                Sound Added
                            </p>
                        </div>
                        <div className={"dropdown-content "}>
                    
                            {
                                this.state.soundFile.map((sound, index) => {
                           

                                    return (
                                        <div className="select-new" key={index} id={index} onClick={this.handleAddSound.bind(this)}>
                                            <button 
                                                className={"button button__preview " + this.state.soundFile[index].previewClass}
                                                onClick={this.handlePreview.bind(this)}
                                                id={index}
                                            >   
                                                <span className={"fas fa-" + this.state.soundFile[index].playStop}></span>
                                            </button>

                                           
                                            {this.state.soundFile[index].name}

                                            <p className="duration">
                                                {this.state.soundFile[index].duration} &nbsp;
                                            </p>


                                            <button 
                                                className="button button__delete"
                                                onClick={this.handleDelete.bind(this)}
                                                id={index}
                                            > 
                                                <i className="fas fa-times" id={index}></i>
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

