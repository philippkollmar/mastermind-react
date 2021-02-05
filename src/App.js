import './App.css';
import Pin from './Pin/Pin'
import Hint from './Hint/Hint'
import End from './End/End'
import Round from './Round/Round'
import { useState } from 'react';
import { initialModel, createModel } from './model/model';
import { round } from 'lodash';

function App() {
  const [model, setModel] = useState(initialModel())
  const { getAssumedColor, changeColor, check, reset } = createModel(model, setModel)
  return (
    <div className = "container">
      <h1>MASTERMIND</h1>
      <div className= "UserColor">
        <Pin color={getAssumedColor(0)} change={() => changeColor(0)}></Pin>
        <Pin color={getAssumedColor(1)} change={() => changeColor(1)}></Pin>
        <Pin color={getAssumedColor(2)} change={() => changeColor(2)}></Pin>
        <Pin color={getAssumedColor(3)} change={() => changeColor(3)}></Pin>
        <button className="CheckButton" onClick={check}>Check</button>
      </div>
      { model.rounds.map((round) => {
        let userRound;
        if (model.gamestate === "PENDING") {
          return (<div className="rounds">
            <Pin color={round.assumedColors[0]} change={() => { }}></Pin>
            <Pin color={round.assumedColors[1]} change={() => { }}></Pin>
            <Pin color={round.assumedColors[2]} change={() => { }}></Pin>
            <Pin color={round.assumedColors[3]} change={() => { }}></Pin>
            <Hint color={round.result[0]}></Hint>
            <Hint color={round.result[1]}></Hint>
            <Hint color={round.result[2]}></Hint>
            <Hint color={round.result[3]}></Hint>
            <p className= "RoundNumber">{userRound = round.round + 2 }</p>
          </div>)
        } else {
        }
      })}
      <End result={model.gamestate} reset= {reset}></End>
    </div>

  );
}

export default App;
