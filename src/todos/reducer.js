import stub from 'src/todos/stub';

const defaultState = {
    byId: {},
    allIds: []
};


export default function TodosReducer( state = stub || defaultState, action ) {
    switch ( action.type ) {
        case 'TODO_COMPLETE':
            let { id, complete } = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [ id ]: { ...state.byId[ id ], complete }
                }
            };
        break;
        case 'TODO_ADD':
            // let { id } = action.payload;
            // return {
            //     ...state,
            //     byId[ id ]: action.payload,
            //     allIds: state.allIds.concat([ id ]);
            // }
        break;
        case 'CLEAR_COMPLETE':
            return {
                ...state,
                allIds: state.allIds.filter( id => ! state.byId[ id ].complete )
            };
        break;
        default:
            return state;
        break;

    }
}
