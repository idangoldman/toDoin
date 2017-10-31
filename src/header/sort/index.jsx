import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import WatchClickOutside from 'common/components/watch-click-outside';
import SortSVG from 'src/header/sort/sort.svg';


export default class Header extends React.Component {
    static propTypes = {
        onPick: PropTypes.func.isRequired,

        current: PropTypes.string,
        list: PropTypes.array
    }

    static defaultProps = {
        current: '',
        list: [
            'Sort Alphabet'.paraphrase(),
            'Sort Creation'.paraphrase(),
            'Sort Completion'.paraphrase()
        ]
    }

    constructor( props ) {
        super( props );

        this.state = {
            open: false
        }
    }

    onToggle = ( event ) => {
        event.preventDefault();
        this.setState({ open: ! this.state.open });
    }

    onMenuItemClick = ( item ) => ( event ) => {
        this.props.onPick({
            sort: this.props.current !== item ? item : ''
        });
        this.setState({ open: false });
    }

    render() {
        let classNames = cx('sort', {
            'open': this.state.open
        });

        return (
            <div className={ classNames }>
                <button className="button" onClick={ this.onToggle }>
                    <svg><use xlinkHref={ SortSVG } /></svg>
                </button>

                { this.renderMenu() }
            </div>
        );
    }

    renderMenu() {
        let Components = this.props.list.map(( item, index ) => {
            let classNames = cx('item', {
                'current': item === this.props.current
            });

            return (
                <a key={ item + index } href="#" className={ classNames } onClick={ this.onMenuItemClick( item ) }>{ item }</a>
            );
        });

        return ! this.state.open ? null : (
            <WatchClickOutside
                onClickOutside={ this.onToggle }>
                <nav className="menu">
                    { Components }
                </nav>
            </WatchClickOutside>
        );
    }
}
