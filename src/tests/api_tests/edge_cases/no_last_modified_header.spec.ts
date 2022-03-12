import {
	expect_character_to_be_unchanged,
	update_character_full
} from "@tests/api_tests/utils"
import { blocksToObjects } from "@web/misc/UpdateActionBlock"

describe("Character Update API should", () => {
	it("fail when no if-unmodified-since header is sent", async () => {
		const result = await update_character_full({
			update_actions: IRRELEVANT_UPDATE_ACTION,
			last_modified: null
		})

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const IRRELEVANT_UPDATE_ACTION = blocksToObjects([
	["set_value", "name", "Linuar"]
])
