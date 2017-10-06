import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { clearCompleteAction } from 'src/todos/actions';


@connect(( store ) => {
    return {
        todos: store.todos,
        isTypingFocused: store.typing.isFocused
    };
})
export default class CleanButton extends React.Component {
    constructor( props ) {
        super( props );

        this.onClick = this.onClick.bind( this );
    }

    onClick( event ) {
        event.preventDefault();

        this.props.dispatch( clearCompleteAction() );
    }

    render() {
        let Component = null;
        let { todos, isTypingFocused } = this.props;
        let classNames = cx('clean-button', {
            'typing-focused': isTypingFocused
        });

        if ( CleanButton.haveCompleteTodos( todos ) ) {
            Component = (
                <button className={ classNames } onClick={ this.onClick }>
                    { 'Clear Complete'.paraphrase() }
                </button>
            );
        }

        return Component;
    }

    static haveCompleteTodos( todos ) {
        return todos.allIds.filter( id => todos.byId[ id ].completedAt ).length > 0;
    }
}
