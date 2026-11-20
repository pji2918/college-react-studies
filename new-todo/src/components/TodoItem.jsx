import { useContext, memo } from "react";
import { TodoDispatchContext } from "../contexts/context";

function TodoItem({ id, content }) {
    const { deleteTodo } = useContext(TodoDispatchContext);
    const onDelete = () => deleteTodo(id);

    return (
        <div>
            {content} &nbsp;
            <button onClick={onDelete}>삭제</button>
        </div>
    );
}

export default memo(TodoItem, (prev, next) => prev.id === next.id);
