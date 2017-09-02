import React from 'react';
import { connect } from 'react-redux';

import { clearCompleteAction } from 'src/todos/actions';


@connect(( store ) => {
    return {
        todos: store.todos
    };
})
export default class HelloButton extends React.Component {
    constructor( props ) {
        super( props );

        this.onClick = this.onClick.bind( this );
    }

    onClick( event ) {
        event.preventDefault();

        this.props.dispatch( clearCompleteAction() );
    }

    render() {
        return ! HelloButton.show( this.props.todos ) ? null : (
            <button className="hello-button" onClick={ this.onClick }>
                Clear Complete
            </button>
        );
    }

    static show( todos ) {
        return todos.allIds.filter( id => todos.byId[ id ].complete ).length > 0;
    }
}
