import * as hints from "mastermind/src/hint"
import * as game from "mastermind/src/game"

export default function End({ result, reset }) {

    const classes = ["End"].concat(["End--" + result])

    let game;

    if (result === "WON") {
        return (<div className={classes.join(" ")} >
            <div className= "WON"> YOU WON! </div>
            <button className="NewGame" onClick={ reset }>New Game</button>
        </div>)
    } else if (result === "LOST") {
        return (<div className={classes.join(" ")} >
        <div className= "LOST"> Sorry, but you guessed wrong. Please try it again </div>
        <button className="NewGame" onClick={ reset }>New Game</button>
    </div>)
    }
    return null
}