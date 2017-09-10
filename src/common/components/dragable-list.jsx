import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { throttle } from 'lodash';


export default class DragableList extends React.Component {
    static propTypes = {
        children: PropTypes.array.isRequired,
        onReOrder: PropTypes.func.isRequired,

        className: PropTypes.string
    }

    static defaultProps = {
        className: 'dragable-list'
    }

    constructor( props ) {
        super( props );

        this.state = {
            dragIndex: -1,
            overIndex: -1
        };

        this.onDragStart = this.onDragStart.bind( this );
        this.onDragEnter = this.onDragEnter.bind( this );
        this.onDragOver = this.onDragOver.bind( this );
        this.onDragLeave = this.onDragLeave.bind( this );
        this.onDrop = this.onDrop.bind( this );
        this.onDragEnd = this.onDragEnd.bind( this );
    }

    onDragStart( event ) {
        let itemIndex = DragableList.getItemIndex( event.target );

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData( 'text/plain', itemIndex );

        this.setState({
            dragIndex: itemIndex
        });
    }

    onDragEnter( event ) {
        this.setState({
            overIndex: DragableList.getItemIndex( event.target )
        });
    }

    onDragOver( event ) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }

    onDragLeave( event ) {}

    onDrop( event ) {
        if ( event.stopPropagation ) {
            event.stopPropagation();
        }

        this.props.onReOrder({
            'from': parseInt( event.dataTransfer.getData('text') ),
            'to': DragableList.getItemIndex( event.target )
        });
    }

    onDragEnd( event ) {
        event.dataTransfer.clearData();

        this.setState({
            dragIndex: -1,
            overIndex: -1
        });
    }

    render() {
        let { className, children } = this.props;

        return (
            <ul className={ className }>
                { this.renderItems() }
            </ul>
        );
    }

    renderItems() {
        let Components = [];
        let { children } = this.props;
        let { dragIndex } = this.state;

        if ( children.length ) {
            React.Children.forEach( children, ( child, index ) => {
                // if ( index === dragIndex ) {
                //     Components.push( this.renderPlaceholder( index ) );
                // }

                Components.push( this.renderItem( child, index ) );
            });
        }

        return Components;
    }

    renderItem( item, index ) {
        let { dragIndex, overIndex } = this.state;
        let classNames = cx('item', {
            'drag': index === dragIndex,
            'over': index === overIndex
        });

        return (
            <li
                key={ index }
                className={ classNames }
                data-index={ index }
                draggable="true"
                onDragStart={ this.onDragStart }
                onDragEnter={ this.onDragEnter }
                onDragOver={ this.onDragOver }
                onDragLeave={ this.onDragLeave }
                onDrop={ this.onDrop }
                onDragEnd={ this.onDragEnd }>
                { item }
            </li>
        );
    }

    renderPlaceholder( index ) {
        return (
            <li key={ index } className="item placeholder"></li>
        );
    }

    static getItemIndex( target ) {
        if ( ! target.hasAttribute('data-index') ) {
            target = target.closest('.item');
        }

        return parseInt( target.getAttribute('data-index') );
    }
}
