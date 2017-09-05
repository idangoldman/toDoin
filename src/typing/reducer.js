const defaultState = {
    id: '',
    description: '',
    privacy: false
};


export default function TypingReducer( state = defaultState, action ) {

    switch ( action.type ) {
        case 'TODO_NEW':
        case 'TODO_COMPLETE':
        case 'TYPING_ESC':
            return {
                ...defaultState
            };
        break;

        case 'TODO_EDIT':
            return {
                ...state,
                ...action.payload
            };
        break;

        default:
            return state;
        break;

    }
}
