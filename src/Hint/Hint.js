import PropTypes from "prop-types"
import * as hints from "mastermind/src/hint"

export default function Hint({color}){
    const col = color.toLowerCase();
    const classes = ["Hint"].concat(["Hint--" + col])

    return(<button className={classes.join(" ")} >MASTER</button>)
}
Hint.propTypes = {
    color: PropTypes.oneOf(Object.keys(hints)),
}