import logo from './logo.svg';
import './App.css';
import Pin from './Pin/Pin'
import {RED, BLUE, YELLOW, GREEN} from "mastermind/src/colors"

function App() {

  return (
    <div>
      <Pin color={RED} change = {() => {alert("Hallo Ansbach")}}></Pin>
      <Pin color={BLUE}></Pin>
      <Pin color={YELLOW}></Pin>
      <Pin color={GREEN}></Pin>
    </div>

  );
}

export default App;
