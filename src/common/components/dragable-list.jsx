import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
// import { throttle } from 'lodash';


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
            dropIndex: -1,
            overIndex: 0
        };
    }

    onDragStart = ( event ) => {
        event.dataTransfer.effectAllowed = 'move';

        this.setState({
            dragIndex: DragableList.getItemIndex( event.currentTarget )
        });
    }

    onDragEnter = ( event ) => {
        this.setState({
            dropIndex: DragableList.getItemIndex( event.currentTarget )
        });
    }

    onDragOver = ( event ) => {
        let rect = event.currentTarget.getBoundingClientRect();
        event.dataTransfer.dropEffect = 'move';

        let overIndex = Math.ceil(
            ( event.clientY - rect.y ) - ( rect.height / 2 )
        ) <= 0 ? -1 : 1;

        this.setState({ overIndex });
        event.preventDefault();
    }

    onDragLeave = ( event ) => {
        event.preventDefault();
    }

    onDrop = ( event ) => {
        let { dragIndex, dropIndex, overIndex } = this.state;
        let toIndex = dropIndex;

        if ( event.stopPropagation ) {
            event.stopPropagation();
        }

        if ( dropIndex < dragIndex ) {
            toIndex = toIndex + 1;
        }

        if ( overIndex < 0 ) {
            toIndex = toIndex - 1;
        }
console.log(dragIndex, toIndex);
        if ( dragIndex !== dropIndex ) {
            this.props.onReOrder({
                'from': dragIndex,
                'to': toIndex
            });
        }
    }

    onDragEnd = ( event ) => {
        event.dataTransfer.clearData();

        this.setState({
            dragIndex: -1,
            dropIndex: -1,
            overIndex: 0
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

        if ( children.length ) {
            React.Children.forEach( children, ( child, index ) => {
                Components.push( this.renderItem( child, index ) );
            });
        }

        return Components;
    }

    renderItem( item, index ) {
        let { overIndex, dropIndex } = this.state;
        let classNames = cx('item', {
            'before': index === dropIndex && overIndex < 0,
            'after': index === dropIndex && overIndex > 0
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

    static getItemIndex( target ) {
        return parseInt( target.getAttribute('data-index') );
    }
}
