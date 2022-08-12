import { act, BoundFunctions, fireEvent, queries, screen, within } from "@testing-library/react"
import { ComboboxCode, ComboBoxItem } from "misevi/dist/components/inner_components/ComboBox"

export async function when_combobox_item_is_changed<T extends ComboboxCode>(
	name: string,
	item: ComboBoxItem<T>,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	const combobox = textbox.parentElement!
	await act(async () => textbox.focus())
	const option = await within(combobox).findByRole("option", { name: item.name })
	await act(async () => {
		fireEvent.click(option)
	})
}

export async function then_is_a_combobox_option<T extends ComboboxCode>(
	name: string,
	item: ComboBoxItem<T>,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	const combobox = textbox.parentElement!
	textbox.focus()
	await within(combobox).findByRole("listbox")
	const option = within(combobox).queryByRole("option", { name: item.name })
	return !!option
}