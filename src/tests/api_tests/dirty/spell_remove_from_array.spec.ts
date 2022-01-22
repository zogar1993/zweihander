import {
	expect_character_to_have_item_removed,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet_reducer/utils/collections"

describe("remove_from_array spell should", () => {
	it("remove the spell from the character", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [VALUE] } })

		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect_character_to_have_item_removed({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const SCHOOL = TEST_MAGIC_SCHOOLS[1]
const VALUE = SCHOOL.spells[1].code
const PROPERTY = `spells.${SCHOOL.code}`
