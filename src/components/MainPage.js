import React from 'react';
import { Howl, Howler } from 'howler';
import birdSound from '../sounds/clap.wav';
import Toolbar from "./Toolbar";
import SoundBoard from "./SoundBoard";
import Scrubber from "./Scrubber";



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
                <Scrubber />
            </div>
        );
    }

    
}
