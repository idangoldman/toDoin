var config = require('../settings/config'),
    Blah = require(config.path.app + '/../blah/.main');

describe("Url validation check", function() {
    it("Should be a valid url", function() {
        expect(Blah.url.is('http://idan.co.il')).toBeTruthy();
        expect(Blah.url.is('www.idan.com/#sdfsadf')).toBeTruthy();
        expect(Blah.url.is('http://leeya.com')).toBeTruthy();
        expect(Blah.url.is('http://leeya.com/?blah')).toBeTruthy();
    });

    it("Should not be a valid url", function() {
        expect(Blah.url.is('idan.com')).toBeFalsy();
        expect(Blah.url.is('http://blah.$.com')).toBeFalsy();
        expect(Blah.url.is('www.lee$ya.com')).toBeFalsy();
    });
});

describe("Url html tag check", function() {
    it("Should be a valid url link", function() {
        expect(Blah.url.html('http://idan.com')).toBe('<a href="http://idan.com">http://idan.com</a>');
        expect(Blah.url.html('some thing to say: www.idan.com')).toBe('some thing to say: <a href="www.idan.com">www.idan.com</a>');
        expect(Blah.url.html('http://blah.co.il <- my old url.')).toBe('<a href="http://blah.co.il">http://blah.co.il</a> <- my old url.');
        expect(Blah.url.html('http://idan.com <- two urls -> http://leeya.com')).toBe('<a href="http://idan.com">http://idan.com</a> <- two urls -> <a href="http://leeya.com">http://leeya.com</a>');
    });

    it("Should not be a valid url link", function() {
        expect(Blah.url.html('http://ida(n.com')).toBe('http://ida(n.com');
        expect(Blah.url.html('not an url -> http://ida(n.com')).toBe('not an url -> http://ida(n.com');
        expect(Blah.url.html('www.ida%n.com <- another not url')).toBe('www.ida%n.com <- another not url');
    });
});