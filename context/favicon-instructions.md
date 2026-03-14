Please:

- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/favicon.svg and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/favicon-96x96.png and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/favicon.ico and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/apple-touch-icon.png and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/web-app-manifest-192x192.png and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/web-app-manifest-512x512.png and save it to `PUBLIC_FOLDER`
- Download https://realfavicongenerator.net/files/c584148a-dabc-47db-a8ea-efcfef3a1d37/site.webmanifest and save it to `PUBLIC_FOLDER`

There are HTML markups to add to all pages of the website. However, they should not be duplicated. There must be a file (or a few files) in my project where these markups can be added once for all. This is probably the file where the root `<html>` tag is defined.

In this file (or these files), add the following HTML markups:

```html
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="that ai guy" />
<link rel="manifest" href="/site.webmanifest" />
```