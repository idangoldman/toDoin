import React from 'react';
import PropTypes from 'prop-types';


export default class WatchClickOutside extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        onClickOutside: PropTypes.func
    }

    constructor( props ) {
        super( props );

        this.setWrapperRef = this.setWrapperRef.bind( this );
        this.handleClickOutside = this.handleClickOutside.bind( this );
    }

    componentDidMount() {
        document.addEventListener( 'click', this.handleClickOutside );
    }

    componentWillUnmount() {
        document.removeEventListener( 'click', this.handleClickOutside );
    }

    setWrapperRef( node ) {
        this.wrapperRef = node;
    }

    handleClickOutside( event ) {
        if ( this.wrapperRef && ! this.wrapperRef.contains( event.target ) ) {
            this.props.onClickOutside( event );
        }
    }

    render() {
        return (
            <div ref={ this.setWrapperRef } className="click-outside-wrap">
                { this.props.children }
            </div>
        );
    }
}
