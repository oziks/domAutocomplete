var jsdom = require('jsdom');

describe('domAutocomplete plugin', function () {
  var $
    , searchEl
    , initialize = function (selector, limit, insensitive) {
      searchEl.domAutocomplete({
        datas: selector,
        limit: limit,
        insensitive: insensitive
      });
    }
    , changeSearchValue = function (value) {
      searchEl
        .val(value)
        .trigger($.Event('keyup', { keyCode: 39 }))
      ;
    }
  ;

  beforeEach(function (done) {
    jsdom.env({
      html: '<html><body><input/><span>Lorem</span><span>ipsum</span><span>dolor</span><span class="keyword">sit</span><span>amet</span><span class="keyword">consectetur</span><span>adipiscing</span><span>elit</span></body></html>',
      scripts: [
        '../bower_components/jquery/dist/jquery.js',
        '../src/domAutocomplete.jquery.js'
      ],
      done: function (err, window) {
        if (err)
          console.log(err);

        $        = window.$;
        searchEl = $('input');
        done();
      }
    });
  });

  it('Should add the "domAutocomplete" element', function(){
    initialize('span', 10, true);
    expect( $('ul').hasClass('domAutocomplete') ).toBe(true);
  });

  it('Should be sensitive case', function(){
    initialize('span', 10, false);

    changeSearchValue('L');
    expect( $('ul li').length ).toEqual(1);

    changeSearchValue('l');
    expect( $('ul li').length ).toEqual(2);

    changeSearchValue('s');
    expect( $('ul').children('li').length ).toEqual(4);
    expect( $('ul li:contains("ipsum")').length ).toEqual(1);
    expect( $('ul li:contains("sit")').length ).toEqual(1);
    expect( $('ul li:contains("consectetur")').length ).toEqual(1);
    expect( $('ul li:contains("adipiscing")').length ).toEqual(1);
  });

  it('Should be insensitive case', function () {
    initialize('span', 10, true);

    changeSearchValue('L');
    expect( $('ul li').length ).toEqual(3);

    changeSearchValue('l');
    expect( $('ul li').length ).toEqual(3);
  });

  it('Should be data selector is "keyword"', function () {
    initialize('.keyword', 10, false);

    changeSearchValue('s');
    expect( $('ul').children('li').length ).toEqual(2);
    expect( $('ul li:contains("sit")').length ).toEqual(1);
    expect( $('ul li:contains("consectetur")').length ).toEqual(1);
  });

  it('Should list two items', function () {
    initialize('span', 2, false);

    changeSearchValue('s');
    expect( $('ul').children('li').length ).toEqual(3);
    expect( $('ul li:contains("...")').length ).toEqual(1);

    changeSearchValue('si');
    expect( $('ul').children('li').length ).toEqual(1);
  });
});
