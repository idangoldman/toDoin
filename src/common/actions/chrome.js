export const setBadgeAction = ({ color, text }) => {

    if ( 'undefined' !== typeof color ) {
        // color: #9E9E9E
        chrome.browserAction.setBadgeBackgroundColor({ color });
    }

    if ( 'undefined' !== typeof text ) {
        chrome.browserAction.setBadgeText({ text });
    }

    return {
        type: 'SET_BADGE_COMPLETE',
        payload: { color, text }
    };
}
