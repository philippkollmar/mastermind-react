import { FITS, PARTIALLY, NOT_AT_ALL } from "mastermind/src/hint";
import * as defaultLogic from 'mastermind/src/mastermind';
import { cloneDeep } from 'lodash';
import * as colors from 'mastermind/src/colors';
const { RED, BLUE, YELLOW, GREEN } = colors;

export function initialModel(logic = defaultLogic) {
    const randomFn = () => Math.random();
    const randomCode = logic.generateCode(randomFn);
    return {
        //Spielercode
        assumedColors: [RED, RED, RED, RED],
        //Rundenanzahl
        rounds: [],
        //Vorgegebener Code
        code: randomCode
}
}

export const checkRandom = () => {
   return Math.floor(Math.random() * Math.floor(3));
}

export function createModel(model, setModel, logic = defaultLogic) {
    return {
        getAssumedColor: (index) => model.assumedColors[index],
        changeColor: (index) => {
            const newModel = cloneDeep(model)
            let colorList = Object.keys(colors)
            colorList = colorList.slice(0, colorList.length)
            const colorIndex = colorList.findIndex((c) => { return model.assumedColors[index] === c })
            const newColorIndex = (colorIndex < colorList.length-1) ? colorIndex + 1 : 0;
            newModel.assumedColors[index] = colorList[newColorIndex];
            setModel(newModel);
        },
        check: () => {
            const newModel = cloneDeep(model)
            newModel.rounds.push({
                round: 1,
                assumedColors: model.assumedColors,
                result: logic.checkCode(newModel.code,newModel.assumedColors, checkRandom)
            })
            setModel(newModel)
        }
    }
}