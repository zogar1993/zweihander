import { fireEvent, within } from "@testing-library/react"
import { TEST_MAGIC_SCHOOLS } from "./utils/collections"
import {
	click_menu_item,
	get_accordion_item_content,
	render_character_sheet_page,
	update_character_api_was_called_with
} from "./utils/utils"

const SCHOOL = TEST_MAGIC_SCHOOLS[2]
const NEW_SPELL = SCHOOL.spells[2]

describe("Order Ranks Dots should", () => {
	it("send a 'set_value|order_ranks' action on change", async () => {
		await render_character_sheet_page()

		await click_menu_item("Spells") //TODO unharcoderino
		const content = await get_accordion_item_content("Spells")
		const school = within(content).getByRole("textbox", { name: "School" })
		const skill = within(content).getByRole("textbox", { name: "Spell" })
		const button = within(content).getByRole("button")

		const school_combobox = school.parentElement!
		school_combobox.focus()
		const weas = within(school_combobox)
			.queryAllByRole("option")
			.map(x => x.textContent)
		console.log("fome", weas.length, weas)
		const school_option = within(school_combobox).getByRole("option", {
			name: SCHOOL.name
		})
		fireEvent.click(school_option)

		const spell_combobox = skill.parentElement!
		spell_combobox.focus()
		const spell_option = within(spell_combobox).getByRole("option", {
			name: NEW_SPELL.name
		})
		fireEvent.click(spell_option)

		fireEvent.click(button)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: `spells.${SCHOOL.code}`,
				value: NEW_SPELL.code
			}
		])
	})
})
