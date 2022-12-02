import { Accessor, Component, createSignal } from "solid-js";
import { Counter } from "./guis/Counter";
import { FlightBooker } from "./guis/FlightBooker";
import { TemperatureConverter } from "./guis/TemperatureConverter";

export type Path = "HOME" | "COUNTER" | "TEMPERATURE" | "FLIGHTS";

export type Route = { path: string; name: string; component: Component };

export const ROUTES = [
  {
    path: "/counter",
    name: "Counter",
    component: Counter,
  },
  {
    path: "/temperature",
    name: "Temperature",
    component: TemperatureConverter,
  },
  {
    path: "/flights",
    name: "Flights",
    component: FlightBooker,
  },
];

function parsePath(path: string): string {
  for (const route of ROUTES) {
    if (route.path === path) {
      return route.path;
    }
  }

  // default to home page if no location can be found
  return "/";
}

export function useLocation(): [Accessor<string>, (route: string) => void] {
  const [location, setLocation] = createSignal(
    parsePath(window.location.pathname)
  );

  window.addEventListener("popstate", () => {
    setLocation(window.location.pathname);
  });

  return [
    location,
    (route: string) => {
      const newRoute = parsePath(route);
      window.history.pushState(newRoute, "", newRoute);
      setLocation(newRoute);
    },
  ];
}
