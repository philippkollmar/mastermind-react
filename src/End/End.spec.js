import { fireEvent, render } from "@testing-library/react"
import * as game from "mastermind/src/game"
import { LOST, PENDING, WON } from "mastermind/src/game"
import End from "./END"


describe ('End', () => {

    describe ('Color', () => {
        it('should be won when player guessed right', () => {
            const {container} = render(<End result={WON} />)
            expect(container.querySelector(".End--WON")).not.toBeNull()
        })
        fit('should be lost when player guessed wrong after 12 rounds', () => {
            const {container} = render(<End result={LOST} />)
            expect(container.querySelector(".End--LOST")).not.toBeNull()
        })
        it('should be null when player is playing', () => {
            const {container} = render(<End result={PENDING} />)
            expect(container.querySelector(".End--PENDING")).toBeNull()
        })
    })
})