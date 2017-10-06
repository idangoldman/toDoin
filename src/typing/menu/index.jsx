import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import GlassesSVG from 'src/typing/menu/glasses.svg';


export default class Menu extends React.Component {
    static propTypes = {
        onMenuClick: PropTypes.func.isRequired,
        privacy: PropTypes.bool
    }

    static defaultProps = {
        privacy: false,
        sort: 'creation'
    }

    constructor( props ) {
        super( props );

        this.onPrivate = this.onPrivate.bind( this );
    }

    onPrivate() {
        let { privacy, onMenuClick } = this.props;
        onMenuClick({
            'name': 'privacy',
            'value': ! privacy,
        });
    }

    render() {
        return (
            <nav className="menu">
                { this.renderPrivate() }
            </nav>
        );
    }

    // renderGroup() {}
    // renderColor() {}
    // renderSmile() {}

    renderPrivate() {
        let classNames = cx('button', 'privacy', {
            'on': this.props.privacy
        });

        return (
            <button className={ classNames } onClick={ this.onPrivate }>
                <svg><use xlinkHref={ GlassesSVG } /></svg>
                { 'Private'.paraphrase() }
            </button>
        );
    }
}
