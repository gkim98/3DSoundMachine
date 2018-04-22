import React from 'react';

import SoundSource from './SoundSource';
import Listener from './Listener';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sources: [
                //put sound sources here
            ]
        }
    }

    addSource = () => {
        this.setState({
            sources: [...this.state.sources, {
                delay: 0,
                file: 'test'
            }]
        })
    }

    // iterates through all the sound sources and plays their sounds
    playSounds = () => {
        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${i}`].getWrappedInstance().playSound();
        }
    }

    render() {
        // replace the add source button with yours
        // Listener: perspective of the user
        // map through sounds array creating SoundSources
        // SoundSources take 1) delay 2) file props
        return (
            <div>
                <button onClick={this.addSource}>Add Sound Source</button>
                <Listener onClick={this.playSounds}/>
                {
                    this.state.sources.map((data, i) => {
                        return (
                            <SoundSource 
                                key={i}
                                ref={(source) => this[`source${i}`] = source}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default SoundBoard;