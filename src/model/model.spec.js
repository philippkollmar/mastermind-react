import { initialModel, createModel } from "./model"
import { RED, BLUE, GREEN, YELLOW, PURPLE, ORANGE, PINK, BROWN } from "mastermind/src/colors"

describe('Model', () => {

    describe('initialModel', () => {
        it('should have assumedColors', () => {
            expect(initialModel()).toEqual(expect.objectContaining({ assumedColors: [RED, RED, RED, RED] }))
        })
    })

    describe('createModel', () => {
        let spy 
        function init(model) {
            spy = jest.fn()
            return createModel(model, spy)
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
                { index: 0, resultModel: { assumedColors: [GREEN, RED, RED, RED] }},
                { index: 1, resultModel: { assumedColors: [RED, GREEN, RED, RED] }},
                { index: 2, resultModel: { assumedColors: [RED, RED, GREEN, RED] }},
                { index: 3, resultModel: { assumedColors: [RED, RED, RED, GREEN] }}
            ].forEach(({index, resultModel}) => {

                it('should change color of index ' + index, () => {
                    const { changeColor } =  init(defaultModel);
                    changeColor(index)
                    expect(spy).toHaveBeenCalledWith(resultModel)
                })
            });

            [
                { startingColor: {assumedColors: [RED, RED, RED, RED]} , resultModel: { assumedColors: [GREEN, RED, RED, RED] }},
                { startingColor: {assumedColors: [GREEN, RED, RED, RED]} , resultModel: { assumedColors: [YELLOW, RED, RED, RED] }},
                { startingColor: {assumedColors: [YELLOW, RED, RED, RED]} , resultModel: { assumedColors: [BLUE, RED, RED, RED] }},
                { startingColor: {assumedColors: [BLUE, RED, RED, RED]} , resultModel: { assumedColors: [PURPLE, RED, RED, RED] }},
                { startingColor: {assumedColors: [PURPLE, RED, RED, RED]} , resultModel: { assumedColors: [ORANGE, RED, RED, RED] }},
                { startingColor: {assumedColors: [ORANGE, RED, RED, RED]} , resultModel: { assumedColors: [PINK, RED, RED, RED] }},
                { startingColor: {assumedColors: [PINK, RED, RED, RED]} , resultModel: { assumedColors: [BROWN, RED, RED, RED] }},
                { startingColor: {assumedColors: [BROWN, RED, RED, RED]} , resultModel: { assumedColors: [RED, RED, RED, RED] }}
            ].forEach(({startingColor, resultModel}) => {

                it(`should change color from RED to GREEN`, () => {
                    const { changeColor } =  init(startingColor);
                    changeColor(0)
                    expect(spy).toHaveBeenCalledWith(expect.objectContaining(resultModel))
                })
            })

        })

        
    })
})