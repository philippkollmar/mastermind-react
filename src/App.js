import logo from './logo.svg';
import './App.css';
import Pin from './Pin/Pin'
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
        <Pin color={getAssumedColor(1)} change={() => { changeColor(1) }}></Pin>
        <Pin color={getAssumedColor(2)} change={() => { changeColor(2) }}></Pin>
        <Pin color={getAssumedColor(3)} change={() => { changeColor(3) }}></Pin>
        <button onClick={check} >Check</button>
      </div>
      {console.log(model)}
      { model.rounds.map((round) => {
        return (<div>
          <Pin color={round.assumedColors[0]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[1]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[2]} change={() => { }}></Pin>
          <Pin color={round.assumedColors[3]} change={() => { }}></Pin>
        </div>)
      })}
    </div>

  );
}

export default App;
