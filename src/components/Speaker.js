import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';

class Speaker extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div>
                <Draggable
                    handle=".handle"
                    defaultPosition={{x: 0, y: 0}}
                    position={null}
                    grid={[1, 1]}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}
                >
                    <div>
                        <div className="handle">Source</div>
                        <div className="speaker"></div>
                    </div>
                </Draggable>
            </div>
        )
    }
}

export default Speaker;