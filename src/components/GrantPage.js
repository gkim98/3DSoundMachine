import React from 'react';
import { Howl } from 'howler';
import birdSound from '../sounds/Budgie-sounds.mp3';

const GrantPage = (props) => {

    var sound = new Howl({
        src: birdSound
      });
      
      sound.play();

    return (
        <div>
            my page
        </div>
    );
};

export default GrantPage;