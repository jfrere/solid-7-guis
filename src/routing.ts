import { Accessor, Component, createSignal } from "solid-js";
import { Counter } from "./guis/Counter";
import { Crud } from "./guis/Crud";
import { FlightBooker } from "./guis/FlightBooker";
import { TemperatureConverter } from "./guis/TemperatureConverter";
import { Timer } from "./guis/Timer";

export type Path = "HOME" | "COUNTER" | "TEMPERATURE" | "FLIGHTS";

export type Route = { path: string; name: string; component: Component };

export const ROUTES: Route[] = [
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
  {
    path: "/timer",
    name: "Timer",
    component: Timer,
  },
  {
    path: "/crud",
    name: "CRUD",
    component: Crud,
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
