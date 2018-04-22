const listenerDefaultState = {
    xPos: 0,
    yPos: 0
}

export default (state=listenerDefaultState, action) => {
    switch(action.type) {
        case 'SET_X_POSITION':
            console.log(state)
            console.log(action)
            return {
                ...state,
                xPos: action.xPos
            };
        case 'SET_Y_POSITION':
            return {
                ...state,
                yPos: action.yPos
            }
        default:
            return state;
    }
}