import React from 'react';
import { Howl, Howler } from 'howler';
import birdSound from '../sounds/clap.wav';
import Toolbar from "./Toolbar";
import SoundBoard from "./SoundBoard";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
 
    addSource(src, name, type) {
        this.child.addSource(src, name, type);
    }



   
    
    render() {
        return (
            <div>

                <Toolbar onAddSource={this.addSource.bind(this)} />
                <SoundBoard onRef={ref => (this.child = ref)}/>
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
