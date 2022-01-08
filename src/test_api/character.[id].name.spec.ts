//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_be_updated_with,
	updateCharacterSpy
} from "./utils"

describe("PUT character/[id]/name should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("Change the name of the character", async () => {
		const request = character_sheet_request("PUT", NAME_PATH, CHARACTER_NAME)

		const result = await call_character_sheet_api(request)

		expect_character_to_be_updated_with({ name: CHARACTER_NAME })
		expect(result.statusCode).toBe(200)
	})
})

const NAME_PATH = ["name"]
const CHARACTER_NAME = "linuar"

//TODO Clean data from character page, since it is mostly unnecesary, primarily on render