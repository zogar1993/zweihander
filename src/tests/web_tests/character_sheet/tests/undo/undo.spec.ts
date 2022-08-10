import { fireEvent, screen, waitFor } from "@testing-library/react"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"
import {
	change_combobox_item,
	change_textbox_value,
	press_ctrl_z,
	render_character_sheet
} from "@tests/web_tests/character_sheet/utils/utils"

describe("Character Sheet Screen should", () => {
	it("undo add_to_array", async () => {
		await render_character_sheet({ talents: [TALENT_1.code] })
		await change_combobox_item("New Talent", TALENT_2)
		const new_tag = await findCheckbox(TALENT_2.name)

		await press_ctrl_z()

		await waitFor(() => expect(new_tag).not.toBeInTheDocument())
	})

	it("undo remove_from_array", async () => {
		await render_character_sheet({ talents: [TALENT_1.code, TALENT_2.code] })
		const a_tag = await findCheckbox(TALENT_2.name)
		fireEvent.click(a_tag)
		await waitFor(() => expect(a_tag).not.toBeInTheDocument())

		await press_ctrl_z()

		await findCheckbox(TALENT_2.name)
	})

	it("undo delete_property", async () => {
		await render_character_sheet({ talents: [TALENT_1.code] })
		const a_tag = await findCheckbox(TALENT_1.name)
		fireEvent.click(a_tag)
		await waitFor(() => expect(a_tag).not.toBeInTheDocument())

		await press_ctrl_z()

		await findCheckbox(TALENT_1.name)
	})

	it("undo set_value to delete property", async () => {
		await render_character_sheet({})
		await change_combobox_item("New Talent", TALENT_1)
		const new_tag = await findCheckbox(TALENT_1.name)

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

	const findCheckbox = (name: string) => screen.findByRole("checkbox", {name: name})
})

const TALENT_1 = TEST_TALENTS[1]
const TALENT_2 = TEST_TALENTS[2]
