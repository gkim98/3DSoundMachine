import React from 'react';

import SoundSource from './SoundSource';
import Listener from './Listener';
import { Howl } from 'howler';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sources: [],
            sourcesDonePlaying: 0,
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    addSource(file, name, ext) {
      
        if(file.substr(0, 5) === "blob:")
            file = [file];

        console.log(file);
        console.log(ext);

        this.setState({
            sources: [...this.state.sources, {
                delay: 0,
                file,
                name,
                type: ext
            }]
        })
    }

    // iterates through all the sound sources and plays their sounds
    playSounds = () => {
        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${i}`].getWrappedInstance().playSound();
        }
    }

    stopPlaying() {
        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${i}`].getWrappedInstance().stopSound();
        }
    }

    donePlayingIncrement() {
        // console.log(this.state.sourcesDonePlaying + 1 );
        // console.log(this.state.sources);

        if(this.state.sourcesDonePlaying + 1 === this.state.sources.length) {
            this.listenerChild.switchToPlay();
            this.setState({
                sourcesDonePlaying: 0,
            });
        } else {
            this.setState({
                sourcesDonePlaying: this.state.sourcesDonePlaying + 1,
            });
        }


        

    }

    render() {
        // replace the add source button with yours
        // Listener: perspective of the user
        // map through sounds array creating SoundSources
        // SoundSources take 1) delay 2) file props
        return (
            <div>
                {/* <button onClick={this.addSource.bind(this)}>Add Sound Source</button> */}
                <Listener onRef={ref => (this.listenerChild = ref)} onClick={this.playSounds} stopPlaying={this.stopPlaying.bind(this)} />
                {
                    this.state.sources.map((data, i) => {
                        return (
                            <SoundSource 
                                source={data}
                                key={i}
                                ref={(source) => this[`source${i}`] = source}
                                donePlaying={this.donePlayingIncrement.bind(this)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default SoundBoard;