import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import { connect } from 'react-redux';

import { setListenerPosition } from '../actions/listener';

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

    // redux stores the listener's position when play is pressed
    storePos = () => {
        this.props.dispatch(setListenerPosition(this.state.deltaPosition));
    }

    clickedPlay = () => {
        this.storePos();
        this.props.onClick();
    }

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

const mapStateToProps = (state) => {
    return {
        listener: state.listener
    }
};

export default connect(mapStateToProps)(Listener);