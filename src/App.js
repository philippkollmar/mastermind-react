import logo from './logo.svg';
import './App.css';
import Pin from './Pin/Pin'
import Hint from './Hint/Hint'
import Round from './Round/Round'
import { RED, BLUE, YELLOW, GREEN } from "mastermind/src/colors"
import { useState } from 'react';
import { initialModel, createModel } from './model/model';

function App() {
  const [model, setModel] = useState(initialModel())
  const { getAssumedColor, changeColor, check } = createModel(model, setModel)
  return (
    <div>
      <div>
        <Pin color={getAssumedColor(0)} change={() => changeColor(0)}></Pin>
        <Pin color={getAssumedColor(1)} change={() => changeColor(1) }></Pin>
        <Pin color={getAssumedColor(2)} change={() => changeColor(2) }></Pin>
        <Pin color={getAssumedColor(3)} change={() => changeColor(3)}></Pin>
        <button onClick={check} >Check</button>
      </div>
      { model.rounds.map((round) => {
        console.log(model)
        return (<div className="rounds">
          <Pin color={round.assumedColors[0]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[1]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[2]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[3]} change={() => { }}></Pin>
          <Hint color={round.result[0]} change={() => { }}></Hint>
          <Hint color={round.result[1]} change={() => { }}></Hint>
          <Hint color={round.result[2]} change={() => { }}></Hint>
          <Hint color={round.result[3]} change={() => { }}></Hint>
        </div>)
      })}
    </div>

  );
}

export default App;
