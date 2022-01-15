import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value order_alignment should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the order alignment of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_ORDER_ALIGNMENT,
				value: CHARACTER_ORDER_ALIGNMENT
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			order_alignment: CHARACTER_ORDER_ALIGNMENT
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_ORDER_ALIGNMENT = "order_alignment"
const CHARACTER_ORDER_ALIGNMENT = "charity"
