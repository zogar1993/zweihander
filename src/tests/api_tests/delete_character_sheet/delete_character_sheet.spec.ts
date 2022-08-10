import {
	a_character_sheet_does_not_exist,
	a_character_sheet_exists,
	as_user,
	CHARACTER_ID,
	delete_character_sheet_of_id,
	expect_character_to_be_deleted,
	expect_character_to_not_be_deleted
} from "@tests/api_tests/delete_character_sheet/utils"
import { UserRole } from "@web/components/character_sheet/hooks/UseHasAdminRole"

const USER_NAME_A = "jeanette"
const USER_NAME_B = "therese"

describe("delete character by id API should", () => {
	it("delete a character when called by a user who is the owner", async () => {
		await as_user({ email: USER_NAME_A, role: UserRole.User })
		await a_character_sheet_exists({
			id: CHARACTER_ID,
			created_by: USER_NAME_A
		})
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(204)
		expect_character_to_be_deleted(CHARACTER_ID)
	})

	it("not delete the character when called by a user who is not the owner", async () => {
		await as_user({ email: USER_NAME_B, role: UserRole.User })
		await a_character_sheet_exists({
			id: CHARACTER_ID,
			created_by: USER_NAME_A
		})
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(403)
		expect_character_to_not_be_deleted(CHARACTER_ID)
	})

	it("delete a character when called by an admin who is the owner", async () => {
		await as_user({ email: USER_NAME_A, role: UserRole.Admin })
		await a_character_sheet_exists({
			id: CHARACTER_ID,
			created_by: USER_NAME_A
		})
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(204)
		expect_character_to_be_deleted(CHARACTER_ID)
	})

	it("delete a character when called by an admin who is not owner", async () => {
		await as_user({ email: USER_NAME_B, role: UserRole.Admin })
		await a_character_sheet_exists({
			id: CHARACTER_ID,
			created_by: USER_NAME_A
		})
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(204)
		expect_character_to_be_deleted(CHARACTER_ID)
	})

	it("not delete the character when called by someone without role", async () => {
		await as_user({ email: USER_NAME_A, role: null })
		await a_character_sheet_exists({
			id: CHARACTER_ID,
			created_by: USER_NAME_A
		})
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(403)
		expect_character_to_not_be_deleted(CHARACTER_ID)
	})

	it("return 404 when the character sheet does not exist", async () => {
		await as_user({ email: USER_NAME_A, role: UserRole.User })
		await a_character_sheet_does_not_exist({ id: CHARACTER_ID })
		const result = await delete_character_sheet_of_id(CHARACTER_ID)

		expect(result).toHaveStatusCode(404)
		expect_character_to_not_be_deleted(CHARACTER_ID)
	})
})
