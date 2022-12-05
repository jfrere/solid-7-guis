import { createEffect, createSignal } from "solid-js";

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

// Failure case:
// Fahrenheit = 22222(etc.)
// Because "celsius" is used as the driver?

function NumberInput(props: {
  id: string;
  value: number;
  onChange: (newValue: number) => void;
}) {
  const [localValue, setLocalValue] = createSignal(String(props.value));

  createEffect(() => {
    setLocalValue(String(props.value));
  });

  return (
    <input
      value={localValue()}
      onInput={(e) => {
        setLocalValue(e.currentTarget.value);
        const value = strictParseFloat(localValue());
        if (value === null || value === props.value) return;

        props.onChange(value);
      }}
    />
  );
}

export const TemperatureConverter = () => {
  const [celsius, setCelsius] = createSignal(0);

  return (
    <div>
      <div>
        <label>
          Celsius
          <NumberInput id="celsius" value={celsius()} onChange={setCelsius} />
        </label>
      </div>
      <div>
        <label>
          Fahrenheit
          <NumberInput
            id="fahrenheit"
            value={toFahrenheit(celsius())}
            onChange={(e) => setCelsius(toCelsius(e))}
          />
        </label>
      </div>
    </div>
  );
};
