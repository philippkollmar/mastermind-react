import { fireEvent, render } from "@testing-library/react"
import {RED, BLUE} from "mastermind/src/colors"
import Pin from "./Pin"

describe ('Pin', () => {

    describe ('Color', () => {
        it('should be red when property-color is red', () => {
            const {container} = render(<Pin color={RED} />)
            expect(container.querySelector(".Pin--red")).not.toBeNull()
        })
        it('should be blue when property-color is blue', () => {
            const {container} = render(<Pin color={BLUE} />)
            expect(container.querySelector(".Pin--blue")).not.toBeNull()
        })
        it('should warn when property-color is black', () => {
            jest.spyOn(console, "error").mockImplementation(() => {})
            const {container} = render(<Pin color="BLACK" />)
            expect(console.error).toHaveBeenCalled()
        })
    })
    describe ('Change', () => {
        it('should allow to take a function', () => {
            jest.spyOn(console, "error").mockImplementation(() => {})
            render(<Pin color={RED} change="null" />)
            expect(console.error).toHaveBeenCalled()
        })
        it('should evaluate change on click', () => {
            const spy = jest.fn()
            const {container} = render(<Pin color={RED} change={spy} />)
            fireEvent.click(container.querySelector(".Pin"))
            expect(spy).toHaveBeenCalled()
        }) 
    })
})