import React from 'react';

export default class SourceSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLooping: this.props.isLooping,
            delay: this.props.delay
        };
    }

    changeLooping = () => {
        this.setState({
            isLooping: !this.state.isLooping
        });
    }

    changeDelay = (e) => {
        this.setState({
            delay: e.target.value
        });
    }

    applyClicked = (e) => {
        e.preventDefault();

        const formLooping = document.getElementById('isLooping').checked;
        const formDelay = document.getElementById('delay').value;

        this.props.onClick(formLooping, formDelay);
    }

    render() {
        return (
            <div style={{float: 'left'}}>
                
                    
                    <input 
                        type='checkbox' 
                        checked={this.state.isLooping}
                        onChange={this.changeLooping}
                        id='isLooping'
                    />
                    Loop 
                    
                    <input 
                        type='text' 
                        value={this.state.delay} 
                        onChange={this.changeDelay}
                        name='delay'
                        id='delay'
                    />
                    Delay 
                    <button onClick={this.applyClicked}>Apply Changes</button>
          
            </div>
        );
    }
}