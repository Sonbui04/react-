import { useEffect, useState, useRef, useMemo, useReducer, } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FilterGroup from "../../components/FilterGroup";
import TodoItem from "../../components/TodoItem";
import type { Filter } from "../../components/FilterGroup";
import { useTheme } from "../../components/theme-context";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../../components/Modal";
import type { Todo } from "./type";



type TodoForm = {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
};

type TodoFormErrors = {
    title?: string;
    description?: string;
    priority?: string;
};

type TodoAction =
    | { type: "ADD"; payload: Todo }
    | { type: "TOGGLE"; payload: number }
    | { type: "DELETE"; payload: number }
    | { type: "CLEAR" }
    | {
        type: "UPDATE_PRIORITY";
        payload: { id: number; priority: "low" | "medium" | "high" };
    };


function todoReducer(state: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {
        case "ADD": {
  const meta = action.payload.meta ?? {
    priority: "medium" as const,
    createdAt: Date.now(),
  };

  return [...state, { ...action.payload, meta }];
}

        case "TOGGLE":
            return state.map(t =>
                t.id === action.payload ? { ...t, done: !t.done } : t
            );

        case "DELETE":
            return state.filter(t => t.id !== action.payload);

        case "CLEAR":
            return [];


        case "UPDATE_PRIORITY":
            return state.map(t =>
                t.id === action.payload.id
                    ? {
                        ...t,
                        meta: {
                            ...t.meta,
                            priority: action.payload.priority,
                        },
                    }
                    : t
            );

        default:
            return state;
    }
}

export default function Lesson38_NestedState() {
    console.log("Component render");

    const [todos, dispatch] = useReducer(todoReducer, []);
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const uncontrolledInputRef = useRef<HTMLInputElement>(null);
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const doneCount = todos.filter(t => t.done).length;


    const [form, setForm] = useState<TodoForm>({
        title: "",
        description: "",
        priority: "medium",
    });

    const [formErrors, setFormErrors] = useState<TodoFormErrors>({});

    useEffect(() => {
        searchInputRef.current?.focus();
        if (!query) return;

        fetch(`http://localhost:3000/api/todos?q=${query}`)
            .then(res => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then((data: Todo[]) => {
                data.forEach(t => dispatch({ type: "ADD", payload: t }));
            })
            .catch(err => setError(err.message));
    }, [query]);


    const visibleTodos = useMemo(() => {
        if (filter === "all") return todos;
        if (filter === "active") return todos.filter(t => !t.done);
        return todos.filter(t => t.done);
    }, [todos, filter]);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors: TodoFormErrors = {};

        if (!form.title.trim()) errors.title = "Title is required";
        if (form.description.trim().length < 5)
            errors.description = "Description must be at least 5 characters";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submitMultiFieldForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch({
            type: "ADD",
            payload: {
                id: Date.now(),
                text: `${form.title} - ${form.description}`,
                done: false,
                meta: {
                    priority: form.priority,
                    createdAt: Date.now(),
                },
            },
        });

        setForm({
            title: "",
            description: "",
            priority: "medium",
        });
        setFormErrors({});
    };


    const addTodoUncontrolled = (e: React.FormEvent) => {
        e.preventDefault();
        const value = uncontrolledInputRef.current?.value;
        if (!value?.trim()) return;

        dispatch({
            type: "ADD",
            payload: {
                id: Date.now(),
                text: value,
                done: false,
                meta: {
                    priority: "low",
                    createdAt: Date.now(),
                },
            },
        });

        uncontrolledInputRef.current!.value = "";
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


    return (
        <div
            style={{
                padding: 20,
                maxWidth: 420,
                background: theme === "light" ? "#fff" : "#1e1e1e",
                color: theme === "light" ? "#000" : "#fff",
                border: "1px solid red",
            }}
        >
            <h2>Lesson 38 – Nested State</h2>

            <Button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"}
            </Button>

            <input
                ref={searchInputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search todo..."
            />

            <Card>
                <form onSubmit={addTodoUncontrolled}>
                    <input ref={uncontrolledInputRef} placeholder="Uncontrolled todo" />
                    <Button>Add (Uncontrolled)</Button>
                </form>
            </Card>

            <Card>
                <h4>Multi-field Form</h4>
                <form onSubmit={submitMultiFieldForm}>
                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleFormChange}
                    />
                    {formErrors.title && (
                        <p style={{ color: "red" }}>{formErrors.title}</p>
                    )}

                    <input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleFormChange}
                    />
                    {formErrors.description && (
                        <p style={{ color: "red" }}>{formErrors.description}</p>
                    )}

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleFormChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <Button>Add Todo</Button>
                </form>
            </Card>

            <Card>
                <FilterGroup filter={filter} onChange={setFilter} />
                <ul>
                    {visibleTodos.map(t => (
                        <TodoItem
                            key={t.id}
                            todo={t}
                            onToggle={id => dispatch({ type: "TOGGLE", payload: id })}
                            onDelete={id => dispatch({ type: "DELETE", payload: id })}
                        >
                            <small>
                                Priority: <b>{t.meta.priority}</b>
                            </small>
                            <div>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "UPDATE_PRIORITY",
                                            payload: { id: t.id, priority: "high" },
                                        })
                                    }
                                >
                                    Set High
                                </button>
                            </div>
                        </TodoItem>
                    ))}
                </ul>

                <p>
                    Done {doneCount} / {todos.length}
                </p>
            </Card>

            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            {open && (
                <Modal>
                    <ModalHeader>Xác nhận</ModalHeader>
                    <ModalBody>Bạn có chắc muốn xoá toàn bộ todo?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                dispatch({ type: "CLEAR" });
                                setOpen(false);
                            }}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
}
