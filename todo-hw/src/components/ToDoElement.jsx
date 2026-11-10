import { memo } from "react";

function ToDoElement({ id, title, completed, setComplete }) {
    console.log("Rendered ToDoElement.");
    return (
        <>
            {title}
            <input
                type="checkbox"
                value={completed}
                onChange={(e) => setComplete(id, e.target.value)}
            />
        </>
    );
}
export default memo(ToDoElement);
// export default ToDoElement;
