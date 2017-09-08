import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


export default class Menu extends React.Component {
    static propTypes = {
        onMenuClick: PropTypes.func.isRequired,
        privacy: PropTypes.bool
    }

    static defaultProps = {
        privacy: false
    }

    constructor( props ) {
        super( props );

        this.onPrivate = this.onPrivate.bind( this );
    }

    onPrivate() {
        let { privacy, onMenuClick } = this.props;
console.log(!privacy);
        // onMenuClick({
        //     'name': 'privacy',
        //     'value': ! privacy,
        // });
    }

    render() {
        return (
            <nav className="menu">
                { this.renderPrivate() }
            </nav>
        );
    }

    // renderFolder() {}
    // renderColor() {}
    // renderSort() {}
    // renderSmile() {}
    renderPrivate() {
        return (
            <button className="button" onClick={ this.onPrivate }>Private</button>
        );
    }
}
