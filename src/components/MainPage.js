import React from 'react';

import SoundBoard from './SoundBoard';
import Toolbar from './Toolbar'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div>
                <SoundBoard />
            </div>
        )
    }
}

export default MainPage