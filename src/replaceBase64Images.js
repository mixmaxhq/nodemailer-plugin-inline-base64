 var replaceBase64Images = function(html, getCid) {
   return html.replace(/(<img[\s\S]*? src=")data:image\/png;base64,([\s\S]*?)("[\s\S]*?>)/g, function(g, start, base64, end) {
     return start + 'cid:' + getCid(base64) + end;
   });
 };

 module.exports = replaceBase64Images;
