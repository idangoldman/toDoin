import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { textDirection } from 'common/scripts/direction';
import CheckboxSVG from 'src/todos/todo/checkbox.svg';
import Phrase from 'common/components/phrase';

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
        let { description, complete, privacy } = this.props;
        let classNames = cx('todo', textDirection( description ), {
            'complete': complete,
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
