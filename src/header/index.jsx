import React from 'react';

import INFO from 'root/info';
import Sort from 'src/header/sort';
import LogoSVG from 'src/header/logo.svg';


export default class Header extends React.Component {
    // constructor( props ) {
    //     super( props );
    //
    //     this.onLogoClick = this.onLogoClick.bind( this );
    // }

    onLogoClick = ( event ) => {
        event.preventDefault();
    }

    render() {
        return (
            <header className="header">
                <button className="logo" onClick={ this.onLogoClick } title={ INFO.name + ' ' + INFO.version }>
                    <svg><use xlinkHref={ LogoSVG } /></svg>
                </button>

                <Sort />
            </header>
        );
    }
}
