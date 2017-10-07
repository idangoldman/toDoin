import shortid from 'shortid';


export function todoCompleteAction({ id, completedAt }) {
    return {
        type: 'TODO_COMPLETE',
        payload: {
            id, completedAt
        }
    }
}

export function todoUpdateAction({
    id = shortid.generate(),
    description = '',
    privacy = false,
    createdAt = Date.now()
}) {
    return {
        type: 'TODO_UPDATE',
        payload: {
            id, description, privacy, createdAt
        }
    }
}

export function todoEditAction({ id, description, privacy }) {
    return {
        type: 'TODO_EDIT',
        payload: {
            id, description, privacy
        }
    }
}

export function todosReOrderAction({ from, to }) {
    return {
        type: 'TODOS_REORDER',
        payload: {
            from, to
        }
    }
}

export function clearCompleteAction() {
    return {
        type: 'CLEAR_COMPLETE'
    }
}

export function todosSortAction({ sort }) {
    return {
        type: 'TODOS_SORT',
        payload: {
            sort
        }
    };
}
