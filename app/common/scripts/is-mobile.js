module.exports = function() {
    return !!(window.navigator.userAgent.toLocaleLowerCase().match(/(mobile|iemobile|android|webos|iphone|ipad|ipod|blackberry|windows phone)/));
};