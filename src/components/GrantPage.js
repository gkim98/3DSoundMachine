import React from 'react';
import { Howl, Howler } from 'howler';

import snapping from '../sounds/snapping.mp3';
import birds from '../sounds/birds.mp3';
import SoundSource from './SoundSource';

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

    playSound = () => {
        let sound = new Howl({
           src: snapping
        });

        Howler.pos(0, 0, 0)
          
        sound.pos(-.5, 0, 0)
        sound.play()
    
        setTimeout(function() {
            sound.pos(.5, 0, 0)
            sound.play()
        }, 2000)
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

    render() {
        return (
            <div>
                <button onClick={this.playSound}>Sound</button>
                <button onClick={this.addSource}>Add Sound Source</button>
                {
                    this.state.sources.map(() => {
                        return (
                            <SoundSource />
                        )
                    })
                }
                
            </div>
        )
    }
}

export default GrantPage;
