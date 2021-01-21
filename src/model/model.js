import {RED, BLUE, YELLOW, GREEN} from "mastermind/src/colors"

export function initialModel() {
    return {assumedColors: [RED, RED, RED, RED]}
}

export function createModel(model) {
    return {
        getAssumedColor: (index) => model.assumedColors[index],
        changeColor: () => {

            
        }
    }
}