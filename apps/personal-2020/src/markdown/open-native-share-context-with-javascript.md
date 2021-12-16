---
path: "/blog/open-native-share-context-with-javascript"
date: "2020-11-20"
title: "Open native share context with Javascript"
description: "Did you know that you can use the same share popup menu that native mobile apps use in Javascript via browser API? Check out the details, browser support and demo of this API."
category: "javascript"
language: "en"
---

# Share text, links, and files to other OS apps with Javascript share API

Surely you have already used Share API in mobile native apps. It's the popup menu with all apps that can receive share context with the addition of locations like a copy to clipboard. This API is well known in [iOS](https://developer.apple.com/design/human-interface-guidelines/ios/extensions/sharing-and-actions/) and [Android](https://developer.android.com/training/sharing/) ([React Native](https://reactnative.dev/docs/share) and [Expo](https://docs.expo.io/versions/latest/sdk/sharing/)) but did you know that you can trigger the same popup via browser API?

The W3C specification is still a draft but well supported by the browsers. It's mostly available in mobile browsers (makes sense) but Safari on macOS and Edge on Windows do support it for desktop at time of writing (11-2020).

## API

The API consists of two functions on `navigator` object. The first function is `share()` which takes a data object as a single parameter. You can pass the following to this object

```js
{
	url: USVString,
	text: USVString,
	title: USVString,
	fiels: Files[],
}
```

> USVString is a sequence of Unicode scalar values. Simply USVString is a sequence of numbers that are represented by a related characters in the Unicode standard.
> Image, video, audio, and text files can be shared

This function returns a promise that is resolved once the user completed a share action. Rejected can be when the user closed the share context popup or when the specified data parameter is not valid. This API works only for HTTPS protocol and only after the user interacted with the page, ie. you can not init share popup onload.

```js
// async context is present
try {
  await navigator.share({
    title: "Share API",
    text: "This API is cool!",
    url: "https://example.com",
  });
} catch (err) {
  console.log(err);
}
```

To check if a given file array can be shared, use the `canShare()` function that takes an object as a parameter with an interface:

```js
{
	files: Files[];
}
```

Usage may be following:

```js
// in HTML
<input id=“files” type="file">
// …
// async context is present
// Event Handler
const { files } = document.getElementById('files');
if (navigator.canShare?.({ files })) {
  await navigator.share({
    files,
    title: 'Pictures',
    text: 'Our Pictures.',
  });
}
```

> Note that `canShare()` has lesser support than `share()`!

## Fallback

For browsers that do not support this API should be available a fallback. Either the share button is not shown or a custom popup is presented to the user. Such popup can consist of options such as copy to clipboard, share on social media, open in a mail client (anchor with the mailto prefix as href) or [paste it to message](https://stackoverflow.com/questions/6480462/how-to-pre-populate-the-sms-body-text-via-an-html-link).

Links for implementation of custom share behavior for social media:

- [Twitter](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview)
- [Facebook](https://developers.facebook.com/docs/plugins/share-button/)

## Conclusion

With Share API users can customize their preferred share targets on their own device instead of being limited to just the predefined options.

## Links

- [W3C Specification](https://w3c.github.io/web-share/)
- [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Web Dev Post](https://web.dev/web-share/)
