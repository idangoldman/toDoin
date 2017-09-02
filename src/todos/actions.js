import shortid from 'shortid';


export function todoCompleteAction({ id, complete }) {
    return {
        type: 'TODO_COMPLETE',
        payload: {
            id, complete
        }
    }
}
//
// export function todoAddAction({}) {
//     return {
//         type: 'TODO_ADD',
//         payload: {
//
//         }
//     }
// }
//
// export function todoDeleteAction({}) {
//     return {
//         type: 'TODO_DELETE',
//         payload: {
//
//         }
//     }
// }
