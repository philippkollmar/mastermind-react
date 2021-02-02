import { fireEvent, render } from "@testing-library/react"
import {RED, BLUE} from "mastermind/src/colors"
import Round from "./Round"

describe ('Round', () => {

    describe ('Color', () => {
        it('should be red when property-color is red', () => {
            const {container} = render(<Round color={RED} />)
            expect(container.querySelector(".Round--red")).not.toBeNull()
        })
        it('should be blue when property-color is blue', () => {
            const {container} = render(<Round color={BLUE} />)
            expect(container.querySelector(".Round--blue")).not.toBeNull()
        })
        it('should warn when property-color is black', () => {
            jest.spyOn(console, "error").mockImplementation(() => {})
            const {container} = render(<Round color="BLACK" />)
            expect(console.error).toHaveBeenCalled()
        })
    })
   
})