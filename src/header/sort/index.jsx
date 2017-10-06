import React from 'react';
import cx from 'classnames';

import WatchClickOutside from 'common/components/watch-click-outside';
import SortSVG from 'src/header/sort/sort.svg';


export default class Header extends React.Component {
    static defaultProps = {
        list: [
            'alphabet', 'creation', 'completion'
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

    onMenuItem = ( item ) => ( event ) => {
        console.log('onMenuItem', item);
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
        let Components = this.props.list.map(( item, index ) => (
            <a key={ item + index } href="#" className="item" onClick={ this.onMenuItem( item ) }>{ item }</a>
        ));

        return (
            <nav className="menu">
                { Components }
            </nav>
        );
    }
}
