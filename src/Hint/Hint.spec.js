import { fireEvent, render } from "@testing-library/react"
import {RED, BLUE} from "mastermind/src/colors"
import Hint from "./Hint"

describe ('Round', () => {

    describe ('Color', () => {
        it('should be black when property-color is black', () => {
            const {container} = render(<Hint color={RED} />)
            expect(container.querySelector(".Hint--red")).not.toBeNull()
        })
        it('should be blue when property-color is blue', () => {
            const {container} = render(<Hint color={BLUE} />)
            expect(container.querySelector(".Hint--blue")).not.toBeNull()
        })
        it('should warn when property-color is black', () => {
            jest.spyOn(console, "error").mockImplementation(() => {})
            const {container} = render(<Hint color="BLACK" />)
            expect(console.error).toHaveBeenCalled()
        })
    })
   
})