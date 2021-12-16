---
path: "/blog/concurrent-mode-and-suspense-api-in-reactjs-1"
date: "2020-05-11"
title: "New API in Concurrent Mode in ReactJS"
description: "What Concurrent Mode is in ReactJS and how Suspense API can improve user experience of your app"
thumbnail: "../blog/concurrent-mode-1_thumbnail.png"
category: "reactjs"
language: "en"
---

# New API in Concurrent Mode in ReactJS

This is the first part of an article on Concurrent mode in ReactJS. This section deals with the explanation of the Concurrent Mode principle at ReactJS and its practical demonstration with the `Suspense` API. The second part deals with the part of the API that works with loading components, when the user interacts with your app.

---

At the React Conf 2019, the team responsible for the ReactJS library presented an experimental release of the so-called Concurrent Mode. About two weeks after that, they [publicized](https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) the details on their blog. What's this all about? These are new APIs and practices that have one main objective, namely improving the user experience in ReACT applications. But how?

The new API could accelerate the rendering of components by 30%. Or less JavaScript could be downloaded. That would improve the user experience, wouldn't it? Not necessarily. Conversely, in some cases Concurrent Mode even displays the information later than without this mode. So how can any slowdown in the retrieval of information improve the user experience? Users do not have stopwatch in hand to notice that their page has rendered 200ms faster, or that the specific component has rendered 50ms faster. Of course, it's not optimal for them to wait 5 seconds per page. But that's not a React problem, it's the architecture of the apps themselves. In fact, users use their eyes to judge a page's speed. So they see not the time to load the page in milliseconds, but the way it is loaded. They'll notice how many loading states have appeared on the page. They'll notice how many times the layout has changed. Where what box jumped because information was loaded into it. Optimizing these visual aspects will achieve the aforementioned user improvement

These visual aspects may not be as apparent on the latest Macbook on the 4G network. The worse the user's hardware and internet connection, the lower the quality of the user experience. As the numbers of users on mobile devices increase steadily, it is more likely that the user experience is not optimal.

## CPU-bound solution

The first part ReactJS is trying to optimize is creating a DOM node and working with components. Currently, ReactJS renders components in a way that blocks their interruption. That's turning in concurrent mode. If the component starts to render, it can be interrupted and something else that has a higher priority can start updating. After that, React returns to the interrupted rendering and completes the rendering. Concurrent mode thus reduces the need to use the debounce technique, which, while acting as an optimisation solution, is not optimal from a user point of view.

## Solution tied to adding information

The second part of Concurrent mode focuses on any async loading of information. This may be data from API, images, scripts, etc. Simplified, React will begin rendering in memory before the network data itself arrives. One can argue a situation in which we need to respond to a change in props, or a request is dependent on props. In principle, request calls should depend on event handlers. Translated into React speech, we should call a request in the parent component in the event handler. This will ensure that the rendering of the subcomponent and the API request begin to be done in parallel.

```jsx
const App = () => {
  const [data, setData] = useState(props.defeaultData);
  const handleOnClick = useCallback(() => {
    setData(fetch(url + data.id).then(..));
  }, [props.defaultData]);
  return (
    <>
      <button onClick={handleOnClick}>
        Load data
      </button>
      <Site resource={data} />
    </>
  );
}
```

To improve the user experience, new APIs are added to set the order of loading individual components and how they are loaded.

## Turning Concurrent mode on

To turn Concurrent mode on in the app, the API changes when React is initialized into a DOM element. Using API `createRoot` you can simply turn on Concurrent mode. As Concurrent mode has semantic changes, API `createBlockingRoot` has also been added to serve as an intermediate step in converting a complex application to Concurrent mode.

In news app can be used:

```js
ReactDOM.createRoot(rootNode).render(<App />);
```

instead of

```js
ReactDOM.render(<App />, rootNode);
```

## Suspense API

### Suspense

The first API you use to optimize data retrieval is `Suspense`. The Suspense will wait to render the component to retrieve the data. In the meantime, it will display a fallback. Fallback can be anything renderable, i.e. string, number or component. Fallback is sent as prop `fallback` u `Suspense`.

```jsx
<Suspense fallback="Loading..">
  <Content />
</Suspense>
```

### SuspenseList

`SuspenseList` is a warpper component that acts as a control center. So it controls what subcomponent Suspense is rendered in what order. Without using `SuspenseList`, individual `Suspense` renders themselves independent of the others and their order in the JSX.

SuspenseList has two props. The first is `revealOrder`, which determines in what order the `Suspense` is rendered. It can render from the start (forwards), from the end (backwards) or all at once (together). The second is `tail`, by which we tell how to display fallbacks in individual `Suspenses`. Default `SuspenseList` displays all fallbacks. S `tail=collapsed` will show only another fallback in order. S `tail=hidden` shows no fallback. The `SuspenseList` works with only one `Suspense` nested, but there's no problem using the nested `SuspenseList` in itself.

