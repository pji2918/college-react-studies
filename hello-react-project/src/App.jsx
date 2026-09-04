import "./App.css";

function Hello() {
    const now = new Date().getTime();
    const title = [<h1>Hello</h1>, <h1>World</h1>];

    return (
        <div>
            {title}
            <h3>
                {now} - {now % 2 == 0 ? "짝수" : "홀수"}
            </h3>
            <hr />
        </div>
    );
}

function App() {
    return (
        <>
            <Hello />
            <Hello />
        </>
    );
}

export default App;
