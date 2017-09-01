import React from 'react';


export default class ShiftStats extends React.Component {
    constructor( props ) {
        super( props );

        this.onFieldUpdate = this.onFieldUpdate.bind( this );
        this.onFormSubmit = this.onFormSubmit.bind( this );
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
