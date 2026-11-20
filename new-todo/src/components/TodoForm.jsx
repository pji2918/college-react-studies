import { useRef, useCallback, useContext } from "react";
import { TodoDispatchContext } from "../contexts/context";
import { memo } from "react";

function TodoForm() {
    const text = useRef("");
    const { addTodo } = useContext(TodoDispatchContext);
    const onAdd = useCallback(
        (text, id) => {
            const content = text.trim();
            if (!content) return;

            const newTodo = {
                id,
                content,
            };
            addTodo(newTodo);
        },
        [addTodo],
    );
    return (
        <>
            <input
                type="text"
                onChange={(e) => (text.current = e.target.value)}
            />

            <button onClick={() => onAdd(text.current, crypto.randomUUID())}>
                ADD
            </button>
        </>
    );
}
export default memo(TodoForm);
