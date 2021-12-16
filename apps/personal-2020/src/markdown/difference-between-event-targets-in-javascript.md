---
path: "/blog/difference-between-event-targets-in-javascript"
date: "2020-05-05"
title: "Difference between Event targets in JavaScript"
description: "Description of the differences between the three event targets in JavaScript and how to use them to optimize your app"
thumbnail: "../blog/difference-between-targets.png"
language: "en"
category: "javascript"
---

# The difference between Event Targets in JavaScript and how to use them to optimize your app.

Imagine an app that contains 200 clickable elements on a page. A real example may be the email list in the single-page app. Each email listens to a `click` event to subsequently open an overlay with the contents of the email. You don't want to switch on other pages often, so you tick the option to view 200 e-mails per page. You now have a minimum of 200 event listeners on your page that had to be allocated. Such quantities can already cause problems with the page's performance on older machines. Such a problem can be solved simply by Event targets. The popular Javascript Library ReactJS uses the same solution to optimize applications. As experts at Facebook, you can find how to address this problem below.

---

Anyone who has worked with Event Handlers responding to user interactions has met Event Targets. Event target is an object that contains information about the element above which the event occurred. The definition is quite straightforward. What's confusing is the fact that each event has two to three Event Targets out of a total of three possible.
All events contain targets:

- event.target
- event.currentTarget

Additionally, events that occur as a result of the user's interaction with the positioning device (mouse, touchpad) have the following target:

- event.relatedTarget

## event.relatedTarget

Let's start with the least known but simplest, namely `event.relatedTarget` This object is used in MouseEvent for example for mouseenter, when we use the cursor to go to the element (e.g. id=red) that listens to this event. Object relatedTarget after calling mouseenter contains the surrounding element from which we drove the cursor on our element (red).

So the relatedTarget object contains a secondary target. What relatedTarget contains at what event can be read in the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget).
With this, we discussed relatedTarget, and now we can look at the other two (target, currentTarget) that can achieve the mentioned optimization.

## Event delegation

To understand the difference between target and currentTarget, you need to understand the so-called Event delagation. This is a technique of delegating listening to parent element events for all events that take place inside a given parent element. What the event does is so-called Event Bubbling, where every event bubbles through all the parent elements to the `html` element. Any listener in any parent can capture this bubbling event.

Thanks to Event Delegation, on the `html` element we can capture all the events that occurred anywhere on the page.

```js
// this funcionality can be stopped via
event.stopPropagation();
```

## event.target vs event.currentTarget

We already know how events work. So what's the difference between target and currentTarget? Target contains a reference to the object above which the event was called, while currentTarget is the ready-only object of the element to which the event listener was attached. This can be better explained in the example. We'll use an e-mail list from the introduction as an example. So we create a sheet with items in HTML

```html
<ul id="list">
  <li>e-mail #1</li>
  <li>e-mail #2</li>
  <li>e-mail #3</li>
</ul>
```

In JavaScript, we'll add an event listener to listen to `click` events on `<ul>` elemenent

```js
const list = document.getElementById("list");
list.addEventListener("click", (event) => {
  debugger;
});
```

In the event of a `click`, debugging functionality (if it exists in the environment) is triggered. When we run the code in the browser where it will act as a breakpoint (the execution of the code stops). After bumping into our breakpoint, we can explore the content of the transformations.
So we open the above code in the browser while opening DevTools (F12). We'll see a sheet and three items in it (email #1-3). When we click on the first item, we get stuck on Breakpoint and can explore variables in the suspended page. In this case, we are interested in the value of the `event` parameter in the arrow function inside `addEventListener`. On the screenshot below, we can see that currentTarget refers to the `<ul>` sheet. If you point the cursor on `ul#list`, what element is referenced will be marked on your page.

![Screenshot of DevTools with currentTarget](../images/blog/targets-debug-1.png)
After scrolling, we also see a target that refers to the item we clicked on.
![Screenshot of DevTools with target](../images/blog/targets-debug-2.png)
So we see that the target contains an element that was clicked on and a currentTarget element that listened to the click. The keen eye will also notice relatedTarget, as it is also a `click` event MouseEvent.
We now have a solid understanding of the difference between target and currentTarget.

**Note:** `debugger` in code we use primarily because currentTarget is only available at the time of processing the event. So if we call `console.log(event)`, you'll see currentTarget as `null` in a given object. Beware of this little thing!

## Optimization

So how do they translate this difference into code optimization? If we had a few tens / hundreds / thousands of related elements on the page that had their own event handlers, we would unnecessarily overwhelm the browser. We would also overwhelm us. For each element, we would have to add an event listener and possibly remove it. That can get out of control. So a simpler approach is to set one event listener to a parent element (in our case `<ul>`) that will use the target to distinguish between clicks on individual items (e-mails in `<li>`).
The same approach is used by the aforementioned ReactJS. This sets one event listener to a root element that captures all the events that it subsequently assigns to individual listers like [SyntheticEvent](https://reactjs.org/docs/events.html). SyntheticEvent is the wrapper of a native event because of cross-browser compatibility. With this delegation, ReactJS will achieve considerable optimisation.

**Note:** in applications with ReactJS, this optimization is unnecessary as it already does so by React.

## Summary

I explained the difference between target, currentTarget and relatedTarget. We know relatedTarget is only on MouseEvent Events. Also, the difference between target and currentTarget using event delagation using event Bubbling, which can be used for optimization.
