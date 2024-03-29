import { UpdateAction } from "@api/characters/[id]/update"
import { expect_character_to_be_unchanged, update_character } from "@tests/api_tests/utils"

describe("Character Update API should", () => {
	it("fail when invalid action is sent", async () => {
		const result = await update_character([
			"invalid_action" as UpdateAction["action"],
			"name",
			"Ragoz"
		])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})
