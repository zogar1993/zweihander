import { UpdateAction } from "@api/characters/[id]/update"
import { UserProvider } from "@auth0/nextjs-auth0"
import sanitizeCharacterSheet, { UnsanitizedCharacterSheetData } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { act, BoundFunctions, fireEvent, queries, render, screen, waitFor, within } from "@testing-library/react"
import * as deleteCharacterOfId from "@web/api_calls/DeleteCharacterOfId"
import * as updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import CharacterSheetScreen from "@web/components/character_sheet/CharacterSheetScreen"
import { ROLES_PROPERTY_NAME, UserRole } from "@web/components/character_sheet/hooks/UseHasAdminRole"
import { ComboboxCode, ComboBoxItem } from "misevi/dist/components/inner_components/ComboBox"
import { RouterContext } from "next/dist/shared/lib/router-context"
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
const deleteCharacterOfIdSpy = jest.spyOn(deleteCharacterOfId, "default")
const routerPushMock = jest.fn()

export const NEW_UPDATE_DATE = "2023-01-01T00:00:00Z"

export const A_USER = "jeanette@vmail.com"
export const ANOTHER_USER = "therese@email.com"
export const DEFAULT_CHARACTER_SHEET = sanitizeCharacterSheet({
	id: CHARACTER_ID,
	created_by: A_USER,
	updated_at: "2022-03-12T16:24:50.462Z"
})

const DEFAULT_USER = {
	email: DEFAULT_CHARACTER_SHEET.created_by,
	[ROLES_PROPERTY_NAME]: [UserRole.User]
}
let _user = { ...DEFAULT_USER }

export function given_your_email_is(email: string) {
	_user.email = email
}

export function given_you_have_role(role: UserRole) {
	_user[ROLES_PROPERTY_NAME] = [role]
}

export function given_you_no_role() {
	_user[ROLES_PROPERTY_NAME] = []
}

export async function render_character_sheet(
	character: Partial<UnsanitizedCharacterSheetData> = {}
) {
	updateCharacterOfIdSpy.mockReset()
	updateCharacterOfIdSpy.mockReturnValue(Promise.resolve(NEW_UPDATE_DATE))
	deleteCharacterOfIdSpy.mockReset()
	deleteCharacterOfIdSpy.mockReturnValue(Promise.resolve())
	routerPushMock.mockReset()
	routerPushMock.mockReturnValue(Promise.resolve())
	render(
		<RouterContext.Provider value={{ push: routerPushMock } as any}>
			<UserProvider user={_user}>
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
			</UserProvider>
		</RouterContext.Provider>
	)
	_user = { ...DEFAULT_USER }
}

export async function change_textbox_value(
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

export async function change_number_input_value(name: string, value: number) {
	const number_input = screen.getByRole("spinbutton", { name: name })
	await act(async () => {
		fireEvent.change(number_input, { target: { value: value } })
		fireEvent.blur(number_input)
	})
}

export async function change_combobox_item<T extends ComboboxCode>(
	name: string,
	item: ComboBoxItem<T>,
	functions: BoundFunctions<typeof queries> = screen
) {
	const textbox = functions.getByRole("textbox", { name: name })
	const combobox = textbox.parentElement!
	await act(async () => textbox.focus())
	const option = await within(combobox).findByRole("option", {
		name: item.name
	})
	await act(async () => {
		fireEvent.click(option)
	})
}

export async function is_a_combobox_option<T extends ComboboxCode>(
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

export async function then_radio_is_disabled(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).toBeDisabled())
}

export async function then_radio_is_checked(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).toBeChecked())
}

export async function then_radio_is_unchecked(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await waitFor(() => expect(radio).not.toBeChecked())
}

export async function then_textbox_has_a_value_of(name: string, value: string) {
	const textbox = screen.getByRole("textbox", { name: name })
	await waitFor(() => expect(textbox).toHaveValue(value.toString()))
}

export async function then_number_input_has_a_value_of(
	name: string,
	value: number
) {
	const spinbutton = screen.getByRole("spinbutton", { name: name })
	await waitFor(() => expect(spinbutton).toHaveValue(value))
}

export async function click_menu_item(name: string) {
	const menuitem = screen.getByRole("tab", { name: name })
	await act(async () => {
		fireEvent.click(menuitem)
	})
	const content = menuitem.parentElement!.children[1]! as HTMLElement
	return within(content)
}

export async function click_radiobutton(name: string) {
	const radio = screen.getByRole("radio", { name: name })
	await act(async () => {
		fireEvent.click(radio)
	})
}

export async function press_ctrl_z() {
	await act(async () => {
		fireEvent.keyDown(document, { ctrlKey: true, key: "z" })
	})
}

export async function update_character_api_was_called_with(
	actions: Array<UpdateAction>,
	options?: { calls: number; current: number; updated_at: string }
) {
	const callsAmount = options ? options.calls : 1
	const current = options ? options.current - 1 : 0
	const calls = updateCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(callsAmount))
	expect(calls[current][0]).toBe(CHARACTER_ID)
	expect(calls[current][1]).toBe(
		options ? options.updated_at : DEFAULT_CHARACTER_SHEET.updated_at
	)
	expect(calls[current][2]).toStrictEqual(actions)
}

export async function then_tag_exists(
	text: string,
	functions: BoundFunctions<typeof queries> = screen
) {
	functions.getByText(text)
}

export async function then_checkbox_exists(
	name: string,
	functions: BoundFunctions<typeof queries> = screen
) {
	functions.getByRole("checkbox", { name: name })
}

export async function delete_character_api_was_called() {
	const calls = deleteCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(1))
	expect(calls[0][0]).toBe(CHARACTER_ID)
}

export async function delete_character_api_was_not_called() {
	const calls = deleteCharacterOfIdSpy.mock.calls
	await waitFor(() => expect(calls.length).toBe(0))
}

export async function user_is_redirected_to(path: string) {
	const calls = routerPushMock.mock.calls
	await waitFor(() => expect(calls.length).toBe(1))
	expect(calls[0][0]).toBe(path)
}

export async function user_is_not_redirected() {
	const calls = routerPushMock.mock.calls
	await waitFor(() => expect(calls.length).toBe(0))
}

export async function then_textbox_is_disabled(name: string) {
	const checkbox = screen.getByRole("textbox", { name: name })
	await waitFor(() => expect(checkbox).toBeDisabled())
}

export async function then_number_input_is_disabled(name: string) {
	const checkbox = screen.getByRole("spinbutton", { name: name })
	await waitFor(() => expect(checkbox).toBeDisabled())
}

export async function then_menu_item_is_not_shown(name: string) {
	const menuitem = screen.queryByRole("tab", { name: name })
	expect(menuitem).not.toBeInTheDocument()
}

export async function then_character_sheet_does_not_show() {
	const menuitem = screen.queryByRole("spinbutton", { name: "Age" })
	expect(menuitem).not.toBeInTheDocument()
}

export async function then_you_are_redirected_to_unauthorized() {
	const calls = routerPushMock.mock.calls
	expect(calls).toHaveLength(1)
	expect(calls[0]).toEqual(["/unauthorized"])
}
