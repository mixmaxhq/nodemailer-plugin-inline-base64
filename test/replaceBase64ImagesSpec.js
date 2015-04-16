var replaceBase64Images = require('../src/replaceBase64Images');

describe('replaceBase64Images', function() {
  var replacer = function(contents) {
    return contents.split('').reverse().join('');
  };

  it('should replace a single source', function() {
    var html = '<img src="data:image\/png;base64,abc">';
    var expected = '<img src="cid:cba">';
    expect(replaceBase64Images(html, replacer)).toBe(expected);
  });

  it('should handle attributes on the HTML tag', function() {
    var html = '<img style="test" src="data:image\/png;base64,abc" width="100%">';
    var expected = '<img style="test" src="cid:cba" width="100%">';
    expect(replaceBase64Images(html, replacer)).toBe(expected);
  });

  it('should replace multiple sources', function() {
    var html = '<img src="data:image\/png;base64,abc"><br><img src="data:image\/png;base64,def">';
    var expected = '<img src="cid:cba"><br><img src="cid:fed">';
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
