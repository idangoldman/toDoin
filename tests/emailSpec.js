var config = require('../settings/config'),
    Blah = require(config.path.app + '/../blah/.main');

describe("Email checking", function() {
    it("Should be a valid email", function() {
        expect(Blah.email.is('idan@idan.com')).toBeTruthy();
        expect(Blah.email.is('id.an@idan.com')).toBeTruthy();
        expect(Blah.email.is('id-an@idan.com')).toBeTruthy();
    });

    it("Should not be a valid email", function() {
        expect(Blah.email.is('ida@n@idan.com')).toBeFalsy();
        expect(Blah.email.is('id.an@id&an.com')).toBeFalsy();
        expect(Blah.email.is('id-an@ida*n.com')).toBeFalsy();
    });
});

describe("Email checking", function() {
    it("Should be a valid email link", function() {
        expect(Blah.email.html('idan@idan.com')).toBe('<a href="mailto:idan@idan.com">idan</a>');
        expect(Blah.email.html('some thing to say: idan@idan.com')).toBe('some thing to say: <a href="mailto:idan@idan.com">idan</a>');
        expect(Blah.email.html('idan@idan.com <- my old email.')).toBe('<a href="mailto:idan@idan.com">idan</a> <- my old email.');
        expect(Blah.email.html('idan@idan.com <- two emails -> leeya@leeya.com')).toBe('<a href="mailto:idan@idan.com">idan</a> <- two emails -> <a href="mailto:leeya@leeya.com">leeya</a>');
    });

    it("Should not be a valid email link", function() {
        expect(Blah.email.html('idan@ida(n.com')).toBe('idan@ida(n.com');
        expect(Blah.email.html('not an email -> idan@ida(n.com')).toBe('not an email -> idan@ida(n.com');
        expect(Blah.email.html('idan@ida%n.com <- another not email')).toBe('idan@ida%n.com <- another not email');
    });
});