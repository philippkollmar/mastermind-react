import { FITS, PARTIALLY, NOT_AT_ALL } from "mastermind/src/hint";
import * as game from 'mastermind/src/game'
import * as defaultLogic from 'mastermind/src/mastermind';
import { cloneDeep } from 'lodash';
import * as colors from 'mastermind/src/colors';
import { useState } from "react";
const { RED, BLUE, YELLOW, GREEN } = colors;

let currentRound = -1

export function initialModel(logic = defaultLogic) {
    const randomFn = () => Math.random();
    const randomCode = logic.generateCode(randomFn);
    return {
        //Spielercode
        assumedColors: [RED, RED, RED, RED],
        //Rundenanzahl
        rounds: [],
        //Vorgegebener Code
        code: randomCode,
        gamestate: []
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
            const newColorIndex = (colorIndex < colorList.length - 1) ? colorIndex + 1 : 0;
            newModel.assumedColors[index] = colorList[newColorIndex];
            setModel(newModel);
        },
        check: () => {
            const newModel = cloneDeep(model)
            newModel.rounds.push({
                round: currentRound++,
                assumedColors: model.assumedColors,
                result: logic.checkCode(newModel.code, newModel.assumedColors, checkRandom),
            })
            newModel.gamestate = logic.checkGame(newModel.rounds[currentRound].result, currentRound)
            setModel(newModel)
        },
        reset: () => {
            const randomFn = () => Math.random();
            const randomCode = logic.generateCode(randomFn);
            const emptyModel = {
                //Spielercode
                assumedColors: [RED, RED, RED, RED],
                //Rundenanzahl
                rounds: [],
                //Vorgegebener Code
                code: randomCode,
                gamestate: []
            }
            currentRound = -1;
            setModel(emptyModel)
        }
    }
}