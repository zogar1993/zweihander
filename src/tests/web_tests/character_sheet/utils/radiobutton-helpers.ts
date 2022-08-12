import { act, fireEvent, screen, waitFor } from "@testing-library/react"

export async function when_radiobutton_is_clicked(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await act(async () => {
		fireEvent.click(radio)
	})
}

export async function then_radiobutton_is_checked(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).toBeChecked())
}

export async function then_radiobutton_is_disabled(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).toBeDisabled())
}

export async function then_radiobutton_is_unchecked(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).not.toBeChecked())
}