import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CheckboxSVG = 'common/images/checkbox';
import CheckboxCompleteSVG = 'common/images/checkbox-complete';


export default class Todo extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onComplete: PropTypes.func.isRequired,
        onOpen: PropTypes.func.isRequired,

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
        this.onOpen = this.onOpen.bind( this );
    }

    onComplete( event ) {
        event.preventDefault();
        console.log('toDo: toggle complete');

        // let { id, complete, onComplete } this.props;
        //
        // onComplete({
        //     id, complete: ! complete
        // });
    }

    onOpen( event ) {
        event.preventDefault();
        console.log('toDo: open in typing component');
    }

    render() {
        return (
            <li className="todo">
                { this.renderCheckbox() }
                { this.renderDescription() }
            </li>
        );
    }

    renderCheckbox() {
        let { complete } = this.props;
        let classNames = cx('checkbox', {
            'complete': complete,
        });
        let SVG = complete ? CheckboxCompleteSVG : CheckboxSVG;

        return (
            <i className={ classNames } onClick={ this.onComplete }>
                <svg viewBox="{ SVG.viewBox }">
                    <use xlink:href="#{ SVG.id }" />
                </svg>
            </i>
        )
    }

    renderDescription() {
        let { description, privacy } = this.props;
        let classNames = cx('checkbox', {
            'privacy': this.props.privacy,
        });

        return (
            <p className={ classNames } onClick={ this.onOpen }>
                { description }
            </p>
        );
    }
}
