export const setBadgeAction = ({ color, text }) => {

    if ( 'undefined' !== typeof color && color.haveColor() ) {
        chrome.browserAction.setBadgeBackgroundColor({ color });
    }

    if ( 'undefined' !== typeof text ) {
        chrome.browserAction.setBadgeText({ text: text.toString() });
    }

    return {
        type: 'SET_BADGE_COMPLETE',
        payload: { color, text }
    };
}
