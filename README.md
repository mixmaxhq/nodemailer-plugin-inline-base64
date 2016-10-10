# Nodemailer plugin for handling inline Base64 images as attachments

This plugin will convert base64-encoded images in your [nodemailer](https://github.com/nodemailer/nodemailer) email to be inline ("CID-referenced") attachments within the email. Inline attachments are useful because them embed the image inside the actual email, so it's viewable even if the user is checking their email without an internet connection. But if you're OK with requiring that the user be online to see the image, then consider hosting your images from AWS Cloudfront using [nodemailer-base64-to-s3](https://github.com/crocodilejs/nodemailer-base64-to-s3).

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
