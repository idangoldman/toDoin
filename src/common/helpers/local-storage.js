// import {  } from 'lodash';

const storeName = 'ToDoin';


export const loadState = ( key = storeName ) => {
    try {
        let serializedState = localStorage.getItem( key );

        if ( serializedState === null ) {
            return undefined;
        }

        return JSON.parse( serializedState );
    } catch ( error ) {
        return undefined;
    }
}

export const saveState = ( state ) => {
    try {
        let serializedState = JSON.stringify( state );
        localStorage.setItem( storeName, serializedState );
    } catch ( error ) {
        // do nothing...?
    }
}

export const saveToLocalStorage = ( store ) => ( next ) => ( action ) => {
    next( action );

    let saveOn = [
        'TODO_NEW',
        'TODO_UPDATE',
        'TODO_COMPLETE',
        'CLEAR_COMPLETE',
        'TODOS_REORDER',
        'TODOS_SORT'
    ];

    if ( -1 !== saveOn.indexOf( action.type ) ) {
        saveState({
            todos: store.getState().todos
        });
    }
}
