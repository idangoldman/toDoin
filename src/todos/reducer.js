const defaultState = {
    byId: {},
    allIds: [],
    sort: ''
};


export default function TodosReducer( state = defaultState, action ) {

    switch ( action.type ) {
        case 'TODO_COMPLETE':
            let completedId = action.payload.id;
            let { completedAt } = action.payload;

            let completedById = {
                ...state.byId,
                [ completedId ]: { ...state.byId[ completedId ], completedAt }
            };

            return {
                ...state,
                byId: completedById,
                allIds: sortBy({
                    by: state.sort,
                    list: state.allIds,
                    items: completedById
                })
            };
        break;

        case 'TODO_UPDATE':
            let updatedId = action.payload.id;
            let updatedAllIds = state.allIds.concat([]);

            if ( ! state.byId[ updatedId ] ) {
                updatedAllIds = state.allIds.concat([ updatedId ]);
            }

            let updatedById = {
                ...state.byId,
                [ updatedId ]: { ...state.byId[ updatedId ], ...action.payload }
            };

            return {
                ...state,
                byId: updatedById,
                allIds: sortBy({
                    by: state.sort,
                    list: updatedAllIds,
                    items: updatedById
                })
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

            reorderAllIds.splice( to, 0, reorderAllIds.splice( from, 1 )[0] )

            return {
                ...state,
                allIds: reorderAllIds,
                sort: ''
            }
        break;

        case 'TODOS_SORT':
            let { sort } = action.payload;

            return {
                ...state,
                sort,
                allIds: sortBy({
                    by: sort,
                    list: state.allIds,
                    items: state.byId
                })
            };
        break;

        default:
            return state;
        break;

    }
}

export const sortBy = ({ by, list, items }) => {
    let sortedList = list.concat([]);

    switch ( by ) {
        case 'alphabet':
            sortedList.sort(( a, b ) => {
                a = items[ a ].description.toLowerCase();
                b = items[ b ].description.toLowerCase();

                return a < b ? -1 : a > b ? 1 : 0;
            });
        break;

        case 'creation':
            sortedList.sort(( a, b ) => {
                a = items[ a ].createdAt || 0;
                b = items[ b ].createdAt || 0;

                return a - b;
            });
        break;

        case 'completion':
            sortedList.sort(( a, b ) => {
                a = items[ a ].completedAt || 0;
                b = items[ b ].completedAt || 0;

                return b - a;
                // return a < b ? 1 : a > b ? -1 : 0;
            });
        break;
    }

    return sortedList;
};
