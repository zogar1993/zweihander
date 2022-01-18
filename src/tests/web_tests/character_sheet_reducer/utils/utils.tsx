import { UpdateAction } from "@api/character/[id]/update"
import sanitizeCharacterSheet, {
	UnsanitizedCharacterSheetData
} from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import {
	BoundFunctions,
	fireEvent,
	queries,
	render,
	screen,
	waitFor,
	within
} from "@testing-library/react"
import * as updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import { blocksToObjects, UpdateActionBlock } from "@web/misc/UpdateActionBlock"
import { ComboBoxItem } from "misevi/dist/components/inner_components/ComboBox"
import * as router from "next/router"
import {
	TEST_ANCESTRIES,
	TEST_ARCHETYPES,
	TEST_CHAOS_ALIGNMENTS,
	TEST_MAGIC_SCHOOLS,
	TEST_ORDER_ALIGNMENTS,
	TEST_PROFESSIONS,
	TEST_TALENTS
} from "./collections"

const CHARACTER_ID = "an_id"
export const updateCharacterOfIdSpy = jest.spyOn(updateCharacterOfId, "default")
export const useRouterSpy = jest.spyOn(router, "useRouter")
useRouterSpy.mockReturnValue({ isFallback: false } as ReturnType<any>)

const DEFAULT_CHARACTER_SHEET = sanitizeCharacterSheet({ id: CHARACTER_ID })

export async function render_character_sheet(
	character: Partial<UnsanitizedCharacterSheetData> = {}
) {
	updateCharacterOfIdSpy.mockReset()
	updateCharacterOfIdSpy.mockReturnValue(Promise.resolve())
	render(
		<CharacterSheetScreen
			character={sanitizeCharacterSheet({
				...DEFAULT_CHARACTER_SHEET,
				...character
			})}
			schools={TEST_MAGIC_SCHOOLS}
			ancestries={TEST_ANCESTRIES}
			archetypes={TEST_ARCHETYPES}
			chaosAlignments={TEST_CHAOS_ALIGNMENTS}
			orderAlignments={TEST_ORDER_ALIGNMENTS}
			professions={TEST_PROFESSIONS}
			talents={TEST_TALENTS}
		/>
	)
}

export async function change_textbox_value(
	name: string,
	value: string,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	fireEvent.change(textbox, { target: { value: value.toString() } })
	fireEvent.blur(textbox)
}

export async function change_number_input_value(name: string, value: number) {
	const number_input = screen.getByRole("spinbutton", { name: name })
	fireEvent.change(number_input, { target: { value: value } })
	fireEvent.blur(number_input)
}

export async function select_combobox_item(
	name: string,
	item: ComboBoxItem,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	const combobox = textbox.parentElement!
	textbox.focus()
	const option = within(combobox).getByRole("option", { name: item.name })
	fireEvent.click(option)
}

export async function change_dots_value(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	fireEvent.click(selected)
}

export async function then_dots_is_checked_on(name: string, value: number) {
	const group = screen.getByRole("radiogroup", { name: name })
	const selected = within(group).getByRole("radio", { name: value.toString() })
	await waitFor(() => expect(selected).toBeChecked())
}

export async function then_textbox_has_a_value_of(name: string, value: string) {
	const checkbox = screen.getByRole("textbox", { name: name })
	await waitFor(() => expect(checkbox).toHaveValue(value.toString()))
}

export async function then_number_input_has_a_value_of(
	name: string,
	value: number
) {
	const checkbox = screen.getByRole("spinbutton", { name: name })
	await waitFor(() => expect(checkbox).toHaveValue(value))
}

export async function click_menu_item(name: string) {
	const menuitem = screen.getByRole("tab", { name: name })
	fireEvent.click(menuitem)
	const content = menuitem.parentElement!.children[1]! as HTMLElement
	return within(content)
}

export async function get_accordion_item_content(name: string) {
	const menuitem = screen.getByRole("tab", { name: name })
	return menuitem.parentElement!.children[1]! as HTMLElement
}

export async function update_character_api_was_called_with(
	actions: Array<UpdateAction>
) {
	const calls = updateCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(1))
	expect(calls[0][0]).toBe(CHARACTER_ID)
	expect(calls[0][1]).toStrictEqual(actions)
}

export async function update_character_api_was_called_with_2(
	...blocks: Array<UpdateActionBlock>
) {
	const actions = blocksToObjects(blocks)
	const calls = updateCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(1))
	expect(calls[0][0]).toBe(CHARACTER_ID)
	expect(calls[0][1]).toStrictEqual(actions)
}
