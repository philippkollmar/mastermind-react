import PropTypes from "prop-types"
import * as colors from "mastermind/src/colors"

export default function Pin({color, change}){
    const col = color.toLowerCase();
    const classes = ["Pin"].concat(["Pin--" + col])

    return(<button className={classes.join(" ")} onClick={change}>MASTER</button>)
}
Pin.propTypes = {
    color: PropTypes.oneOf(Object.keys(colors)),
    change: PropTypes.instanceOf(Function)
}