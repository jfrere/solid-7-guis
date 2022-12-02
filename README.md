## Demo of 7 GUIs in SolidJS

## Notes

* useLocation -> is this advisable in SolidJS or is there another way of encapsulating this sort of behaviour?  This feels very React-esque
* TemperatureConverter:
    * Most of the logic here is in the JSX-code - how do I pull it out of there best?
    * Nested `setCelsius -> setFahrenheit` calls -> I don’t like it, but it works, and it does what I expect
* FlightBooker
    * Used useMemo to try and pull the JSX logic upwards — do I need to use useMemo?  Somewhere in the documentation it mentions that I can just use a function - the useMemo is only necessary if the calculation is slow and worth caching.
* Timer
    * Attempting to write a classic `useTimer` hook -> just be as React as possible 
    * I quite like the result, it feels very convenient and versatile, and my component is very empty of logic
    * Passing `Accessor<number>` instead of just `number` — I understand why I had to do this in this case, but is there a better way?
* Crud
    * Aim, if possible: find an equivalent of `useReducer` — is this `createStore`?
    * Not particularly happy with the abstractions used here
        * `editPerson` or `activeId` could live inside the `useCrud` object?
    * Using effects to “listen” to changes feels weirder here than it does in React somehow, not sure why!
