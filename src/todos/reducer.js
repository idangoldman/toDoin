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
            let sortAllIds = state.allIds.concat([]);
            let { sort } = action.payload;

            switch ( action.payload.sort ) {
                case 'alphabet':
                    sortAllIds.sort(( a, b ) => {
                        a = state.byId[ a ].description.toLowerCase();
                        b = state.byId[ b ].description.toLowerCase();

                        return a < b ? -1 : a > b ? 1 : 0;
                    });
                break;

                case 'creation':
                    sortAllIds.sort(( a, b ) => {
                        a = state.byId[ a ].createdAt || 0;
                        b = state.byId[ b ].createdAt || 0;

                        return a - b;
                    });
                break;

                case 'completion':
                    console.log('before', sortAllIds);
                    sortAllIds.sort(( a, b ) => {
                        a = state.byId[ a ].completedAt || 0;
                        b = state.byId[ b ].completedAt || 0;

                        return b - a;
                    });
                    console.log('after', sortAllIds);
                break;
            }

            return {
                ...state, sort, allIds: sortAllIds
            };
        break;

        default:
            return state;
        break;

    }
}
