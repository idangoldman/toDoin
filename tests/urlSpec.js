var config = require('../settings/config'),
    Url = require(config.path.app + '/../blah/language/url');

describe("Url validation check", function() {
    it("Should be a valid url", function() {
        expect(Url.is('http://idan.co.il')).toBeTruthy();
        expect(Url.is('www.idan.com/#sdfsadf')).toBeTruthy();
        expect(Url.is('http://leeya.com')).toBeTruthy();
        expect(Url.is('http://leeya.com/?blah')).toBeTruthy();
    });

    it("Should not be a valid url", function() {
        expect(Url.is('idan.com')).toBeFalsy();
        expect(Url.is('http://blah.$.com')).toBeFalsy();
        expect(Url.is('www.lee$ya.com')).toBeFalsy();
    });
});

describe("Url html tag check", function() {
    it("Should be a valid url link", function() {
        expect(Url.html('http://idan.com')).toBe('<a href="http://idan.com" target="_blank">idan.com</a>');
        expect(Url.html('some thing to say: www.idan.com')).toBe('some thing to say: <a href="http://www.idan.com" target="_blank">idan.com</a>');
        expect(Url.html('http://blah.co.il <- my old url.')).toBe('<a href="http://blah.co.il" target="_blank">blah.co.il</a> <- my old url.');
        expect(Url.html('http://idan.com <- two urls -> http://leeya.com')).toBe('<a href="http://idan.com" target="_blank">idan.com</a> <- two urls -> <a href="http://leeya.com" target="_blank">leeya.com</a>');
    });

    it("Should not be a valid url link", function() {
        expect(Url.html('http://ida(n.com')).toBe('http://ida(n.com');
        expect(Url.html('not an url -> http://ida(n.com')).toBe('not an url -> http://ida(n.com');
        expect(Url.html('www.ida%n.com <- another not url')).toBe('www.ida%n.com <- another not url');
    });
});