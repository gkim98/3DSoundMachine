export const setListenerPosition = ({ x, y } = {}) => ({
    type: 'SET_POSITION',
    position: {
        x,
        y
    },
});


/*

    MAYBE POSSIBLE SOLUTION
*/
// toggles true and false; the change of state will trigger songs
export const playPressed = (toggle) => ({
    type: 'PLAY_PRESSED',
    playPressed: toggle
});