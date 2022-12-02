import { Component, createSignal } from "solid-js";

export const Counter: Component = () => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>Count</button>
    </div>
  );
};
