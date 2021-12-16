import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Script from 'next/script'
import css from "../styles/wedding.module.scss";

export default function Wedding() {
  return (
    <>
      <Script src="https://api.mapy.cz/loader.js"></Script>
      <Head>
        <script>Loader.load()</script>
      </Head>
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.name}>
            <div>VICTORIA</div>
            <div>MATSAKYANOVÁ</div>
          </div>
          <div className={css.ampersand}>&</div>
          <div className={css.name}>
            <div>MICHAL</div>
            <div>HONC</div>
          </div>
          <div className={css.date}>
            21. <b>ZÁŘÍ</b> 2021
          </div>
          <div className={css.place}>
            <div>VE 12 HODIN</div>
            <div>DĚDKŮV MLÝN, UNHOŠŤ U PRAHY</div>
          </div>

          <div className={css.image}>
            <Image alt="Place" width="650" height="430" src="/place.png" />
          </div>

          <div className={css.info}>
            <h2>OBŘAD:</h2>
            <div>
              Obřad se koná ve 12.00, prosíme tedy, abyste se dostavili na místo
              zhruba v čase 11.00-11.15, aby vše proběhlo bez zbytečného stresu.
            </div>
            <div>
              Na obřadu bude přítomna fotografka, nechte tedy prosím své
              telefony ztlumené a schované. Byli bychom později velmi neradi,
              pokud bychom na fotkách viděli místo vašich dojatých tváří vaše
              telefony.
            </div>
          </div>

          <iframe
            className={css.map}
            src="https://en.frame.mapy.cz/s/cehecodosu"
            frameBorder="0"
          ></iframe>

          <div className={css.info}>
            <h2>Harmonogram:</h2>
            <ul>
              <li>11:00 - Příjezd</li>
              <li>12:00 - Obřad</li>
              <li>14:00 - Oběd</li>
              <li>16:00 - Krájení dortu</li>
              <li>18:15 - Grilování</li>
              <li>18:45 - Hod kyticí</li>
            </ul>
          </div>

          <div className={css.info}>
            <h2>Svatební dary:</h2>
            Štěstí se za peníze koupit nedá, ale cihly na dům nebo nová pračka
            ano. A tak si určitě nelamte hlavu s věcnými dary, nejvíce nás kromě
            Vaší přítomnosti potěší některá z{" "}
            <a
              href="https://cs.wikipedia.org/wiki/Koruna_%C4%8Desk%C3%A1#Bankovky"
              className={css.link}
              target="_blank"
              rel="noreferrer"
            >
              významných osobností z české historie
            </a>
            .
          </div>

          <div className={css.info}>
            <h2>OUTFIT: Smart casual.</h2>
            Jinými slovy:
            <div>
              <b>Pro pány</b> - kravaty, motýlci, kšandy, košile se vzorem,
              kostkované kalhoty, se sakem, bez saka, nebo samozřejmě větší
              klasika. Vše je dovoleno!
            </div>
            <div>
              <b>Pro dámy</b> - zde je výběr snad ještě volnější co se střihů a
              doplňků týče, řiďte se však prosím obecným pravidlem - decentně,
              černá nevadí, bílá nikoli.
            </div>
            <hr />
            Ohledně obuvi, vzhledem k místy přírodnější povaze terénu
            doporučujeme na přezutí plochou obuv či obuv na bytelnějším
            podpatku. Na jehly se dostane po obřadu 🙂
          </div>

          <div className={css.info}>
            <h2>DOPRAVA:</h2>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d81986.02289987527!2d14.196926700113915!3d50.04764707711954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x470bba0c51e8b671%3A0x33c3b1a70cc9b4ee!2zRMSbZGvFr3YgbWzDvW4sIDI3MyA1MSBVbmhvxaHFpQ!3m2!1d50.0509372!2d14.100142!5e0!3m2!1sen!2scz!4v1631082521816!5m2!1sen!2scz"
                width="600"
                height="450"
                className={css.map}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div>
                <br />
                Nebo radši{" "}
                <a href="https://ul.waze.com/ul?place=ChIJcbboUQy6C0cR7rTJDKexwzM&ll=50.05093720%2C14.10014200&navigate=yes&utm_campaign=waze_website&utm_source=waze_website&utm_medium=lm_share_location">
                  Waze?
                </a>
              </div>
            </div>
            <br />
            <div className={css.info}>
              <h3>Parkování:</h3>
              <p>
                1. Parkování pod Dědkovým mlýnem u altánu pro 10-12 míst. Do
                areálu se dá vejít i z tohoto místa, tj. není potřeba chodit
                zpět k hlavnímu vchodu.
              </p>
              <p>
                2. Parkovat lze před vstupem, ale prosíme nechte dvě místa volné
                pro zásobování a odvozy.
              </p>
              <p>
                3. Dále lze zaparkovat na place za autobusovou zastávkou (10
                metrů za odbočkou k Dědkovu mlýnu). Místo vlastní přímo Dědkův
                mlýn a kapacita je 15 míst.
              </p>
              <iframe
                className={css.map}
                src="https://en.frame.mapy.cz/s/musemehugu"
                frameBorder="0"
              ></iframe>
            </div>
            <br />
            <div>Odvoz domů zajištěn.</div>
            <br />
            <h4>MHD z Prahy:</h4>
            <div>
              Zastávka{" "}
              <a href="https://www.google.com/maps/place/Unho%C5%A1%C5%A5,D%C4%9Bdk%C5%AFv+ml%C3%BDn/@50.0520836,14.0971903,18z/data=!4m12!1m6!3m5!1s0x470bba0c1567bdf9:0xd653bb5d5d4d9273!2zRMSbZGvFr3YgbWzDvW4!8m2!3d50.0518369!4d14.0992761!3m4!1s0x470bba0bf6fd515d:0x71e04eb3ac2c0a66!8m2!3d50.05245!4d14.0975301">
                Unhošť, Dědkův mlýn
              </a>
            </div>
            <iframe
              className={css.mhd}
              src="https://www.seznam.cz/jizdnirady/detail/3/muni%3A3468%3A9hChxxXvtO-%3Epubt%3A15255516%3A9gEOhxXmYe/2021-09-21T10%3A00%3A00%3Aa"
              frameBorder="0"
            ></iframe>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
