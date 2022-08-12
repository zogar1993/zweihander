import { act, fireEvent, screen, waitFor } from "@testing-library/react"

export async function when_spinbutton_value_is_changed(name: string, value: number) {
	const number_input = screen.getByRole("spinbutton", { name: name })
	await act(async () => {
		fireEvent.change(number_input, { target: { value: value } })
		fireEvent.blur(number_input)
	})
}

export async function then_number_input_has_a_value_of(
	name: string,
	value: number
) {
	const spinbutton = screen.getByRole("spinbutton", { name: name })
	await waitFor(() => expect(spinbutton).toHaveValue(value))
}

export async function then_spinbutton_is_disabled(name: string) {
	const spinbutton = screen.getByRole("spinbutton", { name: name })
	await waitFor(() => expect(spinbutton).toBeDisabled())
}