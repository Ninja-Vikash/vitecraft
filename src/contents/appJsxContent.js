export function appJsxContent(projectName, ext) {
    return `import { useState } from "react";
import "./App.css";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="App min-h-screen bg-zinc-950 flex items-center justify-center">
            <div>
                <div className="flex flex-col mb-2">
                    <img src="thunder.svg" alt="thunder" className="h-48" />
                    <h1 className="text-3xl -translate-y-4 tracking-wider text-zinc-50 font-light font-sans text-center">
                        Streamline your react development!
                    </h1>
                    <p className="text-xl text-zinc-600 text-center">with the flash</p>
                </div>
                <div className="card flex flex-col items-center justify-center">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="bg-zinc-50 px-4 py-2 rounded-xl font-semibold"
                    >
                        Count is {count}
                    </button>
                    <p className="text-zinc-300 mt-4">
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
`
}
