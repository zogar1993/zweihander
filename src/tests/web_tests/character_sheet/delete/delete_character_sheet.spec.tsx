import { fireEvent, screen } from "@testing-library/react"
import {
	click_menu_item,
	delete_character_api_was_called,
	delete_character_api_was_not_called,
	render_character_sheet
} from "@tests/web_tests/character_sheet/utils/utils"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

describe("Delete Character Sheet should", () => {
	xit("send a 'DELETE' call to API", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Yes, Delete it")

		await delete_character_api_was_called()
	})
	it("when canceled, not send a 'DELETE' call to API", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Cancel")

		await delete_character_api_was_not_called()
	})
})

async function click_button(name: string) {
	const button = screen.getByRole("button", { name: name })
	fireEvent.click(button)
}
