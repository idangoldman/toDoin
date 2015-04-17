var config = require('../settings/config'),
    Blah = require(config.path.app + '/../blah/.main');

describe("Email checking", function() {
    it("Should be a valid email", function() {
        expect(Blah.email.is('idan@idan.com')).toBeTruthy();
        expect(Blah.email.is('id.an@idan.co.il')).toBeTruthy();
        expect(Blah.email.is('id-an@idan.com')).toBeTruthy();
    });

    it("Should be a valid email", function() {
        expect(Blah.email.is('ida@n@idan.com')).toBeFalsy();
        expect(Blah.email.is('id.an@id&an.co.il')).toBeFalsy();
        expect(Blah.email.is('id-an@ida*n.com')).toBeFalsy();
    });
});