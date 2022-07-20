import { fireEvent, screen } from "@testing-library/react"
import {
	click_menu_item,
	delete_character_api_was_called,
	delete_character_api_was_not_called,
	render_character_sheet,
	then_menu_item_is_not_shown,
	user_is_not_redirected,
	user_is_redirected_to
} from "@tests/web_tests/character_sheet/utils/utils"
import { UserRole } from "@web/components/character_sheet/hooks/useIsAdminUser"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

describe("Delete Character Sheet should", () => {
	it("send a 'DELETE' call to API", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Yes, Delete it")

		await delete_character_api_was_called()
		await user_is_redirected_to("/characters")
	})

	it("when canceled, not send a 'DELETE' call to API", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Cancel")

		await delete_character_api_was_not_called()
		await user_is_not_redirected()
	})

	it("not be possible if you are a non owner user", async () => {
		await render_character_sheet(
			{ created_by: USER_A_EMAIL },
			{ email: USER_B_EMAIL, role: UserRole.User }
		)

		await then_menu_item_is_not_shown(ACCORDION_ITEM.DANGER_ZONE)
	})

	it("be possible if you are a non owner admin", async () => {
		await render_character_sheet(
			{ created_by: USER_A_EMAIL },
			{ email: USER_B_EMAIL, role: UserRole.Admin }
		)

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Yes, Delete it")

		await delete_character_api_was_called()
		await user_is_redirected_to("/characters")
	})

	it("be possible if you are an owner admin", async () => {
		await render_character_sheet(
			{ created_by: USER_A_EMAIL },
			{ email: USER_A_EMAIL, role: UserRole.Admin }
		)

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Yes, Delete it")

		await delete_character_api_was_called()
		await user_is_redirected_to("/characters")
	})
})

async function click_button(name: string) {
	const button = screen.getByRole("button", { name: name })
	fireEvent.click(button)
}

const USER_A_EMAIL = "jeanette@email.com"
const USER_B_EMAIL = "therese@email.com"
