import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { connect } from 'react-redux';

import { setListenerXPosition, setListenerYPosition } from '../actions/listener';

class Listener extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            deltaPosition: {
                x: 0,
                y: 0,
            }
        }
    }

    // updates listener position when dragging
    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    }

    // updates listener's position and plays soundscape
    // upon play button click (see refs in parent component)
    clickedPlay = () => {
        console.log(this.state.deltaPosition.x)
        this.props.updateXPosition(this.state.deltaPosition.x);
        this.props.updateYPosition(this.state.deltaPosition.y);
        this.props.onClick();
    }

    // play button will produce the soundscape from listener perspective
    // add transform to style if you want to start at center
    render() {
        const { deltaPosition } = this.state;
        return (
            <div>
                <Draggable
                    onDrag={this.handleDrag} 
                >
                    <div style={{position: 'absolute', top: '50px', left: '50px'}}>
                        <div className="handle">
                            x: {deltaPosition.x},
                            y: {deltaPosition.y}
                        </div>
                        <div className="speaker"></div>
                        <button onClick={this.clickedPlay}>Play</button>
                    </div>
                </Draggable>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateXPosition: () => dispatch(setListenerXPosition()),
    updateYPosition: () => dispatch(setListenerYPosition())
});

export default connect(undefined, mapDispatchToProps)(Listener);