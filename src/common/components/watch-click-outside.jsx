import React from 'react';
import PropTypes from 'prop-types';


export default class WatchClickOutside extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        onClickOutside: PropTypes.func,
        parentNode: PropTypes.object
    }

    static defaultProps = {
        parentNode: document.createTextNode('')
    }

    componentDidMount() {
        document.addEventListener( 'click', this.handleClickOutside );
    }

    componentWillUnmount() {
        document.removeEventListener( 'click', this.handleClickOutside );
    }

    setNodeRef = ( node ) => {
        this.node = node;
    }

    handleClickOutside = ( event ) => {
        if (
            ! this.node.contains( event.target ) &&
            ! this.props.parentNode.contains( event.target.parentNode )
        ) {
            this.props.onClickOutside( event );
        }
    }

    render() {
        return (
            <div ref={ this.setNodeRef } className="click-outside-wrap">
                { this.props.children }
            </div>
        );
    }
}
