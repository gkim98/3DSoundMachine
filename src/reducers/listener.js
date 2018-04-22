const listenerDefaultState = {
    position: {
        x: 0,
        y: 0
    },
    playPressed: true
}

export default (state=listenerDefaultState, action) => {
    switch(action.type) {
        case 'SET_POSITION':
            return {
                ...state,
                position: {
                    x: action.position.x,
                    y: action.position.y
                }
            };
        default:
            return state;
    }
}