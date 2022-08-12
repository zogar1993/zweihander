import { act, fireEvent, screen, waitFor, within } from "@testing-library/react"

export async function change_dots_value(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	await act(async () => {
		fireEvent.click(selected)
	})
}

export async function then_dots_is_checked_on(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	await waitFor(() => expect(selected).toBeChecked())
}

export async function then_dots_are_disabled(name: string) {
	const group = screen.getByRole("radiogroup", { name: name })
	const radios = within(group).queryAllByRole("radio")
	radios.forEach(radio => expect(radio).toBeDisabled())
}