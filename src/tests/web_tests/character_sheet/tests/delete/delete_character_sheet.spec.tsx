import { fireEvent, screen } from "@testing-library/react"
import {
	A_USER,
	ANOTHER_USER,
	click_menu_item,
	delete_character_api_was_called,
	delete_character_api_was_not_called,
	given_you_have_role,
	given_your_email_is,
	render_character_sheet,
	then_menu_item_is_not_shown,
	user_is_not_redirected,
	user_is_redirected_to
} from "@tests/web_tests/character_sheet/utils/utils"
import { UserRole } from "@web/components/character_sheet/hooks/UseHasAdminRole"
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
		await given_your_email_is(A_USER)
		await given_you_have_role(UserRole.User)
		await render_character_sheet({ created_by: ANOTHER_USER })

		await then_menu_item_is_not_shown(ACCORDION_ITEM.DANGER_ZONE)
	})

	it("be possible if you are a non owner admin", async () => {
		await given_your_email_is(A_USER)
		await given_you_have_role(UserRole.Admin)
		await render_character_sheet({ created_by: ANOTHER_USER })

		await click_menu_item(ACCORDION_ITEM.DANGER_ZONE)
		await click_button("Delete")
		await click_button("Yes, Delete it")

		await delete_character_api_was_called()
		await user_is_redirected_to("/characters")
	})

	it("be possible if you are an owner admin", async () => {
		await given_your_email_is(A_USER)
		await given_you_have_role(UserRole.Admin)
		await render_character_sheet({ created_by: A_USER })

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
