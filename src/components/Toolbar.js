import React from 'react';
import { Howl, Howler } from 'howler';


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sounds: [],
            fileNames: []
        };
    }

    selectFile(event) {
        var fileObj = event.target.files[0];
        var objectURL = window.URL.createObjectURL(fileObj)
       
        
        var sound = new Howl({
            src: [objectURL],
            format: "wav",
        });

        this.setState({
            sounds: [...this.state.sounds, sound],
            fileNames: [...this.state.fileNames, fileObj.name]
        })

        //console.log(event.target.files[0]);
    }

    handleDelete(event) {
        //console.log(event.target.parentElement.id);
        var indexRemove = event.target.parentElement.id;
        var oldSounds = this.state.sounds;
        var oldFileNames = this.state.fileNames;
        oldSounds.splice(indexRemove, 1);
        oldFileNames.splice(indexRemove, 1);

        this.setState({
            sounds: oldSounds,
            fileNames: oldFileNames,
        });
    }

    handlePreview(event) {
        var indexPreview = event.target.parentElement.id;
        console.log(indexPreview);
        this.state.sounds[indexPreview].play();
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
                                                className="button button__preview"
                                                onClick={this.handlePreview.bind(this)}
                                            >
                                                <span className="pe-7s-play"></span>
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
                
                <input className="bar__file-input" type="file" onChange={this.selectFile.bind(this)} />
                <button className="button button__add-files"> Add Files + </button>

                

                

                
            </div>
            
        )
    }


}

