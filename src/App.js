import logo from './logo.svg';
import './App.css';
import Pin from './Pin/Pin'
import {RED, BLUE, YELLOW, GREEN} from "mastermind/src/colors"
import { useState } from 'react';
import { initialModel, createModel } from './model/model';

function App() {
  const [model,setModel] = useState(initialModel())
  const {getAssumedColor} = createModel(model)
  return (
    <div>
      <Pin color={getAssumedColor(0)} change = {() => {setModel({assumedColors: [RED, GREEN, BLUE, YELLOW]})}}></Pin>
      <Pin color={getAssumedColor(1)} change = {() => {alert(model)}}></Pin>
      <Pin color={getAssumedColor(2)} ></Pin>
      <Pin color={getAssumedColor(3)}></Pin>
    </div>

  );
}

export default App;
