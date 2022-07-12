import calculateProfessions from "@core/domain/character_sheet/calculations/CalculateProfessions"
import { TEST_PROFESSIONS } from "@tests/web_tests/character_sheet/utils/collections"

const PROFESSION_1 = TEST_PROFESSIONS[1]
const PROFESSION_2 = TEST_PROFESSIONS[2]
const PROFESSION_3 = TEST_PROFESSIONS[3]

describe("CalculateProfessions should", () => {
	it("return empty array when there is no selected professions", async () => {
		const professions = calculateProfessions({
			character: { profession1: null, profession2: null, profession3: null },
			professions: TEST_PROFESSIONS
		})

		expect(professions).toEqual([])
	})

	it("return one profession when profession1 is selected", async () => {
		const professions = calculateProfessions({
			character: {
				profession1: PROFESSION_1.code,
				profession2: null,
				profession3: null
			},
			professions: TEST_PROFESSIONS
		})

		expect(professions).toEqual([PROFESSION_1])
	})

	it("return two professions when profession1 and profession2 are selected", async () => {
		const professions = calculateProfessions({
			character: {
				profession1: PROFESSION_1.code,
				profession2: PROFESSION_2.code,
				profession3: null
			},
			professions: TEST_PROFESSIONS
		})

		expect(professions).toEqual([PROFESSION_1, PROFESSION_2])
	})

	it("return three professions when all three professions are selected", async () => {
		const professions = calculateProfessions({
			character: {
				profession1: PROFESSION_1.code,
				profession2: PROFESSION_2.code,
				profession3: PROFESSION_3.code
			},
			professions: TEST_PROFESSIONS
		})

		expect(professions).toEqual([PROFESSION_1, PROFESSION_2, PROFESSION_3])
	})
})
