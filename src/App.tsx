import { Component, For, Show } from "solid-js";

import { ROUTES, useLocation } from "./routing";

import styles from "./App.module.css";

const App: Component = () => {
  const [location, setLocation] = useLocation();

  return (
    <div class={styles.App}>
      <header
        class={styles.header}
        classList={{ [styles.fullscreen]: location() === "/" }}
      >
        <p>7GUIs</p>
        <nav>
          <Show when={location() !== "/"}>
            <a
              class={styles.navlink}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                return setLocation("/");
              }}
            >
              Home
            </a>
          </Show>
          <For each={ROUTES}>
            {(route) => (
              <a
                class={styles.navlink}
                href={route.path}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation(route.path);
                }}
              >
                {route.name}
              </a>
            )}
          </For>
        </nav>
      </header>
      <main class={styles.content}>
        <For each={ROUTES}>
          {(route) => (
            <Show when={location() === route.path}>
              <route.component />
            </Show>
          )}
        </For>
      </main>
    </div>
  );
};

export default App;
