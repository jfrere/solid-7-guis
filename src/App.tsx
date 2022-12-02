import { Component, Show } from "solid-js";

import { parseLocation } from "./routing";
import { Counter } from "./guis/Counter";
import { TemperatureConverter } from "./guis/TemperatureConverter";

import styles from "./App.module.css";

const App: Component = () => {
  const page = parseLocation(window.location.pathname);
  return (
    <div class={styles.App}>
      <header
        class={styles.header}
        classList={{ [styles.fullscreen]: page === "HOME" }}
      >
        <p>7GUIs</p>
        <nav>
          <Show when={page !== "HOME"}>
            <a class={styles.navlink} href="/">
              Home
            </a>
          </Show>
          <a class={styles.navlink} href="/counter">
            Counter
          </a>
          <a class={styles.navlink} href="/temperature">
            Temperature
          </a>
        </nav>
      </header>
      <main class={styles.content}>
        <Show when={page === "COUNTER"}>
          <Counter />
        </Show>
        <Show when={page === "TEMPERATURE"}>
          <TemperatureConverter />
        </Show>
      </main>
    </div>
  );
};

export default App;
