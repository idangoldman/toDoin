import React from 'react';
import { connect } from 'react-redux';

import Todo from 'src/todos/todo';


@connect(( store ) => {
    return {
        byId: store.todos.byId,
        allIds: store.todos.allIds
    };
})
export default class Todos extends React.Component {
    constructor( props ) {
        super( props );

        this.onTodoChange = this.onTodoChange.bind( this );
    }

    render() {
        return (
            <section className="todos">
                { this.renderTodos() }
            </section>
        );
    }

    renderTodos() {
        let { byId, allIds } = this.props;

        return allIds.map(( id, index ) => (
            <Todo
                key={ index }
                item={ byId[ id ] }
                onChange={ this.onTodoChange }
            />
        );
    }
}
