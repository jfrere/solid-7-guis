import { Component, createMemo, createSignal } from "solid-js";

import styles from "./FlightBooker.module.css";

function validateFlightType(
  flight: string
): asserts flight is "ONEWAY" | "RETURN" {
  if (flight !== "ONEWAY" && flight !== "RETURN") {
    throw new Error("PROGRAMMER ERROR: invalid option value selected");
  }
}

function strictParseInt(input: string): number | null {
  if (/[^\d]/.test(input)) return null;

  const val = parseInt(input, 10);
  if (isNaN(val)) return null;

  return val;
}

type FlightDate =
  | { valid: false; rawString: string }
  | { valid: true; rawString: string; parsedDate: Date };

function parseFlightDate(input: string): FlightDate {
  // incredibly naive date parsing to make this task easier
  const parts = input.split(".").map(strictParseInt);
  if (parts.length !== 3) return { valid: false, rawString: input };
  if (parts[0] === null || parts[1] === null || parts[2] === null)
    return { valid: false, rawString: input };

  return {
    valid: true,
    rawString: input,
    parsedDate: new Date(parts[2], parts[1], parts[0]),
  };
}

export const FlightBooker: Component = () => {
  const [flightType, setFlightType] = createSignal<"ONEWAY" | "RETURN">(
    "ONEWAY"
  );
  const [startDate, setStartDate] = createSignal(parseFlightDate("27.03.2014"));
  const [endDate, setEndDate] = createSignal(parseFlightDate("28.03.2014"));

  const validation = createMemo(() => {
    const start = startDate();
    const end = endDate();
    const flight = flightType();

    if (!start.valid)
      return { valid: false, message: "start date is not valid" };

    if (flight === "ONEWAY") return { valid: true };

    if (!end.valid) return { valid: false, message: "end date is not valid" };

    if (start.parsedDate > end.parsedDate) {
      return { valid: false, message: "end date is earlier than start date" };
    }

    return { valid: true };
  });

  return (
    <div class={styles.gui}>
      <select
        value={flightType()}
        onChange={(e) => {
          validateFlightType(e.currentTarget.value);
          return setFlightType(e.currentTarget.value);
        }}
      >
        <option value="ONEWAY">one-way flight</option>
        <option value="RETURN">return flight</option>
      </select>
      <label>
        Outbound:
        <input
          value={startDate().rawString}
          classList={{ [styles.errored]: !startDate().valid }}
          onInput={(e) => setStartDate(parseFlightDate(e.currentTarget.value))}
        />
      </label>
      <label>
        Inbound:
        <input
          value={endDate().rawString}
          classList={{
            [styles.errored]: flightType() === "RETURN" && !endDate().valid,
          }}
          disabled={flightType() === "ONEWAY"}
          onInput={(e) => setEndDate(parseFlightDate(e.currentTarget.value))}
        />
      </label>
      <span>{validation().message}</span>
      <button
        disabled={!validation().valid}
        onClick={() => console.log("booked", startDate(), endDate())}
      >
        Book
      </button>
    </div>
  );
};
