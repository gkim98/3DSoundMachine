import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import { Howl, Howler } from 'howler';
import { connect } from 'react-redux';

import snapping from '../sounds/snapping.mp3';
import beep from '../sounds/beep.wav';

class SoundSource extends React.Component {
    constructor(props) {
        super(props);
        // deltaPosition: location of the SoundSource
        // delay: time before it produces sound
        // isLooping: (add this prop)
        this.state={
            deltaPosition: {
                x: 0,
                y: 0,
            },
            delay: 0
        }
    }

    // tracks positioning of the sound source
    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    }

    // plays its sound relative to the listener
    playSound = () => {
        console.log(this.props.listener.position)
        let sound = new Howl({
            src: snapping
        });

        // experiment with the scaling factor
        // sets the position of the listener
        // toFixed() rounds the position values
        let xL = this.props.listener.xPos / 100;
        console.log(xL);
        let yL = this.props.listener.yPos / 100;
        Howler.pos(xL, yL, 0)

        // sets the position of the sound source
        // change the y coord of the source due to axis orientation
        let xS = this.state.deltaPosition.x / 100;
        let yS = ((2 * yL - this.state.deltaPosition.y) / 100);
        sound.pos(xS, yS, 0)

        // times when source should produce sound
        // pass in delay prop in terms of seconds
        setTimeout(function() {
            sound.play()
        }, this.props.delay * 1000)
    }

    // move style to a style tag and give class name
    render() {
        const { deltaPosition } = this.state;
        return (
            <div>
                <Draggable
                    onDrag={this.handleDrag} 
                >
                    <div style={{position: 'absolute', top: '50px', left: '50px'}}>
                        <div className='handle'>
                            x: {deltaPosition.x},
                            y: {deltaPosition.y}
                        </div>
                        <div className='source'></div>
                    </div>
                </Draggable>
            </div>
        )
    }
}

// allows access to position of listener
const mapStateToProps = (state) => {
    return {
        listener: state.listener
    }
};

// withRefs: true to access this reference from parent component
export default connect(mapStateToProps, null, null, { withRef: true })(SoundSource);
