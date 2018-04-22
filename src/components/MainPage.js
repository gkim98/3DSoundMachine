import React from 'react';
import { Howl, Howler } from 'howler';
import birdSound from '../sounds/clap.wav';
import Toolbar from "./Toolbar";
import SoundBoard from "./SoundBoard";
import SourceSettings from "./SourceSettings";
import Scrubber from "./Scrubber";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            longestTime: null,
            delays: [],
        };
    }
 
    addSource(src, name, type, dur) {
        this.child.addSource(src, name, type, dur);
    }

    setScrubberValues(longestTime, delays) {
        // this.setState({
        //     longestTime,
        //     delays
        // });

        this.scrubChild.update(longestTime ,delays);
    }

    startScrub() {
        this.scrubChild.start();
    }

    stopScrub() {
        this.scrubChild.stop();
    }

    render() {
        return (
            <div>
                <Toolbar onAddSource={this.addSource.bind(this)} />
                <SoundBoard onRef={ref => (this.child = ref)} updateScrubber={this.setScrubberValues.bind(this)} startScrub={this.startScrub.bind(this)} stopScrub={this.stopScrub.bind(this)} />
                <Scrubber onRef={ref => (this.scrubChild = ref)}/>
            </div>
        );
    }

    
}
