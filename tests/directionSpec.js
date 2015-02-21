var config = require('../settings/config'),
    direction = require(config.path.app + '/utility/direction');

describe("Direction", function() {
    it("Should be direction RTL", function() {
    // Hebrew = U+0590-05FF
    // Arabic = U+0600-06FF

        var text = '';

        expect(direction.is(text)).toBe('rtl');
        expect(direction.is_rtl(text)).toBeTruthy();
        expect(direction.is_ltr(text)).toBeFalsy();
    });

    it("Should be direction LTR", function() {
        var text = '';

        expect(direction.is(text)).toBe('ltr');
        expect(direction.is_ltr(text)).toBeTruthy();
        expect(direction.is_rtl(text)).toBeFalsy();
    });
});