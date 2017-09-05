const defaultState = {
    byId: {},
    allIds: []
};


export default function TodosReducer( state = defaultState, action ) {

    switch ( action.type ) {
        case 'TODO_COMPLETE':
            let todo_complete_id = action.payload.id;
            let { complete } = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [ todo_complete_id ]: { ...state.byId[ todo_complete_id ], complete }
                }
            };
        break;
        case 'TODO_UPDATE':
            let todo_update_id = action.payload.id;
            let allIds = state.allIds.concat([]);

            if ( ! state.byId[ todo_update_id ] ) {
                allIds = state.allIds.concat([ todo_update_id ]);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [ todo_update_id ]: { ...state.byId[ todo_update_id ], ...action.payload }
                },
                allIds: allIds
            }
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
