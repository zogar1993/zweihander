import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_removed,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"

describe("remove_from_array focus should", () => {
	it("remove the focus from the character", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect_character_to_have_item_removed({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})

	it("accept only strings", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character(["remove_from_array", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character(["remove_from_array", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("fail when character has no preexisting array", async () => {
		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined skill", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character([
			"remove_from_array",
			`focuses.whatever`,
			VALUE
		])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const SKILL = SKILL_DEFINITIONS[1]
const PROPERTY = `focuses.${SKILL.code}`
const VALUE = "cultured"
