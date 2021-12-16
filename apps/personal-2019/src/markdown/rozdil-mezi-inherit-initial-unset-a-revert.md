---
path: "/blog/rozdil-mezi-inherit-initial-unset-a-revert"
date: "2020-05-18"
title: "Rozdíl mezi inherit, initial, unset a revert v CSS"
description: "Víte jaký je rozdíl mezi inherit, initial, unset a revert v CSS? V tomto článku zjistíte při jaké příležitosti použít jakou hodnotu."
thumbnail: "../images/blog/inherit_thumbnail.png"
category: "css"
language: "cs"
---

Víte jaké jsou rozdíly mezi čtyrmi CSS hodnotami pro kontrolování dědičnosti pravidel? Tento článek Vám je představí a vysvětlí, kdy použít jakou hodnotu v dané situaci.

Pro každou CSS vlastnost jsou tyto hodnoty validní. Abychom mohli plnět porozumět jak tyto hodnoty fungují, je potřeba vysvětlil kdy se vlastnost dědí a kdy ne.

## Dědičné vlastnosti

Dědičné vlastnosti jsou takové vlastnoti, které když nejsou specifikované, přebírají hodnotu dané vlastnosti z parent elementu. Příkladem může být vlastnost `color`. Tu když nastavíme na `html` element, všechny child elementy, které nebudou mít vlastnost `color`, zdědí hodnotu z `html` elementu.

```css
html {
  color: blue;
}

footer {
  color: red;
}
```

V tomto případě, bude veškerý text, kromě patičky modrý. Patička bude mít červený text.

Pokud CSS vlastnost nebyla nikde nastavena, její hodnota se přebírá z výchozích stylů.

```css
html {
}
footer {
  color: red;
}
```

V případě Chromu, bude veškěrý text až na patičku černý jelikož výchozí barva vlastnosti `color` je černá.

## Nedědičné vlastnosti

Opakem jsou vlastnosti, které nejsou dědičné. Pokud takovou vlastnost nespecifikujeme. Její hodnota se nastaví z výchozích stylů.
Jako příklad použijeme vlasnost `border`. Tu pokud nastavíme na `html` element, pouze `html` element bude mít tuto hodnotu.

```css
html {
  border: 1px solid blue;
}

footer {
}
```

Žádný jiný element nebude mít modrý rámeček. Patička nemá `border` nastavený, použije tedy výchozí hodnotu. Patička bude mít hodnotu CSS vlastnoti `border` rovnou `none`.

## inherit

První hodnota, kterou si vysvětlíme je `inherit`. Z jejího názvu vyplívá, že pokud jí specifikuje pro CSS vlastnost, přebere si hodnotu z parent elementu. Pro dědičné vlastnosti tedy nastaví jejich povůdní chování. Praktické využití najde například při resetování hodnoty v media query. Pro nedědičné vlastnosti lze tuto hodnotu taky nastavit, ale v praxi jsem se zatím nesetkal se situací, kde by to bylo vhodné k použití.

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

Pokud nepotřebujete použit dědičnost, použijete hodnotu `initial`. Ta dané CSS vlastnosti nastaví výchozí hodnotu danou ve specifikaci. Tím se element s touto vlasností stává nezávislý na parent elementu a jeho hodnotě stejné CSS vlastnosti.

```css
div {
  color: green;
}

div > p {
  color: initial;
}
```

## unset

Kombinací dvou výše zmíněných hodnot je `unset`. Po nastavení CSS vlastnosti, se `unset` chová závisle na tom, zda je daná CSS vlastnost dědičná či ne. Pokud CSS vlastnost dědičná je (např. `color`), CSS vlastnost se bude chovat jako s hodnotou `inherit`, tj. budě dědit hodnotu z parent elementu. Pokud CSS vlastnost dědičná není (např. `boder`), CSS vlastnost se bude chovat jako s hodnotou `initial`. Je to tedy kombinace `intial` a `inherit`, která nemění své dědičné chování pro danou CSS vlastnost.

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

Revert je v celku nová hodnota aktuálně (18-05-2020) podporovaná pouze ve Firefoxu a Safari. Chová se velice podobně jako `unset`. Rozdíl je ten, že `revert` oproti `unset` může odkazovat maximálně k user agent stylesheetu. To znamená, že se jako `initial` hodnota nebere hodnota určená ve specifikaci. To je rozdíl například u vlastnosti `display` pro paragraf. Její hodnota ve speficikaci je `inline`, kdežto výchozí hodnota prohlížeče pro paragraf je `block`.

```css
p {
  display: unset; /* -> inline */
  display: revert; /* -> block */
}
```

## all

Vysvětlili jsme si všechny hodnoty, kterými lze resetovat aktuální hodnotu. K těmto hodnotám přísluší i jedna CSS vlastnost, a to `all`. Tato vlastnost nastaví `initial/inherit/unset/revert` všem CSS vlastnostem daného elementu. Není nutné tedy vypisovat všechny vlastnosti.

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
