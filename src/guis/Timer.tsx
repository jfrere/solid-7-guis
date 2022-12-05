import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";

import styles from "./Timer.module.css";

function createTimer(max: Accessor<number>): [Accessor<number>, () => void] {
  const [timer, setTimer] = createSignal(0);

  let zeroPoint = Date.now();

  createEffect(() => {
    const handle = setInterval(() => {
      const timer = Date.now() - zeroPoint;
      if (timer >= max()) {
        setTimer(max());
        zeroPoint = Date.now() - max();
      } else {
        setTimer(timer);
      }
    }, 100);

    onCleanup(() => clearInterval(handle));
  });

  return [timer, () => (zeroPoint = Date.now())];
}

export const Timer: Component = () => {
  const [max, setMax] = createSignal(10000);
  const [timer, reset] = createTimer(max);

  return (
    <div class={styles.gui}>
      <progress value={timer()} max={max()} />
      {Math.floor(timer() / 1000)} / {Math.floor(max() / 1000)}
      <input
        type="range"
        min={1000}
        max={60000}
        value={max()}
        onInput={(e) => setMax(parseInt(e.currentTarget.value))}
      />
      <button onClick={reset}>Reset</button>
    </div>
  );
};
