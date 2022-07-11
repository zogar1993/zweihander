import {
	expect_character_to_be_unchanged,
	update_character
} from "@tests/api_tests/utils"

describe("Character Update API should", () => {
	it("fail when no action is sent", async () => {
		const result = await update_character()

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})
