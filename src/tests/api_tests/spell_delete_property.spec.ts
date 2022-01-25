import {
	expect_character_to_have_property_deleted,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet/utils/collections"

describe("delete_property spell should", () => {
	it("remove magic school from the character", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["delete_property", PROPERTY])

		expect_character_to_have_property_deleted(PROPERTY)
		expect(result.statusCode).toBe(200)
	})
})

const SCHOOL = TEST_MAGIC_SCHOOLS[1]
const PROPERTY = `spells.${SCHOOL.code}`
const IRRELEVANT_VALUE = SCHOOL.spells[4].code
