import React from 'react';

import LogoSVG from 'common/images/logo.svg';


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
                <button class="logo" onClicl={ this.onClick }>
                    <svg><use xlinkHref={ LogoSVG } /></svg>
                </button>
            </header>
        );
    }
}
