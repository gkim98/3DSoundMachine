import React from 'react';
import { Howl, Howler } from 'howler';
import birdSound from '../sounds/clap.wav';
import Toolbar from "./ToolBar";

// var sound = new Howl({
//     src: birdSound
// });


export default class DavidPage extends React.Component {
    // Howler.pos(0,0,0);

    // sound.pos(-10, 0, 0);
    // sound.play();
    

    // setTimeout(function() {
    //     sound.pos(10, 0, 0);
    //     sound.play();
    // }, 1500)

    constructor(props) {
        super(props);

        this.state = {
            sounds: [],
            names: []
        };
    }
 
    selectFile(event) {
        // console.log(event.target.files);
        // console.log(objectURL);

        var fileObj = event.target.files[0];
        var objectURL = window.URL.createObjectURL(fileObj)
       
        
        var sound = new Howl({
            src: [objectURL],
            format: "wav",
        });

        this.setState({
            sounds: [...this.state.sounds, sound],
            names: [...this.state.names, fileObj.name]
        })

        console.log(fileObj.name);

        
    }



   
    
    render() {
        return (
            <div>

                <Toolbar />
                {/* <input id="sound-file" type="file" onChange={this.selectFile.bind(this)}/>
               
                {
                    this.state.sounds.map((sound, index) => {
                        console.log(this.state.names);
                        return (

                            <div key={index}> 
                                {this.state.names[index]}
                            </div>
                        )
                        
                    })
                } */}
            </div>
        );
    }

    
}
