import { generateCode } from 'mastermind/src/mastermind';
import { initialModel, createModel, randomFn } from "./model"
import { RED, BLUE, GREEN, YELLOW, PURPLE, ORANGE, PINK, BROWN } from "mastermind/src/colors";
import * as colors from "mastermind/src/colors";
import { FITS, PARTIALLY, NOT_AT_ALL } from "mastermind/src/hint";
import { WON, PENDING, LOSE } from "mastermind/src/game";
describe('Model', () => {

    describe('initialModel', () => {
        it('should have assumedColors', () => {
            expect(initialModel()).toEqual(expect.objectContaining({ assumedColors: [RED, RED, RED, RED] }))
        })
        it('should have rounds', () => {
            expect(initialModel()).toEqual(expect.objectContaining({ rounds: [] }))
        })
        it('should have code with 4 colors', () => {
            const logic = { generateCode: jest.fn(() => [RED, GREEN, BLUE, YELLOW]) }
            expect(initialModel(logic)).toEqual(expect.objectContaining({ code: [RED, GREEN, BLUE, YELLOW] }))
        })
    })
})

describe('createModel', () => {
    let setModelSpy, logicSpy;
    function init(model, result) {
        setModelSpy = jest.fn()
        logicSpy = jest.createMockFromModule('mastermind/src/mastermind');
        logicSpy.checkCode.mockReturnValueOnce(result)
        return createModel(model, setModelSpy, logicSpy)
    }

    describe('getAssumedColor', () => {
        it('should extract color by index', () => {
            const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, RED] })
            expect(getAssumedColor(0)).toEqual(RED)
        })
        it('should extract color by index', () => {
            const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, RED] })
            expect(getAssumedColor(1)).toEqual(BLUE)
        })
        it('should extract color by index', () => {
            const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, RED] })
            expect(getAssumedColor(2)).toEqual(GREEN)
        })
        it('should extract color by index', () => {
            const { getAssumedColor } = init({ assumedColors: [RED, BLUE, GREEN, YELLOW] })
            expect(getAssumedColor(3)).toEqual(YELLOW)
        })
    })
    describe('changeColor', () => {
        const defaultModel = { assumedColors: [RED, RED, RED, RED] };

        [
            { index: 0, resultModel: { assumedColors: [GREEN, RED, RED, RED] } },
            { index: 1, resultModel: { assumedColors: [RED, GREEN, RED, RED] } },
            { index: 2, resultModel: { assumedColors: [RED, RED, GREEN, RED] } },
            { index: 3, resultModel: { assumedColors: [RED, RED, RED, GREEN] } }
        ].forEach(({ index, resultModel }) => {

            it('should change color of index ' + index, () => {
                const { changeColor } = init(defaultModel);
                changeColor(index)
                expect(setModelSpy).toHaveBeenCalledWith(resultModel)
            })
        });

        [
            { startingColor: { assumedColors: [RED, RED, RED, RED] }, resultModel: { assumedColors: [GREEN, RED, RED, RED] } },
            { startingColor: { assumedColors: [GREEN, RED, RED, RED] }, resultModel: { assumedColors: [YELLOW, RED, RED, RED] } },
            { startingColor: { assumedColors: [YELLOW, RED, RED, RED] }, resultModel: { assumedColors: [BLUE, RED, RED, RED] } },
            { startingColor: { assumedColors: [BLUE, RED, RED, RED] }, resultModel: { assumedColors: [PURPLE, RED, RED, RED] } },
            { startingColor: { assumedColors: [PURPLE, RED, RED, RED] }, resultModel: { assumedColors: [ORANGE, RED, RED, RED] } },
            { startingColor: { assumedColors: [ORANGE, RED, RED, RED] }, resultModel: { assumedColors: [PINK, RED, RED, RED] } },
            { startingColor: { assumedColors: [PINK, RED, RED, RED] }, resultModel: { assumedColors: [BROWN, RED, RED, RED] } },
           
        ].forEach(({ startingColor, resultModel }) => {

            it(`should change to the next color of colors`, () => {
                const { changeColor } = init(startingColor);
                changeColor(0)
                expect(setModelSpy).toHaveBeenCalledWith(expect.objectContaining(resultModel))
            })
        })

    })

    describe('check', () => {
        const expectedResult = [FITS, FITS, NOT_AT_ALL, PARTIALLY];
        beforeEach(() => {
            const { check } = init(initialModel(), expectedResult)
            check()
        })
        it("should call setModel", () => {
            expect(setModelSpy).toHaveBeenCalled()
        })
        describe('round', () => {
            it("should contain a round number", () => {
                expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ round: 2 }))
            })
            it("should contain a copy of assumedColors", () => {
                expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ assumedColors: [RED, RED, RED, RED] }))
            })
            it("should contain a rating", () => {
                expect(setModelSpy.mock.calls[0][0].rounds[0]).toEqual(expect.objectContaining({ result: expectedResult }))
            })
            it("should call checkCode with code, guess and randomFn ", () => {
                const { check } = init({
                    assumedColors: [RED, RED, RED, RED],
                    rounds: [],
                    code: [RED, BLUE, YELLOW, GREEN],
                })
                check()
                expect(logicSpy.checkCode).toHaveBeenCalledWith([RED, BLUE, YELLOW, GREEN], [RED, RED, RED, RED], expect.any(Function))
            })
            it("should call checkCode with code, guess and randomFn ", () => {
                const { check } = init({
                    assumedColors: [RED, RED, RED, RED],
                    rounds: [{round: 1, assumedColors: [RED, RED, RED, RED], result: [NOT_AT_ALL, NOT_AT_ALL, NOT_AT_ALL, NOT_AT_ALL] }],
                    code: [RED, BLUE, YELLOW, GREEN],
                })
                check()
                expect(setModelSpy.mock.calls[0][0].rounds.length).toEqual(2)
            }) 
        })
        describe('gamestate', () => {
            it("should", () => {
                const { gamestate } = init({
                    assumedColors: [RED, RED, RED, RED],
                    rounds: [{round: 1, assumedColors: [RED, RED, RED, RED], result: [NOT_AT_ALL, NOT_AT_ALL, NOT_AT_ALL, NOT_AT_ALL] }],
                    code: [RED, BLUE, YELLOW, GREEN],
                    gamestate: PENDING
                }) 

            })
        })
    })
})
