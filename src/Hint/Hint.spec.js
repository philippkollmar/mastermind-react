import { fireEvent, render } from "@testing-library/react"
import { PARTIALLY, FITS, NOT_AT_ALL } from "mastermind/src/hint"
import Hint from "./Hint"

describe ('Round', () => {

    describe ('Color', () => {
        it('should be black when color fits', () => {
            const {container} = render(<Hint color={FITS} />)
            expect(container.querySelector(".Hint--fits")).not.toBeNull()
        })
        it('should be grey when color fits Partially', () => {
            const {container} = render(<Hint color={PARTIALLY} />)
            expect(container.querySelector(".Hint--partially")).not.toBeNull()
        })
        it('should be grey when color doesnt fit', () => {
            const {container} = render(<Hint color={NOT_AT_ALL} />)
            expect(container.querySelector(".Hint--not_at_all")).not.toBeNull()
        })
    })
   
})