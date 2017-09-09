import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { todoEditAction, todoCompleteAction } from 'src/todos/actions';
import Todo from 'src/todos/todo';


@connect(( store ) => {
    return {
        byId: store.todos.byId,
        allIds: store.todos.allIds,
        isTypingFocused: store.typing.isFocused
    };
})
export default class Todos extends React.Component {
    constructor( props ) {
        super( props );

        this.onTodoComplete = this.onTodoComplete.bind( this );
        this.onTodoEdit = this.onTodoEdit.bind( this );
    }

    onTodoComplete({ id, complete }) {
        this.props.dispatch( todoCompleteAction({ id, complete }) );
    }

    onTodoEdit({ id, description, privacy }) {
        this.props.dispatch( todoEditAction({ id, description, privacy }) );
    }

    render() {
        let { isTypingFocused } = this.props;
        let classNames = cx('todos', {
            'typing-focused': isTypingFocused
        });

        return (
            <section className={ classNames }>
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
                onEdit={ this.onTodoEdit }
            />
        ));
    }
}
