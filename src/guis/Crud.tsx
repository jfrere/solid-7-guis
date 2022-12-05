import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
} from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./Crud.module.css";

type Person = { firstname: string; lastname: string };

type CrudStore<T> = {
  ids: string[];
  itemIndex: Partial<Record<string, T>>;
};
type Actions<T> = {
  create(item: T): void;
  delete(id: string): void;
  update(id: string, newItem: T): void;
};

function useCrud<T>(): [Accessor<Array<[string, T]>>, Actions<T>] {
  const [id, setId] = createSignal(0);
  const [state, setState] = createStore<CrudStore<T>>({
    ids: [],
    itemIndex: {},
  });

  return [
    () => state.ids.map((each) => [each, state.itemIndex[each]!]),
    {
      create(item: T) {
        const i = id();
        setId((i) => i + 1);
        setState((state) => ({
          ids: [...state.ids, String(i)],
          itemIndex: { ...state.itemIndex, [i]: item },
        }));
      },
      delete(id: string) {
        setState((state) => ({
          ids: state.ids.filter((eachId) => eachId !== id),
          itemIndex: Object.fromEntries(
            Object.entries(state.itemIndex).filter(([key, _]) => key !== id)
          ),
        }));
      },
      update(id: string, newItem: T) {
        setState("itemIndex", id, newItem);
      },
    },
  ];
}

function Select<T>(props: {
  class?: string;
  items: T[];
  onItemSelected?: (item: T) => void;
  renderItem: (item: T) => JSX.Element;
}) {
  const [selectedIndex, setSelectedIndex] = createSignal<null | number>(null);

  createEffect(() => {
    if (!props.onItemSelected) return;

    const idx = selectedIndex();
    if (idx == null) return null;

    props.onItemSelected(props.items[idx]);
  });

  return (
    <ol class={props.class}>
      <For each={props.items}>
        {(item, index) => (
          <li
            class={styles.selectItem}
            classList={{ [styles.selected]: selectedIndex() === index() }}
            onClick={() => setSelectedIndex(index())}
          >
            {props.renderItem(item)}
          </li>
        )}
      </For>
    </ol>
  );
}

export const Crud: Component = () => {
  const [people, actions] = useCrud<Person>();
  const [activeId, setActiveId] = createSignal<string | undefined>(undefined);
  const [filter, setFilter] = createSignal("");
  const [editPerson, setEditPerson] = createStore({
    firstname: "",
    lastname: "",
  });

  actions.create({ firstname: "Ted", lastname: "Heath" });
  actions.create({ firstname: "Arthur", lastname: "Scargill" });
  actions.create({ firstname: "Nye", lastname: "Bevan" });

  const filteredPeople = createMemo(() =>
    people().filter(([_, person]) =>
      `${person.firstname} ${person.lastname}`.startsWith(filter())
    )
  );

  createEffect(() => {
    const id = activeId();
    if (id === undefined) return;

    const person = people().find(([eachId, _]) => eachId === id);
    if (!person) return;
    setEditPerson(person[1]);
  });

  return (
    <div class={styles.guiLayout}>
      <label class={styles.filterInput}>
        Filter prefix:{" "}
        <input
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
        />
      </label>
      <Select<[string, Person]>
        class={styles.selectList}
        items={filteredPeople()}
        onItemSelected={([idx, _]) => setActiveId(idx)}
        renderItem={([_, person]) => (
          <span>
            {person.firstname} {person.lastname}
          </span>
        )}
      />
      <div class={styles.addPersonInput}>
        <label>
          Name:{" "}
          <input
            value={editPerson.firstname}
            onInput={(e) => setEditPerson("firstname", e.currentTarget.value)}
          />
        </label>
        <label>
          Surname:{" "}
          <input
            value={editPerson.lastname}
            onInput={(e) => setEditPerson("lastname", e.currentTarget.value)}
          />
        </label>
      </div>
      <div class={styles.actions}>
        <button onClick={() => actions.create({ ...editPerson })}>
          Create
        </button>
        <button
          disabled={activeId() === undefined}
          onClick={() => actions.update(activeId()!, { ...editPerson })}
        >
          Update
        </button>
        <button
          disabled={activeId() === undefined}
          onClick={() => actions.delete(activeId()!)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// TODO: Create Select<T> component, that display a list of T and enables the selection via the value and onChange prop.
