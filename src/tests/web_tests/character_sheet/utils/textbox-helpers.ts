import { act, BoundFunctions, fireEvent, queries, screen, waitFor } from "@testing-library/react"

export async function when_textbox_value_is_changed(
	name: string,
	value: string,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	await act(async () => {
		fireEvent.change(textbox, { target: { value: value.toString() } })
		fireEvent.blur(textbox)
	})
}

export async function then_textbox_has_a_value_of(name: string, value: string) {
	const textbox = screen.getByRole("textbox", { name: name })
	await waitFor(() => expect(textbox).toHaveValue(value.toString()))
}

export async function then_textbox_is_disabled(name: string) {
	const checkbox = screen.getByRole("textbox", { name: name })
	await waitFor(() => expect(checkbox).toBeDisabled())
}