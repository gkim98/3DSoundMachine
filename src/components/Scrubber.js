import React from 'react';
import { Howl, Howler } from 'howler';

function round(num) {
    return Math.ceil(num * 100) / 100;
}

export default class Scrubber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentValue: 0,
            maxValue: 30000,
            length: 30,
            startTime: null
        };
    }
    
    componentDidMount() {
        this.start();
    }

    onSliderChange(event) {
        this.setState({
            currentValue: event.target.value,
        });
    }

    onLengthChange(event) {
        this.setState({
            length: event.target.value,
            maxValue: event.target.value * 1000,
        });
    }

    start() {
        this.setState({
            currentValue: 0,
        });

        var myVar = setInterval(function(){ 
            console.log("HELLO");
            this.setState({
                currentValue: this.state.currentValue + 100,
            });
            if(this.state.currentValue > this.state.maxValue) {
                clearInterval(myVar);
                this.setState({
                    currentValue: this.state.maxValue,
                });
            }
                
         }.bind(this), 100);
    }
    
    render() {
        return (
            <div class="scrubber">
                <div className="scrubber__flex">
                    <div className="scrubber__current">
                        {round(this.state.currentValue / this.state.maxValue * this.state.length)}&nbsp;s
                    </div>
                    <div className="scrubber__input">
                        <input className="scrubber__max-input" type="text" value={this.state.length} onChange={this.onLengthChange.bind(this)} />
                        &nbsp;s
                    </div>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    value={this.state.currentValue}
                    max={this.state.maxValue.toString()} 
                    className="scrubber__slider" 
                    id="myRange" 
                    onChange={this.onSliderChange.bind(this)}
                />
                
            </div>
        );
    }

    
}