```jsx
<SuspenseList revealOrder="forwards">
  <Suspense fallback="loading">
    <Content />
  </Suspense>
  <Suspense fallback="loading">
    <SideBar />
  </Suspense>
</SuspenseList>
```

## Demo

For the demo on the API suspension, I've chosen Twitter. Loading states and loaded content are gradually drawn when the browser version is loaded. I have no idea if Twitter wants to do something about it or I'm missing something, but it doesn't suit me personally. So I would like to create an app similar to the (structure) of Twitter. Since Twitter does not allow requests to their API directly from the front-end, I chose newsapi.org as a data source. If you want to try a demo, get a free key on their site. The app is created using [create-react-app](https://github.com/facebook/create-react-app).

![Twitter and his way of loading data (animation)](../images/blog/twitter-original.gif)

In animation, you see the gradual loading of individual parts and their resize after everything has been loaded.
Now, look how the demo app with `Suspense` is loaded.

![Way of loading with React Suspense](../images/blog/twitter-with-suspense.gif)

We can see that the content appears at once after all the data is loaded. It's more user-friendly.
How to accomplish that? I created 4 blocks. The first is the application as such, which is responsible for the layout of individual subcomponents. The app already contains a static left column.
Afterwards I've added 3 components:

- Feed
- TrendsForYour
- WhoToFollow

These components copy content on Twitter. Each of these three components fetches data from the API. Each fetch is packed with a `wrapPromise` that starts downloading data before the first rendering.

```js
// wrapPromise.js
export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise()
    .then((response) => {
      status = "success";
      result = response;
    })
    .catch((error) => {
      status = "error";
      result = error;
    });

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
```

We call this promise wrapper and the we call `read` method in the component.

```jsx
// Feed.jsx
const fetchFeed = async () => {
    return await fetchWithKey(...).then(r => r.json());
}

const resource = wrapPromise(fetchFeed); // call fetch in wrapPromise

const Feed = () => {
    const feed = resource.read(); // read resource
    return (
        <div className="Feed">
	        ...
        </div>
    );
};
```

We now have the component `Feed` ready for Concurrent mode and all we have to do is add the `Suspense` because of the loading behavior. In `App`, using lazy- loading, we import `Feed` since the Twitter feed is certainly not one simple component, we will add a `delay` to simulate a larger JS bundle and thus a longer load.

```js
// App.js
const Feed = React.lazy(() => import("./components/Feed").then(delay(2500)));
```

Now we can add `Feed` together with `Suspense` in to our app.

```jsx
const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Feed />
    </Suspense>
  );
};
```

First component is done. Now, it's time to add remaining two components in the same way. Add `TrendsForYou` and `WhoToFollow`. We'll also add base HTML structure and some CSS.

```jsx
// App.jsx return
<>
  <div className="Column Column--middle">
    <Suspense fallback={<Loader />}>
      <Feed />
    </Suspense>
  </div>
  <div className="Column Column--right">
    <Suspense
      fallback={<Loader className="TrendsForYou TrendsForYou--loading" />}
    >
      <TrendsForYou />
    </Suspense>
    <Suspense
      fallback={<Loader className="WhoToFollow WhoToFollow--loading" />}
    >
      <WhoToFollow />
    </Suspense>
  </div>
</>
```

If we try to run such a code using `yarn start` or `npm start` we'll see about the same behavior as existing Twitter. Individual components, depending on the length of `delay` and time at fetch, are loaded in "random" order. To steer this order, we add the `SuspenseList` with prop `revealOrder` instead of the React Fragment. The resulting JSX in `App` will look like this.

```jsx
// App.jsx return
<SuspenseList revealOrder="together">
  <div className="Column Column--middle">
    <Suspense fallback={<Loader />}>
      <Feed />
    </Suspense>
  </div>
  <div className="Column Column--right">
    <Suspense
      fallback={<Loader className="TrendsForYou TrendsForYou--loading" />}
    >
      <TrendsForYou />
    </Suspense>
    <Suspense
      fallback={<Loader className="WhoToFollow WhoToFollow--loading" />}
    >
      <WhoToFollow />
    </Suspense>
  </div>
</SuspenseList>
```

Now all components should be loaded at the same time. It is possible that, for example, `TrendsForYou` will load earlier, but wait for the other `Suspense` and then display itself. This is simple enough to work with the `Suspense` in ReactJS. In the [repository](https://github.com/michalhonc/Twitter-with-suspense), I also added several other loading variations. In the production, I can imagine that the highest priority loading will be `Feed` as the most important element on Twitters page.

The entire app is in a repository on [Github](https://github.com/michalhonc/Twitter-with-suspense).

## Summary

The first part of the article on React Suspense addressed the explanation of the Concurrent Mode principle and the application of the `Suspense` API in practice. In the next part, we look at the API `useTransition` and `useDeferredValue`, which work with loading states during user interaction. We'll show how a given API can be applied in a real application.
