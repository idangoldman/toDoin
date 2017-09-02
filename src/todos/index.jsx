import React from 'react';
import { connect } from 'react-redux';

import { todoCompleteAction } from 'src/todos/actions';

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

        this.onTodoComplete = this.onTodoComplete.bind( this );
        this.onTodoOpen = this.onTodoOpen.bind( this );
    }

    onTodoComplete({ id, complete }) {
        this.props.dispatch( todoCompleteAction({ id, complete }) );
    }

    onTodoOpen( id ) {
        // this.props.dispatch( todoOpenAction( id ) );
    }

    render() {
        return (
            <section className="todos">
                <ul className="list">
                    { this.renderTodos() }
                </ul>
            </section>
        );
    }

    renderTodos() {
        let { byId, allIds } = this.props;

        return allIds.map(( id, index ) => (
            <Todo
                key={ index }
                { ...byId[ id ] }
                onComplete={ this.onTodoComplete }
                onOpen={ this.onTodoOpen }
            />
        ));
    }
}
