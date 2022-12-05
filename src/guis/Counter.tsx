import { createSignal } from "solid-js";

export const Counter = () => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <span>{count()}</span>
      <button onClick={() => setCount(count() + 1)}>Count</button>
    </div>
  );
};
