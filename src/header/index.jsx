import React from 'react';

import INFO from 'root/info';
import LogoSVG from 'src/header/logo.svg';


export default class Header extends React.Component {
    constructor( props ) {
        super( props );

        this.onClick = this.onClick.bind( this );
    }

    onClick( event ) {
        event.preventDefault();

        console.log('toDo: onClick, navigate to top of the list');
    }

    render() {
        return (
            <header className="header">
                <button className="logo" onClick={ this.onClick } title={ INFO.name + ' ' + INFO.version }>
                    <svg><use xlinkHref={ LogoSVG } /></svg>
                </button>
            </header>
        );
    }
}
