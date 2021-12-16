---
path: "/blog/5-canny-little-tricks-for-react-devs"
date: "2020-03-31"
title: "5 Canny little tricks for React devs"
description: "Canny tricks that won't make your React app better but will make your dev process easier."
thumbnail: "../blog/5_canny_react_tricks.png"
language: "en"
category: "react"
---

# 5 Canny little tricks for React devs

React is a Javascript library for building user interfaces. It is maintained by Facebook and the community of individual developers of Facebook. React can be used as a base in the development of single-page apps or mobile apps. However, React only deals with rendering data to DOM, and so creating React applications usually requires using additional data management libraries. Redux and React Router are examples of these libraries.

---

## 1. Pretty print your props.

You just created new component that has massive amount of props. To quickly get your head around them you can pretty print them on page with more arguments on native JSON.stringify function.

```jsx
const NewComponent = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;
```

---

## 2. Solve multiple HOC around a component?

You cannot use hooks for some reason so you end up with HOC (Higher Order Components). That can get hairy in no time. Use compose function to clean your code. You can create your own or if you use redux you can import one from it.

```jsx
export default connect(mapStateToProps, mapDispatchToProps)(i18n(format(Component)));

// vs.

import { compose } from 'redux'; // or your implementation

const enhance = compose(
   connect(mapStateToProps, mapDispatchToProps),
   i18n,
   format
);
export default enhance(Component);
```

---

## 3. console.log function that uses concise body (body without return statement).

You have function component that use concise body so you immidietely return body without the need of `return` statement. Pretty cool time saver.. but what about the time you want to console.log props. You would have to convert it to block body with return statement. Or not? Actually you can use condtional logic for it.

```jsx
const Component = (props) => console.log(props) || <div>{props.children}</div>;
```

This both logs `props` to console and render the component because console.log returns falsy value so it skips to second part of the condition.

---

## 4. Manually restart nodemon

Sometimes you want to restart nodemon server manually. Instead of some random change to a random file and Ctrl + S just type `rs` with a carriage return (Enter) to the terminal running nodemon. It will restart.

---

## 5. Pass HTML character references as props

Want to pass HTML character references as props in JSX? It works with simple string but breaks with more complex logic. You can achieve it with String.fromCharCode function

```jsx
// <Component charCode={160} />
// 160 -> non-breaking space

const Component = (props) => {
  const divider = String.fromCharCode(props.charCode);
  return (
    <div>
      <SubComponent text={`${divider}-${divider}`} />
    </div>
  );
};
```

---

Find more tricks on my Twitter!
https://twitter.com/Michalhonc
