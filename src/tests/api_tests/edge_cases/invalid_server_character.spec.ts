import { expect_character_to_be_unchanged, the_saved_character_has, update_character } from "@tests/api_tests/utils"

describe("Character Update API should", () => {
	it("when server state is wrong, return server error", async () => {
		the_saved_character_has({ talents: ["whatever"] })

		const result = await update_character(VALID_UPDATE_ACTION)

		expect(result).toHaveStatusCode(500)
		expect_character_to_be_unchanged()
	})
})

const VALID_UPDATE_ACTION = ["set_value", "name", "Ragoz"] as const
