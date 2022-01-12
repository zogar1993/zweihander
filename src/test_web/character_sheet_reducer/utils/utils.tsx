import { UpdateAction } from "@api/character/[id]/update"
import sanitizeCharacterSheet, {
	SanitizedCharacterSheet
} from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
	within
} from "@testing-library/react"
import * as updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import { ComboBoxItem } from "misevi/dist/components/inner_components/ComboBox"
import * as router from "next/router"
import { TEST_ANCESTRIES } from "./collections"

const CHARACTER_ID = "an_id"
export const updateCharacterOfIdSpy = jest.spyOn(updateCharacterOfId, "default")
export const useRouterSpy = jest.spyOn(router, "useRouter")
useRouterSpy.mockReturnValue({ isFallback: false } as ReturnType<any>)

const DEFAULT_CHARACTER_SHEET = sanitizeCharacterSheet({ id: CHARACTER_ID })

export async function render_character_sheet_page(
	character: Partial<SanitizedCharacterSheet> = {}
) {
	updateCharacterOfIdSpy.mockReset()
	updateCharacterOfIdSpy.mockReturnValue(Promise.resolve())
	render(
		<CharacterSheetScreen
			character={{ ...DEFAULT_CHARACTER_SHEET, ...character }}
			schools={[]}
			ancestries={TEST_ANCESTRIES}
			archetypes={[]}
			chaosAlignments={[]}
			orderAlignments={[]}
			professions={[]}
			talents={[]}
		/>
	)
}

export async function change_textbox_value(name: string, value: string) {
	const textbox = screen.getByRole("textbox", { name: name })
	act(() => fireEvent.change(textbox, { target: { value: value.toString() } }))
	act(() => fireEvent.blur(textbox))
}

export async function change_number_input_value(name: string, value: number) {
	const number_input = screen.getByRole("spinbutton", { name: name })
	act(() => fireEvent.change(number_input, { target: { value: value } }))
	act(() => fireEvent.blur(number_input))
}

export async function select_combobox_item(name: string, item: ComboBoxItem) {
	const textbox = screen.getByRole("textbox", { name: name })
	const combobox = textbox.parentElement!
	textbox.focus()
	const option = within(combobox).getByRole("option", { name: item.name })
	fireEvent.click(option)
}

export async function select_dots_value(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	fireEvent.click(selected)
}

export async function then_dots_is_checked_on(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	await waitFor(() => expect(selected).toBeChecked())
}

export async function update_character_api_was_called_with(
	actions: Array<UpdateAction>
) {
	const calls = updateCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(1))
	expect(calls[0][0]).toBe(CHARACTER_ID)
	expect(calls[0][1]).toStrictEqual(actions)
}
