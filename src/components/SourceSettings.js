import React from 'react';

export default class SourceSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLooping: this.props.isLooping,
            delay: this.props.delay,
            name: "",
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    changeLooping = () => {
        this.setState({
            isLooping: !this.state.isLooping
        });

        this.applyClicked();
    }

    changeDelay = (e) => {
        this.setState({
            delay: e.target.value
        });

        this.applyClicked();
    }

    applyClicked = (e) => {
        if(e)
            e.preventDefault();

        const formLooping = document.getElementById('isLooping').checked;
        const formDelay = document.getElementById('delay').value;

        this.props.onClick(formLooping, formDelay);
    }

    setName(name) {
        this.setState({
            name
        });
    }



    render() {
        return (
            <div style={{float: 'right', marginLeft: "0%"}}>
                
                <form className="settings__form">
                    <h1 className="killMargin settings__selected"> {this.state.name}</h1>
                  
                    Delay: <input 
                        className="settings__input"
                        type='text' 
                        value={this.state.delay} 
                        onChange={this.changeDelay}
                        name='delay'
                        id='delay'
                    />
                    s

                    <br />

                    Loop: <input 
                        type='checkbox' 
                        checked={this.state.isLooping}
                        onChange={this.changeLooping}
                        id='isLooping'
                    />
                    

                    {/* <button onClick={this.applyClicked}>Apply Changes</button> */}
                </form>
            </div>
        );
    }
}