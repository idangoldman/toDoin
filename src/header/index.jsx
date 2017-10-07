import React from 'react';
import { connect } from 'react-redux';

import INFO from 'root/info';
import Sort from 'src/header/sort';
import LogoSVG from 'src/header/logo.svg';
import { todosSortAction } from 'src/todos/actions';

@connect( store => {
    return {
        sort: store.todos.sort
    };
})
export default class Header extends React.Component {
    // constructor( props ) {
    //     super( props );
    //
    //     this.onLogoClick = this.onLogoClick.bind( this );
    // }

    onLogoClick = ( event ) => {
        event.preventDefault();
    }

    onSortPick = ({ sort }) => {
        this.props.dispatch( todosSortAction({ sort }) );
    }

    render() {
        return (
            <header className="header">
                <button className="logo" onClick={ this.onLogoClick } title={ INFO.name + ' ' + INFO.version }>
                    <svg><use xlinkHref={ LogoSVG } /></svg>
                </button>

                <Sort current={ this.props.sort } onPick={ this.onSortPick } />
            </header>
        );
    }
}
