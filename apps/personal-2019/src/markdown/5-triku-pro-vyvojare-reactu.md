---
path: "/blog/5-triku-pro-vyvojare-reactu"
date: "2020-03-31"
title: "5 triků pro vývojáře Reactu"
description: "Triky, které Vaši aplikaci nezlepší, ale usnadní vám proces vývoje"
thumbnail: "../images/blog/5_canny_react_tricks.png"
language: "cs"
category: "react"
---

React je JavaScriptová knihovna pro budování uživatelských rozhraní. Udržuje ji Facebook a komunita jednotlivých vývojářů společnosti Facebook. React lze využít jako základ při vývoji single-page aplikací či mobilních aplikací. React se však zabývá pouze renderováním dat do DOM, a tak vytvoření React aplikací obvykle vyžaduje použití dalších knihoven pro správu dat. Redux a React Router jsou příklady těchto knihoven.

---

## 1. Vykreslete přehledně Vaše props.

Právě jste vytvořili novou komponentu, která má veliké množství props. Abyste se rychle zorientovali, můžete je přehledně vykreslit na stránku s pomocí extra argumentu v nativní funkci JSON.stringify.

```jsx
const NewComponent = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;
```

---

## 2. Používáte více HOC komponent najednou?

Z nějakého důvodu nemůžete použít React Hooks, takže skončíte s HOC (Higher Order Component). To se může vymknout kontrole v okamžiku, kdy jich použijete více najednou. Pro čistší kód použijte funkci `compose`. Můžete si vytvořit vlastní nebo jestli používate Redux, můžete importovat tu.

```jsx
export default connect(mapStateToProps, mapDispatchToProps)(i18n(format(Component)));

// vs.

import { compose } from 'redux'; // nebo vaše implementace

const enhance = compose(
   connect(mapStateToProps, mapDispatchToProps),
   i18n,
   format
);
export default enhance(Component);
```

---

## 3. Použití console.log(props) v komponentě bez těla.

You have function component that use concise body so you immidietely return body without the need of `return` statement. Pretty cool time saver.. but what about the time you want to console.log props. You would have to convert it to block body with return statement. Or not? Actually you can use condtional logic for it.
Máte funkcionální komponentu, která přímo vrací JSX bez další JS logiky. Docela super zkratka.. ale co ve chvíli, kdy chcete vypsat props do konzole?. Budete muset přepsat komponentu aby se dalo zavolat console.log. Nebo ne? Dá se využít conditional logic.

```jsx
const Component = (props) => console.log(props) || <div>{props.children}</div>;
```

Taková kód vypíše props do konzole a zároveň vykreslí komponentu. Stane se tak díky tomu, že console.log vrátí falsy hodnotu. Logika tedy použije druhou část výrazu a vykreslí komponentu.

---

## 4. Manuálně restartujte nodemon

Někdy chcete restartovat server nodemon ručně. Namísto nějaké náhodné změny náhodného souboru a Ctrl + S stačí zadat do terminálu běžícího nodemon `rs` a zmáčknout Enter. Nodemon se restartuje.

---

## 5. Posílání HTML entity jako props

Pro posílání HTML entit v props používejte číslo charakteru společně s funkcí String.fromCharCode.

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
