export const setListenerPosition = ({ x, y } = {}) => ({
    type: 'SET_POSITION',
    position: {
        x,
        y
    }
});