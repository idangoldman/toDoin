import React from 'react';


export default class Header extends React.Component {
    constructor( props ) {
        super( props );

        this.onLogoClick = this.onLogoClick.bind( this );
    }

    onLogoClick( event ) {
        event.preventDefault();

        console.log('toDo: onLogoClick, navigate to top of the list');
    }

    render() {
        return (
            <header className="header">
                <button className="logo" onClick={ this.onLogoClick }>toDoin</button>
            </header>
        );
    }
}
