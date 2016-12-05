var replaceBase64Images = require('./replaceBase64Images');
var crypto = require('crypto');

var plugin = function(options) {
  options = options || {};
  return function(mail, done) {
    if (!mail || !mail.data || !mail.data.html) {
      return done();
    }

    mail.resolveContent(mail.data, 'html', function(err, html) {
      if (err) return done(err);

      var attachments = {};

      html = replaceBase64Images(html, function(mimeType, base64) {
        if (attachments[base64]) return attachments[base64].cid;

        var randomCid = (options.cidPrefix || '') + crypto.randomBytes(8).toString('hex');

        attachments[base64] = {
          contentType: mimeType,
          cid: randomCid,
          content: base64,
          encoding: 'base64',
          contentDisposition: 'inline'
        };
        return randomCid;
      });

      mail.data.html = html;

      if (!mail.data.attachments) mail.data.attachments = [];

      Object.keys(attachments).forEach(function(cid) {
        mail.data.attachments.push(attachments[cid]);
      });

      done();
    });
  }
};

module.exports = plugin;
