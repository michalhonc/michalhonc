---
path: "/blog/7-ways-to-bypass-adblock"
date: "2020-02-25"
title: "7 ways to bypass AdBlock"
description: "Don't lose advertising money because of AdBlock! Find out 7 ways you can defend yourself against AdBlock."
thumbnail: "../blog/adblock_thumbnail.png"
category: "ads"
language: "en"
---

# 7 ways to bypass AdBlock

Either you're on the side of a user who will use AdBlock to remove all ads so they can browse the website undisturbed, or you run a website and AdBlock blocks ads that monetize your work. The aim of this article is to help you, as a website owner, to combat advertising blocking. To win, you need to understand how AdBlock works. Identify its strengths and weaknesses and set a strategy against blocking advertising accordingly.

---

## What AdBlock is?

AdBlock is primarily referred to as web browser add-ons that block ads on websites. The user simply installs them into the web browser and no longer has to worry about anything when browsing through the Internet. AdBlock will solve everything in the background.

### Types of AdBlock

There are different kinds and variations of AdBlock that solve the same task in the results. The most used include uBlock Origin, AdBlock and AdBlock Plus. For this article, we will focus on the last one. There are no accurate statistics, but AdBlock is estimated to use higher units to lower tens of percent of Internet users. This is no longer a negligible amount of users and potential advertising income.

### What and how it is blocked?

So how can AdBlock find advertising and just not show it to the user? To find the answer, at least have basic knowledge of HTML and CSS. Let's have the following HTML structure:

```html
<div id="article">This is an article.</div>
<div id="advertisement">Buy new phone with 50% discount!</div>
<div id="article_2">Another article.</div>
```

On a glance, it's clear what advertising is, and what an advertiser isn't. The AdBlock add-on just looks at its database of well-known ads and compares the individual elements on the page. If it finds a match, it removes the element from the page. Since `id = "Advertisement" 'is most likely in the database of known ads, AdBlock deletes this element and all its child elements in HTML.

The term to remove is not accurate, you could more accurately say it hides it. Such an advertising element in HTML is still there, only to be set a rule using CSS to hide it from the user:

```css
display: none !important;
```

#### What is AdBlock's database of well-known ads?

That database of well-known ads is called easylist. Easylist can have each AdBlock supplement of its own. Furthermore, Easylists can also be divided by language. Easylist content is strutored as a sheet of individual rules that have two items, namely domain and rule.

This means that each rule is assigned to a domain. This allows rules to be written either for a particular domain or globally for all sites.
For an idea, I attach a link to the [Czech easylist](https://github.com/tomasko126/easylistczechandslovak/blob/master/filters.txt) from user tomasko126 on github.

### What's AdBlock targeting?

AdBlock can write rules on anything in HTML and CSS. It can focus on the level of HTML tag immersion, their classes, id, attribute data, css rules and their order.

### How to find out what AdBlock is catching on my page?

If you don't know what AdBlock is grasping for on your page, I attach a simple guide.

1. Install AdBlock Plus as a add-on to your browser,
2. open DevTools (F12 keyboard shortcut),
3. in DevTools, click on the "AdBlock Plus" tab,
4. up in dropdown, set up "Show _ Blocked _ Items of _ any _ type",
5. Reload Page

You'll get a red sheet of all the blocked elements on the page, their types (script, element, etc.), domains and blocking rules. You can read from it what easlist the rule comes from.

![Screenshot of blocked elements in DevTools at novinky.cz (source: my own processing)](../images/blog/adblock_devtools.png)

---

## How to bypass AdBlock rules?

### Program for _"acceptable ads"_

The first ways is an official one. AdBlock Plus has a [program](https://adblockplus.org/en/acceptable-ads) for _ "acceptable ads" _ that grants an exception with blocking advertising under certain conditions.

Conditions include:

- Placing advertising outside the main content
- Clear resolution of what is content and what is advertising
- Advertising size on the page

### Create issue in easylist to remove rule

If you think AdBlock is blocking an element that isn't advertising, or a rule on your page breaks a layout, you can add an issue to the appropriate easylist with a comment on what's blocking, what's breaking it, and how to reproduce it. If the easylist administrator approves your claim, the rule will be removed or replaced.

TIP: This strategy can be used a little differently. This is by deliberately arranging the elements on the page so that when AdBlock blocks the element, the layout page falls apart. But it is not guaranteed that you will succeed in claiming such a rule.

### Proxy URLs

Proxing a familiar advertising URL through your domain. AdBlock can focus on URLs in the link in HTML (for example, `advertima.eshop.cz/mobile`), thereby blocking the entire advertising element. So if you change the URL in the link to, for example, `vasedomena.cz/direct?ID=3958104` and redirect from this URL to `advertima.eshop.cz/mobile`, AdBlock has nothing to grab on to.

Advertising scripts that AdBlock simply blocks can also be tackled this way.

### Hashing CSS classes and attributes

The often used technique of fighting AdBlock is hashing out CSS classes and other elements. If a CSS ad has a class called `Ad', it's simple to filter it out. If you're throwing up the value, filtering it will be more native. If you dynamically hash out the value, filtering using CSS classes will be virtually impossible.

Such dynamic shedding can have different implemnnings. For example, you can use a bundler (e.g. [Webpack](https://webpack.js.org/), together with [CSS Modules](https://webpack.js.org/loaders/css-loader/#modules)), which classes use the hashing feature to execute such as _ class name _ + _ git commit hash _.

### Advertising camouflage

Another problem with advertising as such is its uniqueness and simple filtering. So how do you disguise such advertising?

Add other non-promotional elements to the page that have the same HTML structure, but different content. Such an element is more challenging not to include in the filtering rule.

If AdBlock adds a rule that blocks both advertising and the non-advertising element, you can go back a few steps above and create an issue in the relevant easylist.

### Using SVG instead of text "Advertising"

You may be required to label the advertising element with the words "Advertising" or "Sponsored." Unfortunately, that play into the hands of AdBlock.

It's easy to get around. Instead of text as such, you display SVG, which contains the text in question and insert it as a background image. The text in the SVG thus embedded is hidden for AdBlock. When you combine this approach with hashing out the URL of a given SVG, you have a solid defense.

```xml
<svg width="100" height="35" xmlns="http://www.w3.org/2000/svg">
  <g>
    <rect fill="none" height="37" width="102" y="-1" x="-1"/>
  </g>
  <g>
    <text font-family="Helvetica, Arial, sans-serif" font-size="24" y="24.5" x="2.5" stroke-width="0" stroke="#000" fill="#444">
      Advertising
    </text>
  </g>
</svg>
```

To meet the previous _ Advertising _ point, you can create a second SVG that has no text and is zero in size. You insert such SVGs into all non-advertising elements so that, again, they are least different from advertising in terms of HTML structure.

Another approach is to parse texts into several HTML tags in different order. Facebook, for example, has implemented this approach.
![ Facebook's strategy to fight AdBlock (source: https://bit.ly/2RlctiB)](../images/blog/facebook-adblock.jpeg)

### Converting users to mobile version or native app

A bit of an alternative solution is to try to have more users on a mobile browser or on a native app. It's not easy to block ads on these platforms. For example, there are no add-ons on mobile versions of browsers, and the only option for users is to download a browser that has a directly integrated AdBlock.

---

## Conclusion

The fight against AdBlock is a long run that can pay off. Start by calculating how much a month you lose money because of AdBlock. You can calculate how much time it will cost you to prevent AdBlock. The difference between calculations may or may not convince you whether or not to resist blocking advertising.
