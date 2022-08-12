import { BoundFunctions, queries, screen } from "@testing-library/react"

export async function then_checkbox_exists(
	name: string,
	functions: BoundFunctions<typeof queries> = screen
) {
	functions.getByRole("checkbox", { name: name })
}