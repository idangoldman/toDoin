var config = require('../settings/config'),
    direction = require(config.path.app + '/utility/direction');

describe("Direction", function() {
    it("Should be direction LTR", function() {
        var text = 'Yo!';

        expect(direction.is(text)).toBe('ltr');
        expect(direction.isLTR(text)).toBeTruthy();
        expect(direction.isRTL(text)).toBeFalsy();
    });

    it("Should be direction RTL (Arabic)", function() {
        var text = 'يو';

        expect(direction.is(text)).toBe('rtl');
        expect(direction.isRTL(text)).toBeTruthy();
        expect(direction.isLTR(text)).toBeFalsy();
    });

    it("Should be direction RTL (Hebrew)", function() {
        var text = 'יו!';

        expect(direction.is(text)).toBe('rtl');
        expect(direction.isRTL(text)).toBeTruthy();
        expect(direction.isLTR(text)).toBeFalsy();
    });
});