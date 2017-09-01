import React from 'react';


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
                <a class="logo" onClicl={ this.onClick }></a>
            </header>
        );
    }
}
