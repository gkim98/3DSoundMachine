import React from 'react';
import { Howl, Howler } from 'howler';
import snapping from '../sounds/snapping.mp3';
import birds from '../sounds/birds.mp3';
import Draggable, {DraggableCore} from 'react-draggable';

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
                    this.state.sources()
                }
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
                        <div className="handle">Drag from here</div>
                        <div>This readme is really dragging on...</div>
                    </div>
                </Draggable>
            </div>
        )
    }
}

export default GrantPage;
