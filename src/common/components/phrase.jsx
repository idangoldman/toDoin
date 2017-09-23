import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactReplace from 'react-string-replace';
import { REGEX_TYPES } from 'common/helpers/language';


export default class Phrase extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired
    }

    constructor( props ) {
        super( props );

        this.state = {
            components: null
        };
    }

    componentWillMount() {
        this.componentConfig( this.props );
    }

    componentWillReceiveProps( nextProps ) {
        this.componentConfig( nextProps );
    }

    componentConfig( props ) {
        let phrase = props.children.phrase();

        const REGEX_KEYS = Object.keys( phrase.params ).join('|');
        const REGEX_REPLACE = new RegExp( '{\ (' + REGEX_KEYS + ')\ }', 'g');

        let components = ReactReplace( phrase.copy.clean(), REGEX_REPLACE, ( match, index ) => {
            let component = null;
            let value = phrase.params[ match ];
            let formatter = match.split('_')[ 0 ];

            switch ( formatter ) {
                case 'email':
                    component = (
                        <a key={ match + index } href={ 'mailto:' + value } target="_blank">{ '@' + value.split('@')[0] }</a>
                    );
                break;

                case 'url':
                    component = (
                        <a key={ match + index } href={ value } target="_blank">{ value.split(/https?:\/\//).join('') }</a>
                    );
                break;

                case 'date':
                    component = (
                        <strong key={ match + index }>{ value }</strong>
                    );
                break;

                case 'color':
                    component = (
                        <strong key={ match + index } style={{ backgroundColor: value }}>{ value }</strong>
                    );
                break;

                default:
                    component = (
                        <span key={ match + index }>{ '**No ' + match + ' formatter**' }</span>
                    );
                break;
            }

            return component;
        });

        this.setState({ components });
    }

    render() {
        return (
            <span>{ this.state.components }</span>
        );
    }
}
