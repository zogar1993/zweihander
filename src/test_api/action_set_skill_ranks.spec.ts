import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value skills.{code}.ranks should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the skill ranks of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY,
				value: VALUE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			[`skills.${SKILL_DEFINITIONS[0].code}.ranks`]: VALUE
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = `skills.${SKILL_DEFINITIONS[0].code}.ranks`
const VALUE = 1
