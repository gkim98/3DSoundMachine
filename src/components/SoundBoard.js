import React from 'react';
import keyIndex from 'react-key-index';

import SoundSource from './SoundSource';
import Listener from './Listener';
import { Howl } from 'howler';
import SourceSettings from './SourceSettings';

class SoundBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sources: [],
            sourcesDonePlaying: 0,
            // ref refers to the specific sound source
            currentRef: "",
            currentIsLooping: true,
            currentDelay: 0
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    addSource = (file, name, ext) => {
      
        if(file.substr(0, 5) === "blob:")
            file = [file];

<<<<<<< HEAD
        // console.log(file);
        // console.log(ext);
=======
>>>>>>> d422b3d2cc02a8d93abf158720ebb08fdd00ec80

        // uuid allows each source to have a unique identifier
        this.setState({
            sources: keyIndex([...this.state.sources, {
                delay: 0,
                file,
                name,
                type: ext,
                isLooping: false
            }], 1)
        })
        console.log(this.state.sources)
    }

    // iterates through all the sound sources and plays their sounds
    playSounds = () => {
        if(this.state.sources.length===0){
            this.listenerChild.switchToPlay();
            return;
        }

        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${this.state.sources[i]._delayId}`].getWrappedInstance().playSound();
        }
    }

    stopPlaying() {
        for(let i = 0; i < this.state.sources.length; i++) {
            this[`source${this.state.sources[i]._delayId}`].getWrappedInstance().stopSound();
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

    // will change the reference to the clicked source
    // allows form submit to target that source
    setRef = (ref) => {
        console.log(ref)
        this.setState({
            currentRef: ref
        }, function() {
            console.log(this.state.currentRef)
        });
        // this[`source${this.state.currentRef}`].getWrappedInstance().state
    }

    // passes the state of the currently chosen source to the form
    currentToForm = (looping, delay) => {
        const stateReference = this.settings.state;
        stateReference.isLooping = looping;
        stateReference.delay = delay;
    }

    // when settings form submitted => changes the source's state
    // passed down to settings form
    applySourceSettings = (looping, delay) => {

        const stateReference = this[`source${this.state.currentRef}`].getWrappedInstance().state;
        stateReference.isLooping = looping;
        stateReference.delay = delay;

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
                    this.state.sources.map((data) => {
                        return (
                            <SoundSource 
                                name={data.name}
                                isLooping={data.isLooping}
                                delay={data.delay}
                                file={data.file}
                                type={data.type}
                                key={data._delayId}
                                ref={(source) => this[`source${data._delayId}`] = source}
                                donePlaying={this.donePlayingIncrement.bind(this)}
                                setRef={this.setRef}
                                toForm={this.currentToForm}
                                id={data._delayId}
                            />
                        )
                    })
                }
                <SourceSettings 
                    delay={this.state.currentDelay} 
                    isLooping={this.state.currentIsLooping}
                    onClick={this.applySourceSettings}
                    ref={(settings) => this.settings = settings}
                />
            </div>
        )
    }
}

export default SoundBoard;