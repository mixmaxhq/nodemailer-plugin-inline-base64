# Nodemailer plugin for handling inline Base64 images as attachments

Base64 images are generally a [bad idea](https://sendgrid.com/blog/embedding-images-emails-facts/) because they aren't supported in most email clients. This Nodemailer plugin will take base64 images in your email html in the form:

    <img src="data:image/*;base64,...">

and replace it with a CID-referenced attachment that works in all email clients.

## Install

Install from npm

    npm install nodemailer-plugin-inline-base64 --save

## Usage

#### 1. Load the `nodemailer-plugin-inline-base64` plugin:

```javascript
var inlineBase64 = require('nodemailer-plugin-inline-base64');
```

#### 2. Attach it as a 'compile' handler for a nodemailer transport object

```javascript
nodemailerTransport.use('compile', inlineBase64)
```

## Example

```javascript
var nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');
transporter.use('compile', inlineBase64);
transporter.sendMail({
    from: 'me@example.com',
    to: 'hello@mixmax.com',
    html: '&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAACCAYAAACE7KJkAAAAI0lEQVRYR+3DMQ0AAAgDsKlFzZxgEhOcbdIEAIBf7Y6qqn8P0MMQZPno7TMAAAAASUVORK5CYII=">'
});
```

## License

**MIT**
