import './App.css';
import React, {useState} from "react";
// import CanvasSecond from "./CanvasSecond";
import Canvas from "./Canvas";

let newData = {
    SANCTION: {"color": "#EF6473"},
    INFO: {"color": "#8D6CAB"},
    PEP: {"color": "#1B89B7"},
    CLOSED: {"color": "#6b6b6b"},
    CRIME: {"color": "#69ae4d"},
    REACT: {"color": "#159999"},
    ANGULAR: {"color": "#444488"},
    NAREK: {"color": "#75920e"},
    SATENIK: {"color": "#b01989"},
    BOOK: {"color": "#e0bd5d"},
}

function App() {
    const [results, setResults] = useState([]);
    const [resultVal, setResultValue] = useState(0);
    Object.keys(newData).map((keyName) => {
        return results.push({keyName: keyName, count: 1, color: newData[keyName].color})
    })
    const selectOnchange = (e) => {
        setResults([])
        setResultValue(e.target.value);
    }
    return (
        <div className="App">
            <Canvas results={results} resultval={resultVal}/>
            {/*<CanvasSecond results = {results} resultval = {resultVal}/>*/}
            <select onChange={selectOnchange} name="count" id="selectCount">
                {Object.keys(newData).map((i, k) => {
                    return <option key={i} value={k + 1}>{k + 1}</option>
                })}
            </select>
        </div>
    );
}

export default App;
