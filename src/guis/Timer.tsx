import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";

import styles from "./Timer.module.css";

function useTimer(max: Accessor<number>): [Accessor<number>, () => void] {
  const [timer, setTimer] = createSignal(0);
  const [zeroPoint, setZeroPoint] = createSignal(Date.now());

  createEffect(() => {
    const zero = zeroPoint();
    const handle = setInterval(() => {
      const timer = Date.now() - zero;
      if (timer >= max()) {
        setTimer(max());
        setZeroPoint(Date.now() - max());
      } else {
        setTimer(timer);
      }
    }, 100);

    onCleanup(() => clearInterval(handle));
  });

  return [timer, () => setZeroPoint(Date.now())];
}

export const Timer: Component = () => {
  const [max, setMax] = createSignal(10000);
  const [timer, reset] = useTimer(max);

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
