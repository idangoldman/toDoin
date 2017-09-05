import shortid from 'shortid';


export function todoCompleteAction({ id, complete }) {
    return {
        type: 'TODO_COMPLETE',
        payload: {
            id, complete
        }
    }
}

export function todoUpdateAction({ id = '', description = '', privacy = false }) {
    if ( ! id.length ) {
        id = shortid.generate();
    }

    return {
        type: 'TODO_UPDATE',
        payload: {
            id, description, privacy
        }
    }
}

export function clearCompleteAction() {
    return {
        type: 'CLEAR_COMPLETE'
    }
}
