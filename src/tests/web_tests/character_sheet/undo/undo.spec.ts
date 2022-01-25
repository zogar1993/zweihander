import { fireEvent, screen, waitFor } from "@testing-library/react"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"
import {
	change_textbox_value,
	click_menu_item,
	press_ctrl_z,
	render_character_sheet,
	select_combobox_item
} from "@tests/web_tests/character_sheet/utils/utils"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

describe("Character Sheet Screen should", () => {
	it("undo add_to_array", async () => {
		await render_character_sheet({ talents: [TALENT_1.code] })
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		await select_combobox_item("Talent", TALENT_2, context)
		const new_tag = await context.findByText(TALENT_2.name)

		await press_ctrl_z()

		await waitFor(() => expect(new_tag).not.toBeInTheDocument())
	})

	it("undo remove_from_array", async () => {
		await render_character_sheet({ talents: [TALENT_1.code, TALENT_2.code] })
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		const a_tag = await context.findByText(TALENT_2.name)
		fireEvent.click(a_tag)
		await waitFor(() => expect(a_tag).not.toBeInTheDocument())

		await press_ctrl_z()

		await context.findByText(TALENT_2.name)
	})

	it("undo delete_property", async () => {
		await render_character_sheet({ talents: [TALENT_1.code] })
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		const a_tag = await context.findByText(TALENT_1.name)
		fireEvent.click(a_tag)
		await waitFor(() => expect(a_tag).not.toBeInTheDocument())

		await press_ctrl_z()

		await context.findByText(TALENT_1.name)
	})

	it("undo set_value to delete property", async () => {
		await render_character_sheet({})
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		await select_combobox_item("Talent", TALENT_1, context)
		const new_tag = await context.findByText(TALENT_1.name)

		await press_ctrl_z()

		await waitFor(() => expect(new_tag).not.toBeInTheDocument())
	})

	it("undo set_value to previous value", async () => {
		await render_character_sheet({ name: "Ragoz" })
		await change_textbox_value("Name", "Raghost")
		await screen.findByDisplayValue("Raghost")

		await press_ctrl_z()

		await screen.findByDisplayValue("Ragoz")
	})

	it("undo when no actions where done does nothing", async () => {
		await render_character_sheet({ name: "Ragoz" })

		await press_ctrl_z()

		await screen.findByDisplayValue("Ragoz")
	})
})

const TALENT_1 = TEST_TALENTS[1]
const TALENT_2 = TEST_TALENTS[2]
