const defaultState = {
    byId: {},
    allIds: [],
    sort: ''
};


export default function TodosReducer( state = defaultState, action ) {

    switch ( action.type ) {
        case 'TODO_COMPLETE':
            let todoCompleteId = action.payload.id;
            let { completedAt } = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [ todoCompleteId ]: { ...state.byId[ todoCompleteId ], completedAt }
                }
            };
        break;

        case 'TODO_UPDATE':
            let todoUpdateId = action.payload.id;
            let allIds = state.allIds.concat([]);

            if ( ! state.byId[ todoUpdateId ] ) {
                allIds = state.allIds.concat([ todoUpdateId ]);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [ todoUpdateId ]: { ...state.byId[ todoUpdateId ], ...action.payload }
                },
                allIds: allIds
            }
        break;

        case 'CLEAR_COMPLETE':
            return {
                ...state,
                allIds: state.allIds.filter( id => ! state.byId[ id ].completedAt )
            };
        break;

        case 'TODOS_REORDER':
            let reorderAllIds = state.allIds.concat([]);
            let { from, to } = action.payload;

            reorderAllIds[ to ] = reorderAllIds.splice( from, 1, reorderAllIds[ to ] )[0]

            return {
                ...state,
                allIds: reorderAllIds,
                sort: ''
            }
        break;

        case 'TODOS_SORT':
            return {
                ...state,
                sort: action.payload.sort
            };
        break;

        default:
            return state;
        break;

    }
}
