require.config({
    baseUrl: "./",
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jasmine': 'lib/jasmine-2.0.0/jasmine',
        'jasmine-html': 'lib/jasmine-2.0.0/jasmine-html',
        'jasmine-boot': 'lib/jasmine-2.0.0/boot'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }
    }
});

require(['jasmine-boot'], function() {
    var specs = [
        'spec/validation/is_wordSpec',
        'spec/validation/is_urlSpec',
        'spec/validation/is_emailSpec',
        'spec/validation/is_usernameSpec',
        'spec/helpers/numberSpec',
        'spec/helpers/mreplaceSpec',
        'spec/helpers/split_map',
        'spec/helpers/letters_direction'
    ];

    require(specs, function() {
        window.onload();
    });
});