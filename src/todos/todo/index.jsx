import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { textDirection } from 'common/helpers/direction';
import CheckboxSVG from 'src/todos/todo/checkbox.svg';
import Phrase from 'common/components/phrase';

export default class Todo extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onComplete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,

        createdAt: PropTypes.number,
        completedAt: PropTypes.number,
        privacy: PropTypes.bool,
        description: PropTypes.string
    }

    static defaultProps = {
        createdAt: Date.now(),
        completedAt: 0,
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

        let { id, completedAt, onComplete } = this.props;

        onComplete({
            id, completedAt: ! completedAt ? Date.now() : 0
        });
    }

    onEdit( event ) {
        event.preventDefault();

        let { id, description, privacy, completedAt, createdAt, onEdit } = this.props;

        if ( ! completedAt ) {
            onEdit({ id, description, privacy, createdAt });
        }
    }

    render() {
        let { description, completedAt, privacy } = this.props;
        let classNames = cx('todo', textDirection( description ), {
            'complete': completedAt,
            'privacy': privacy
        });

        return (
            <article className={ classNames }>
                { this.renderCheckbox() }
                { this.renderDescription() }
            </article>
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
        let { description } = this.props;

        return (
            <p className="description" onDoubleClick={ this.onEdit }>
                <Phrase>{ description }</Phrase>
            </p>
        );
    }
}
