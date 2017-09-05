import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEqual } from 'lodash';

import { todoUpdateAction } from 'src/todos/actions';
import { typingEscAction } from 'src/typing/actions';
import { which as whichKeystroke } from 'src/typing/helpers/key-stroke';


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
            description: props.description
        };

        this.onTyping = this.onTyping.bind( this );
        this.onChange = this.onChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        if ( ! isEqual( this.props.description, nextProps.description ) ) {
            this.setState({ description: nextProps.description });
        }
    }

    componentDidUpdate() {
        this.textareaNode.focus();
    }

    onChange( event ) {
        this.setState({ description: event.target.value });
    }

    onTyping( event ) {
        let { description } = this.state;
        let { id, dispatch } = this.props;

        switch( whichKeystroke( event ) ) {
            case 'enter':
                if ( description.trim().length ) {
                    dispatch( todoUpdateAction({ id, description }) );
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
        this.setState({ description: '' });
    }

    render() {
        let { placeholder } = this.props;
        let { description } = this.state;

        return (
            <form className="typing" onSubmit={ this.onSubmit }>
                <textarea
                    ref={ ( element ) => { this.textareaNode = element }}
                    autoFocus
                    className="description"
                    placeholder={ placeholder }
                    onKeyDown={ this.onTyping }
                    onChange={ this.onChange }
                    value={ description }
                />
            </form>
        );
    }
}
