import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => console.log(stats));
        return unsub;
    }, []);
    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Hello Electron</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count number is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
