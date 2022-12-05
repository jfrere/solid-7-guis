import { Accessor, Component, createSignal, lazy } from "solid-js";

export type Path = "HOME" | "COUNTER" | "TEMPERATURE" | "FLIGHTS";

export type Route = { path: string; name: string; component: Component };

export const ROUTES: Route[] = [
  {
    path: "/counter",
    name: "Counter",
    component: lazy(async () => ({
      default: (await import("./guis/Counter")).Counter,
    })),
  },
  {
    path: "/temperature",
    name: "Temperature",
    component: lazy(async () => ({
      default: (await import("./guis/TemperatureConverter"))
        .TemperatureConverter,
    })),
  },
  {
    path: "/flights",
    name: "Flights",
    component: lazy(async () => ({
      default: (await import("./guis/FlightBooker")).FlightBooker,
    })),
  },
  {
    path: "/timer",
    name: "Timer",
    component: lazy(async () => ({
      default: (await import("./guis/Timer")).Timer,
    })),
  },
  {
    path: "/crud",
    name: "CRUD",
    component: lazy(async () => ({
      default: (await import("./guis/Crud")).Crud,
    })),
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
