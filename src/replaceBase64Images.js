 var replaceBase64Images = function(html, getCid) {
   return html.replace(/(<img[\s\S]*? src=")data:(image\/(?:png|jpe?g|gif));base64,([\s\S]*?)("[\s\S]*?>)/g, function(g, start, mimeType, base64, end) {
     return start + 'cid:' + getCid(mimeType, base64) + end;
   });
 };

 module.exports = replaceBase64Images;
