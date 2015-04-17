var config = require('../settings/config'),
    Email = require(config.path.app + '/../blah/language/email');

describe("Email validation check", function() {
    it("Should be a valid email", function() {
        expect(Email.is('idan@idan.com')).toBeTruthy();
        expect(Email.is('id.an@idan.com')).toBeTruthy();
        expect(Email.is('id-an@idan.com')).toBeTruthy();
    });

    it("Should not be a valid email", function() {
        expect(Email.is('ida@n@idan.com')).toBeFalsy();
        expect(Email.is('id.an@id&an.com')).toBeFalsy();
        expect(Email.is('id-an@ida*n.com')).toBeFalsy();
    });
});

describe("Email html tag check", function() {
    it("Should be a valid email link", function() {
        expect(Email.html('idan@idan.com')).toBe('<a href="mailto:idan@idan.com" target="_blank">@idan</a>');
        expect(Email.html('some thing to say: idan@idan.com')).toBe('some thing to say: <a href="mailto:idan@idan.com" target="_blank">@idan</a>');
        expect(Email.html('idan@idan.com <- my old email.')).toBe('<a href="mailto:idan@idan.com" target="_blank">@idan</a> <- my old email.');
        expect(Email.html('idan@idan.com <- two emails -> leeya@leeya.com')).toBe('<a href="mailto:idan@idan.com" target="_blank">@idan</a> <- two emails -> <a href="mailto:leeya@leeya.com" target="_blank">@leeya</a>');
    });

    it("Should not be a valid email link", function() {
        expect(Email.html('idan@ida(n.com')).toBe('idan@ida(n.com');
        expect(Email.html('not an email -> idan@ida(n.com')).toBe('not an email -> idan@ida(n.com');
        expect(Email.html('idan@ida%n.com <- another not email')).toBe('idan@ida%n.com <- another not email');
    });
});