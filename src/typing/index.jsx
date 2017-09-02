import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { todoUpdateAction } from 'src/todos/actions';
import { which as whichKeystroke } from 'src/typing/helpers/key-stroke';
import GlassesSVG from './glasses.svg';


@connect(( store ) => {
    return {
    };
})
export default class Typing extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        description: PropTypes.string,
        placeholder: PropTypes.string,
        privacyDescription: PropTypes.string,
        privacy: PropTypes.bool
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

        this.onPrivacyClick = this.onPrivacyClick.bind( this );
        this.onTyping = this.onTyping.bind( this );
        this.onChange = this.onChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onChange( event ) {
        this.setState({ description: event.target.value });
    }

    onTyping( event ) {
        let { description } = this.state;
        let { id, dispatch, privacy } = this.props;

        switch( whichKeystroke( event ) ) {
            case 'enter':
                if ( description.trim().length ) {
                    dispatch( todoUpdateAction({ id, description }) );
                    this.onReset( event );
                }
            break;
            case 'esc':
                this.onReset( event );
            break;
        }
    }

    onPrivacyClick( event ) {
        event.preventDefault();

        // this.props.dispatch( clearCompleteAction() );
    }

    onSubmit( event ) {
        event.preventDefault();
    }

    onReset( event ) {
        event.preventDefault();
        this.setState({ description: '' });
    }

    render() {
        let { placeholder, privacyDescription, privacy } = this.props;
        let { description } = this.state;
        let privacyClassName = cx('privacy', {
            'checked': privacy
        });

        return (
            <form className="typing" onSubmit={ this.onSubmit }>
                <textarea
                    className="description"
                    placeholder={ placeholder }
                    onKeyDown={ this.onTyping }
                    onChange={ this.onChange }
                    value={ description }
                />
                <button className={ privacyClassName }
                        onClick={ this.onPrivacyClick }
                        title={ privacyDescription }>
                    <svg><use xlinkHref={ GlassesSVG } /></svg>
                </button>
            </form>
        );
    }
}
