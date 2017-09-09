import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEqual } from 'lodash';

import { textDirection } from 'common/scripts/direction';
import { which as whichKeystroke } from 'common/scripts/key-stroke';
import { todoUpdateAction } from 'src/todos/actions';
import { typingEscAction } from 'src/typing/actions';
import WatchClickOutside from 'common/components/watch-click-outside';
import Menu from 'src/menu';


@connect(( store ) => {
    return {
        id: store.typing.id,
        description: store.typing.description,
        privacy: store.typing.privacy
    };
})
export default class Typing extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        description: PropTypes.string,
        privacy: PropTypes.bool,

        placeholder: PropTypes.string,
        privacyDescription: PropTypes.string
    }

    static defaultProps = {
        id: '',
        description: '',
        placeholder: 'What\'s Next?',
        privacyDescription: 'Keep your actions private.',
        privacy: false
    }

    constructor( props ) {
        super( props );

        this.state = {
            description: props.description,
            direction: textDirection( props.description ),
            privacy: props.privacy,
            showMenu: false,
            isFocus: false
        };

        this.onTyping = this.onTyping.bind( this );
        this.onChange = this.onChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
        this.onFocus = this.onFocus.bind( this );
        this.onBlur = this.onBlur.bind( this );
        this.onMenuClick = this.onMenuClick.bind( this );
        this.setNodeRef = this.setNodeRef.bind( this );
        this.setTextareaNodeRef = this.setTextareaNodeRef.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        if ( ! isEqual( this.props, nextProps ) ) {
            this.setState({
                description: nextProps.description,
                privacy: nextProps.privacy,
                direction: textDirection( nextProps.description ),
                isFocus: true
            });
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return ! isEqual( this.props, nextProps ) || ! isEqual( this.state, nextState );
    }

    componentDidMount() {
        this.onFocus();
    }

    componentDidUpdate() {
        if ( this.state.isFocus ) {
            this.onFocus();
        }
    }

    onChange( event ) {
        let value = event.target.value;
        this.setState({
            description: value,
            direction: textDirection( value )
        });
    }

    onFocus() {
        this.textareaNode.focus();
        this.setState({
            showMenu: true,
            isFocus: false
        });
    }

    onBlur( event ) {
        event.preventDefault();
        this.setState({ showMenu: false });
    }

    onTyping( event ) {
        let { description, privacy } = this.state;
        let { id, dispatch } = this.props;

        switch( whichKeystroke( event ) ) {
            case 'enter':
                if ( description.trim().length ) {
                    dispatch( todoUpdateAction({ id, description, privacy }) );
                    this.onReset( event );
                }
            break;
            case 'esc':
                dispatch( typingEscAction() );
                this.onReset( event );
            break;
        }
    }

    onSubmit( event ) {
        event.preventDefault();
    }

    onReset( event ) {
        event.preventDefault();
        this.setState({ description: '', privacy: false });
    }

    onMenuClick({ name, value }) {
        let { id, dispatch } = this.props;

        switch ( name ) {
            case 'privacy':
                this.setState({ privacy: value });
            break;
        }

        this.textareaNode.focus();
    }

    setNodeRef( node ) {
        this.node = node;
    }

    render() {
        let classNames = cx(
            'typing', this.state.direction
        );

        return (
            <form
                ref={ this.setNodeRef }
                className={ classNames }
                onSubmit={ this.onSubmit }>
                { this.renderMenu() }
                { this.renderDescription() }
            </form>
        );
    }

    renderMenu() {
        let Component = null;
        let { privacy, showMenu } = this.state;

        if ( showMenu ) {
            Component = (
                <WatchClickOutside
                    onClickOutside={ this.onBlur }
                    parentNode={ this.node }>
                    <Menu
                        privacy={ privacy }
                        onMenuClick={ this.onMenuClick }
                    />
                </WatchClickOutside>
            );
        }

        return Component;
    }

    setTextareaNodeRef( node ) {
        this.textareaNode = node;
    }

    renderDescription() {
        let { placeholder } = this.props;
        let { description, direction } = this.state;

        return (
            <textarea
                ref={ this.setTextareaNodeRef }
                className="description"
                placeholder={ placeholder }
                onFocus={ this.onFocus }
                onKeyDown={ this.onTyping }
                onChange={ this.onChange }
                value={ description }
            />
        );
    }
}
