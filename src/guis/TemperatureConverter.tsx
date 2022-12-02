import { Component, createSignal } from "solid-js";

function toCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}

function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

function strictParseFloat(input: string): number | null {
  if (/[^\d.eE-]/.test(input)) return null;

  const val = parseFloat(input);
  if (isNaN(val)) return null;

  return val;
}

export const TemperatureConverter: Component = () => {
  const [celsius, setCelsius] = createSignal(0);
  const [fahrenheit, setFahrenheit] = createSignal(toFahrenheit(celsius()));

  return (
    <div>
      <div>
        <label>
          Celsius
          <input
            value={celsius()}
            onInput={(e) =>
              setCelsius((prev) => {
                const parsed = strictParseFloat(e.currentTarget.value);
                if (parsed === null) return prev;

                setFahrenheit(toFahrenheit(parsed));
                return parsed;
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Fahrenheit
          <input
            value={fahrenheit()}
            onInput={(e) =>
              setFahrenheit((prev) => {
                const parsed = strictParseFloat(e.currentTarget.value);
                if (parsed === null) return prev;

                setCelsius(toCelsius(parsed));
                return parsed;
              })
            }
          />
        </label>
      </div>
    </div>
  );
};
