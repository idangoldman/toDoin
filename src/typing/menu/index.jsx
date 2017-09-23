import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import GlassesSVG from 'src/typing/menu/glasses.svg';
import SortSVG from 'src/typing/menu/sort.svg';


export default class Menu extends React.Component {
    static propTypes = {
        onMenuClick: PropTypes.func.isRequired,
        privacy: PropTypes.bool,
        sort: PropTypes.oneOf([
            'alphabet', 'creation', 'completion', 'custom'
        ])
    }

    static defaultProps = {
        privacy: false,
        sort: 'creation'
    }

    constructor( props ) {
        super( props );

        this.onPrivate = this.onPrivate.bind( this );
        this.onSort = this.onSort.bind( this );
    }

    onPrivate() {
        let { privacy, onMenuClick } = this.props;
        onMenuClick({
            'name': 'privacy',
            'value': ! privacy,
        });
    }

    onSort() {
        let { sort, onMenuClick } = this.props;
        onMenuClick({
            name: 'sort',
            value: sort
        });
    }

    render() {
        return (
            <nav className="menu">
                { this.renderPrivate() }
                { this.renderSort() }
            </nav>
        );
    }

    // renderGroup() {}
    // renderColor() {}
    // renderSmile() {}

    renderSort() {
        let classNames = cx('button', 'sort');

        return (
            <button className={ classNames } onClick={ this.onSort }>
                <svg><use xlinkHref={ SortSVG } /></svg>
                { 'Sort'.paraphrase() }
            </button>
        );
    }

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
