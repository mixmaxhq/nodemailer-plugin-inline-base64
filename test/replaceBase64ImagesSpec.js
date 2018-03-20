var replaceBase64Images = require('../src/replaceBase64Images');

describe('replaceBase64Images', function() {
  var replacer = function(mimeType, contents) {
    // Make up a fake string to very parameters were passed correctly.
    return mimeType + '-' + contents.split('').reverse().join('');
  };

  describe('HTML <img> tags', function() {

    it('should replace a single source (double quote)', function() {
      var html = '<img src="data:image\/png;base64,abc">';
      var expected = '<img src="cid:image\/png-cba">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should replace a single source (single quote)', function() {
      var html = '<img src=\'data:image\/png;base64,abc\'>';
      var expected = '<img src=\'cid:image\/png-cba\'>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should handle gifs', function() {
      var html = '<img src="data:image\/gif;base64,abc">';
      var expected = '<img src="cid:image\/gif-cba">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should handle jpegs', function() {
      var html = '<img src="data:image\/jpg;base64,abc">';
      var expected = '<img src="cid:image\/jpg-cba">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should handle attributes on the HTML tag', function() {
      var html = '<img style="test" src="data:image\/png;base64,abc" width="100%">';
      var expected = '<img style="test" src="cid:image\/png-cba" width="100%">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should replace multiple sources', function() {
      var html = '<img src="data:image\/png;base64,abc"><br><img src="data:image\/jpeg;base64,def">';
      var expected = '<img src="cid:image\/png-cba"><br><img src="cid:image\/jpeg-fed">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should ignore other mimetypes', function() {
      var html = '<img src="data:image\/bad;base64,abc">';
      var expected = '<img src="data:image\/bad;base64,abc">';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should not touch regular img tags', function() {
      var html = '<img src="image.png">';
      expect(replaceBase64Images(html, replacer)).toBe(html);
    });

    it('should not replace base64 outside of an image tag', function() {
      var html = 'data:image/png;base64,abc';
      expect(replaceBase64Images(html, replacer)).toBe(html);
    });

  });

  describe('Inline CSS `url`', function() {

    it('should replace a single source (no quote)', function() {
      var html = '<div style="background-image: url(data:image\/png;base64,abc);"></div>';
      var expected = '<div style="background-image: url(cid:image\/png-cba);"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should replace a single source (double quote)', function() {
      var html = '<div style=\'background-image: url("data:image\/png;base64,abc");\'></div>';
      var expected = '<div style=\'background-image: url("cid:image\/png-cba");\'></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should replace a single source (single quote)', function() {
      var html = '<div style="background-image: url(\'data:image\/png;base64,abc\');"></div>';
      var expected = '<div style="background-image: url(\'cid:image\/png-cba\');"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    '&quot; &QUOT; &#34; &#x22; &#X22;'.split(' ').forEach(function(q) {
      it('should replace a single source (double quote escaped as ' + q + ')', function() {
        var html = '<div style="background: url(' + q + 'data:image\/png;base64,abc' + q + ');"></div>';
        var expected = '<div style="background: url(' + q + 'cid:image\/png-cba' + q + ');"></div>';
        expect(replaceBase64Images(html, replacer)).toBe(expected);
      });
    });

    '&apos; &#39; &#x27; &#X27;'.split(' ').forEach(function(q) {
      it('should replace a single source (single quote escaped as ' + q + ')', function() {
        var html = '<div style="background: url(' + q + 'data:image\/png;base64,abc' + q + ');"></div>';
        var expected = '<div style="background: url(' + q + 'cid:image\/png-cba' + q + ');"></div>';
        expect(replaceBase64Images(html, replacer)).toBe(expected);
      });
    });

    it('should handle gifs', function() {
      var html = '<div style="background-image: url(data:image\/gif;base64,abc);"></div>';
      var expected = '<div style="background-image: url(cid:image\/gif-cba);"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should handle jpegs', function() {
      var html = '<div style="background-image: url(data:image\/jpg;base64,abc);"></div>';
      var expected = '<div style="background-image: url(cid:image\/jpg-cba);"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should replace multiple sources', function() {
      var html = '<div style="background-image: url(data:image\/png;base64,abc);"></div><br><div style="background-image: url(data:image\/png;base64,def);"></div>';
      var expected = '<div style="background-image: url(cid:image\/png-cba);"></div><br><div style="background-image: url(cid:image\/png-fed);"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should ignore other mimetypes', function() {
      var html = '<div style="background-image: url(data:image\/bad;base64,abc);"></div>';
      var expected = '<div style="background-image: url(data:image\/bad;base64,abc);"></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

    it('should not replace base64 outside of a css `url()`', function() {
      var html = 'data:image/png;base64,abc';
      expect(replaceBase64Images(html, replacer)).toBe(html);
    });

    it('should allow spaces like `url( "data:..." )`', function() {
      var html = '<div style=\'background-image: url(  "data:image\/png;base64,abc" );\'></div>';
      var expected = '<div style=\'background-image: url(  "cid:image\/png-cba" );\'></div>';
      expect(replaceBase64Images(html, replacer)).toBe(expected);
    });

  });

});
