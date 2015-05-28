var replaceBase64Images = require('../src/replaceBase64Images');

describe('replaceBase64Images', function() {
  var replacer = function(mimeType, contents) {
    // Make up a fake string to very parameters were passed correctly.
    return mimeType + '-' + contents.split('').reverse().join('');
  };

  it('should replace a single source', function() {
    var html = '<img src="data:image\/png;base64,abc">';
    var expected = '<img src="cid:image\/png-cba">';
    expect(replaceBase64Images(html, replacer)).toBe(expected);
  });

  it('should handle gifs', function() {
    var html = '<img src="data:image\/png;base64,abc">';
    var expected = '<img src="cid:image\/png-cba">';
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
