const defaultState = {
    id: '',
    description: '',
    privacy: false,

    isFocused: false
};


export default function TypingReducer( state = defaultState, action ) {

    switch ( action.type ) {
        case 'TODO_NEW':
        case 'TODO_UPDATE':
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

        case 'TYPING_FOCUS':
            return {
                ...state,
                isFocused: true
            };
        break;

        case 'TYPING_BLUR':
            return {
                ...state,
                isFocused: false
            };
        break;

        default:
            return state;
        break;
    }
}
