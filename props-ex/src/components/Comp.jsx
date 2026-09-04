export default function Comp({ onClick }) {
    const handleLeftClick = () => {
        onClick("LEFT");
    };
    const handleRightClick = () => {
        onClick("RIGHT");
    };

    return (
        <div>
            <button onClick={handleLeftClick}>LEFT</button>
            <button onClick={handleRightClick}>RIGHT</button>
        </div>
    );
}

const MIN = 0;
const MAX = 100;
const add = (num1, num2) => num1 + num2;

export { MIN, MAX, add };
