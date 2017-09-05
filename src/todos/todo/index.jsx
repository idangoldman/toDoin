import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CheckboxSVG from 'src/todos/todo/checkbox.svg';


export default class Todo extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onComplete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,

        complete: PropTypes.bool,
        privacy: PropTypes.bool,
        description: PropTypes.string
    }

    static defaultProps = {
        complete: false,
        description: '',
        id: null,
        privacy: false
    }

    constructor( props ) {
        super( props );

        this.onComplete = this.onComplete.bind( this );
        this.onEdit = this.onEdit.bind( this );
    }

    onComplete( event ) {
        event.preventDefault();

        let { id, complete, onComplete } = this.props;

        onComplete({
            id, complete: ! complete
        });
    }

    onEdit( event ) {
        event.preventDefault();

        let { id, description, privacy, complete, onEdit } = this.props;

        if ( ! complete ) {
            onEdit({ id, description, privacy });
        }
    }

    render() {
        let { complete, privacy } = this.props;
        let classNames = cx('todo', {
            'complete': complete,
            'privacy': privacy
        });

        return (
            <li className={ classNames }>
                { this.renderCheckbox() }
                { this.renderDescription() }
            </li>
        );
    }

    renderCheckbox() {
        return (
            <i className="checkbox" onClick={ this.onComplete }>
                <svg><use xlinkHref={ CheckboxSVG } /></svg>
            </i>
        )
    }

    renderDescription() {
        return (
            <p className="description" onDoubleClick={ this.onEdit }>
                { this.props.description }
            </p>
        );
    }
}
