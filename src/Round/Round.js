import PropTypes from "prop-types"
import * as colors from "mastermind/src/colors"

export default function Round({color, change}){
    const col = color.toLowerCase();
    const classes = ["Round"].concat(["Round--" + col])

    return(<button className={classes.join(" ")} >MASTER</button>)
}
Round.propTypes = {
    color: PropTypes.oneOf(Object.keys(colors)),
    change: PropTypes.instanceOf(Function)
}