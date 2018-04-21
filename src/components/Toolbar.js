import React from 'react';
import { Howl, Howler } from 'howler';


export default class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="bar__flex-container">
                <div>
                    <button className="button button__add-sound"> Add Sound </button>
                    <button className="button button__play"> Play </button>
                </div>
                <button className="button button__add-files"> Add Files + </button>
            </div>  
        )
    }


}

