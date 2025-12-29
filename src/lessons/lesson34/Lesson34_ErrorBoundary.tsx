import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FilterGroup from "../../components/FilterGroup";
import TodoItem from "../../components/TodoItem";
import type { Filter } from "../../components/FilterGroup";
import type { Todo } from "../../components/TodoItem";
import { useTheme } from "../../components/theme-context";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../../components/Modal";


export default function Lesson34_ErrorBoundary() {
    console.log("Component render");

    const [seconds] = useState(0);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");
    const [loading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const uncontrolledInputRef = useRef<HTMLInputElement>(null);
    const doneCount = todos.filter(t => t.done).length;
    const prevToggleRef = useRef<((id: number) => void) | null>(null);
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(true);
    

    useEffect(() => {
        searchInputRef.current?.focus();

        if (!query) return;

        const controller = new AbortController();

        fetch(`http://localhost:3000/api/todos?q=${query}`)
            .then(res => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then(data => setTodos(data))
            .catch(err => {
                if (err.name === "AbortError") return;
                setError(err.message);
            });

        return () => controller.abort();
    }, [query]);

    const visibleTodos = useMemo(() => {
        console.log("Filter todos calculation");

        if (filter === "all") return todos;
        if (filter === "active") return todos.filter(t => !t.done);
        return todos.filter(t => t.done);
    }, [todos, filter]);
    const toggleTodo = useCallback((id: number) => {
        setTodos(prev =>
            prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }, []);

    useEffect(() => {
        if (prevToggleRef.current === toggleTodo) {
            console.log("toggleTodo reference khong doi ");
        } else {
            console.log("toggleTodo reference thay doi ");

        }
        prevToggleRef.current = toggleTodo;
    });

    const deleteTodo = useCallback((id: number) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    }, []);


    if (loading) return <p>Loading data...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setTodos([...todos, { id: Date.now(), text, done: false }]);
        setText("");
    };


    const addTodoUncontrolled = (e: React.FormEvent) => {
        e.preventDefault();

        const value = uncontrolledInputRef.current?.value;
        if (!value || !value.trim()) return;

        setTodos([...todos, { id: Date.now(), text: value, done: false }]);


        uncontrolledInputRef.current!.value = "";
    };



    return (
        <div
            style={{
                padding: 20,
                maxWidth: 420,
                background: theme === "light" ? "#ffffff" : "#1e1e1e",
                color: theme === "light" ? "#000000" : "#ffffff",
                transition: "all 0.2s ease",
            }}
        >
            <h2>Lesson 34-ErrorBoundary</h2>
            <Button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"}
            </Button>

            <p>Current theme: <b>{theme}</b></p>

            <input
                ref={searchInputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search todo..."
            />
            <button onClick={() => searchInputRef.current?.focus()}>
                Focus input
            </button>

            <Card>
                <h4>Uncontrolled Input</h4>
                <form onSubmit={addTodoUncontrolled}>
                    <input
                        ref={uncontrolledInputRef}
                        placeholder="Enter todo "
                    />
                    <Button>Add (Uncontrolled)</Button>
                </form>
            </Card>


            <Card>
                <h4>Controlled Input</h4>
                <form onSubmit={addTodo}>
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Enter todo "
                    />
                    <Button>Add</Button>
                </form>

                <p>Seconds: {seconds}</p>
                <p>Preview: {text}</p>
            </Card>

            <Card><FilterGroup filter={filter} onChange={setFilter} /></Card>

            <Button onClick={() => setOpen(true)}>Open Modal</Button>
            {open && (
                <Modal>
                    <ModalHeader>Xác nhận hành động</ModalHeader>

                    <ModalBody>
                        Bạn có chắc muốn xoá toàn bộ todo không?
                    </ModalBody>
                
                    <ModalFooter>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            setTodos([]);
                            setOpen(false);
                        }}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
            )}

            <Card>
                <ul>
                    {visibleTodos.map(t => (
                        <TodoItem

                            key={t.id}
                            todo={t}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))}
                </ul>
                <p>
                    Done {doneCount} / {todos.length}
                </p>
            </Card>
        </div>
    );
}
