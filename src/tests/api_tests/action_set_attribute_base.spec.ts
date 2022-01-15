import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value attributes.{code}.base should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the attribute base of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY,
				value: VALUE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			[`attributes.${ATTRIBUTE_DEFINITIONS[0].code}.base`]: VALUE
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = `attributes.${ATTRIBUTE_DEFINITIONS[0].code}.base`
const VALUE = 45
