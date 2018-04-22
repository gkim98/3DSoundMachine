import React from 'react';
import { Howl, Howler } from 'howler';

import snapping from '../sounds/snapping.mp3';
import birds from '../sounds/birds.mp3';
import SoundSource from './SoundSource';
import Listener from './Listener';

class GrantPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            xPos: 0,
            yPos: 0,
            sources: [
                //put sound sources here
            ]
        }
    }

    // eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    // };

    addSource = () => {
        this.setState({
            sources: [...this.state.sources, "a"]
        })
    }

    playSound = () => {
        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${i}`].playSound();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.playSound}>Sound</button>
                <button onClick={this.addSource}>Add Sound Source</button>
                <Listener onClick={this.playSound}/>
                {
                    this.state.sources.map((data, i) => {
                        return (
                            <SoundSource 
                                key={i}
                                ref={(source) => this[`source${i}`] = source}
                                index={i}
                            />
                        )
                    })
                }
                
            </div>
        )
    }
}

export default GrantPage;
