---
path: "/blog/difference-between-inherit-initial-unset-and-revert"
date: "2020-05-18"
title: "Difference between inherit, initial, unset, and revert in CSS"
description: "Are you familiar with the differences between inheritance, initial, unset and revert? You will be after reading this article."
thumbnail: "../blog/inherit_thumbnail.png"
category: "css"
language: "en"
---

# Difference between inherit, initial, unset, and revert in CSS

Do you know what the differences are between the four CSS values for controlling the inheritance of the rules? This article will present them to you and explain when to use what value in a given situation.

For each CSS property, these values are valid. In order to fulfill understanding how these values work, it takes explaining when a property is inherited and when it is not.

---

## Inherited properties

Inherited properties are those properties that, when not specified, take the value of the property from the parent element. An example may be the property `color` If we set that to a `html` element, all child elements that don't have the `color` property inherit the value from the `html` element.

```css
html {
  color: blue;
}

footer {
  color: red;
}
```

In this case, all the text, except the footer, will be blue. The footer will have red text.

If the CSS property has not been set anywhere, its value is taken from the default styles.

```css
html {
}
footer {
  color: red;
}
```

In the case of Chrome, the all-purpose text will be black except for the footer as the default color of the property `color` is black.

## Non-inherited properties

The opposite are properties that are not inherited. Unless we specify such a property. Its value will be set from the default styles.

We will use the `border` nature as an example. If we set that to a `html` element, only a `html` element will have that value.

```css
html {
  border: 1px solid blue;
}

footer {
}
```

No other element will have a blue border. The footer does not have the `border` set, so it will use the default value. The footer will have the value of the CSS property of `border` equal to `none`

## inherit

The first value we explain is `inherit`. It creeps out from its name that if it specifies a property for CSS, it will take the value from the parent element. So, for inherited qualities, it sets their guiding behavior. For example, it finds practical uses when resetting a value in media query. For non-inherited properties, this value can also be set, but in practice I have not yet encountered a situation where it would be suitable for use.

```css
html {
  color: grey;
}

p {
  color: lightgrey;
}
@media only screen and (max-width: 600px) {
  p {
    color: inherit;
  }
}
```

## initial

If you don't need to use inheritance, you use the value `initial`. That given CSS property sets the default value given in the specification. This makes the element with this homeliness independent of the parent element and its value of the same CSS property.

```css
div {
  color: green;
}

div > p {
  color: initial;
}
```

## unset

The combination of the two above values is `unset`. After setting the CSS property, `unset` acts dependent on whether the given CSS property is inherited or not. If the CSS property is inherited (e.g. `color`), The CSS property will behave as if it has a value of `inherity`, i.e. it will inherit the value from the parent element. If the CSS property is not hereditary (e.g. `boder`), The CSS property will behave like a value of `initial`. It is therefore a combination of `intial` and `inheritance` that does not change its inherited behaviour for a given CSS property.

```css
div {
  color: green;
  border: green;
}

div > p {
  color: red;
  border: red;
}

@media only screen and (max-width: 600px) {
  div > p {
    color: unset; /* -> green */
    border: unset; /* -> none */
  }
}
```

## revert

Revert is a whole new value currently (18-05-2020) supported only in Firefox and Safari. It behaves very much like `unset`. The difference is that `revert` versus `unset` can refer to maximum user agent stylesheet. This means that the value specified in the specification is not taken as `initial`. This makes a difference, for example, with the property `display` for paragraph. Its value in the specification is `inline`, whereas the default browser value for the section is `block`.

```css
p {
  display: unset; /* -> inline */
  display: revert; /* -> block */
}
```

## all

We explained all the values by which the current value can be reset. These values also include one CSS property, namely `all`. This property sets `original / inherit / unset / revert` to all CSS properties of the element. So it is not necessary to list all the properties.

```css
p {
  color: unset;
  border: unset;
}
/* vs */
p {
  all: unset;
}
```
