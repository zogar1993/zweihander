import { TalentTech } from "@core/domain/character_sheet/CharacterSheet"

const TALENTS = [
	"talent_exclusive_1",
	"talent_exclusive_2",
	"talent_exclusive_3",
	"talent_shared_1_and_2",
	"talent_shared_2_and_3",
	"talent_shared_1_and_3",
	"talent_not_included_a",
	"talent_not_included_b",
	"talent_not_included_c",
	"talent_not_included_d"
].map(code => ({
	name: `Name ${code}`,
	code: code,
	effect: `${code}_effect`,
	description: `${code}_description`
}))

const [
	TALENT_EXCLUSIVE_1,
	TALENT_EXCLUSIVE_2,
	TALENT_EXCLUSIVE_3,
	TALENT_SHARED_1_AND_2,
	TALENT_SHARED_2_AND_3,
	TALENT_SHARED_1_AND_3,
	TALENT_NOT_INCLUDED_A,
	TALENT_NOT_INCLUDED_B,
	TALENT_NOT_INCLUDED_C,
	TALENT_NOT_INCLUDED_D
] = TALENTS

const PROFESSION_1 = {
	advances: {
		talents: [
			TALENT_EXCLUSIVE_1.code,
			TALENT_SHARED_1_AND_2.code,
			TALENT_SHARED_1_AND_3.code
		]
	}
}
const PROFESSION_2_WITH_1_WILDCARD = {
	advances: {
		talents: [
			TALENT_EXCLUSIVE_2.code,
			TALENT_SHARED_1_AND_2.code,
			TALENT_SHARED_2_AND_3.code
		]
	}
}
const PROFESSION_3_WITH_2_WILDCARDS = {
	advances: {
		talents: [
			TALENT_EXCLUSIVE_3.code,
			TALENT_SHARED_1_AND_3.code,
			TALENT_SHARED_2_AND_3.code
		]
	}
}
const PROFESSIONS = [
	PROFESSION_1,
	PROFESSION_2_WITH_1_WILDCARD,
	PROFESSION_3_WITH_2_WILDCARDS
]

const PROFESSION_WITHOUT_WILDCARDS = {
	advances: { talents: ["irrelevant_1", "irrelevant_2", "irrelevant_3"] }
}

xdescribe("CalculateTalents should", () => {
	xit("", () => {
	})
	/*
		it("when no talents, return nothing", async () => {
			const ancestry = calculateProfessionProfile({
				character: { talents: [] },
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([])
		})

		it("when talent is exclusive to 1, set it in 1", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_EXCLUSIVE_1.code] },
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([profession(1, TALENT_EXCLUSIVE_1)])
		})

		it("when talent is exclusive to 2, set it in 2", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_EXCLUSIVE_2.code] },
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([profession(2, TALENT_EXCLUSIVE_2)])
		})

		it("when talent is exclusive to 3 but 2 has available wildcards, set it in 2", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_EXCLUSIVE_3.code] },
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([profession(2, TALENT_EXCLUSIVE_3)])
		})

		it("when talent is exclusive to 3 and 2 has no available wildcards, set it in 3", async () => {
			const ancestry = calculateTalents({
				character: {
					talents: [TALENT_NOT_INCLUDED_A.code, TALENT_EXCLUSIVE_3.code]
				},
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([
				profession(2, TALENT_NOT_INCLUDED_A),
				profession(3, TALENT_EXCLUSIVE_3)
			])
		})

		it("not included talents go first to 2 wildcards, then to 3 wildcards, then to house ruled", async () => {
			const ancestry = calculateTalents({
				character: {
					talents: [
						TALENT_NOT_INCLUDED_A.code,
						TALENT_NOT_INCLUDED_B.code,
						TALENT_NOT_INCLUDED_C.code,
						TALENT_NOT_INCLUDED_D.code
					]
				},
				talents: TALENTS,
				professions: PROFESSIONS
			})

			expect(ancestry).toEqual([
				profession(2, TALENT_NOT_INCLUDED_A),
				profession(3, TALENT_NOT_INCLUDED_B, TALENT_NOT_INCLUDED_C),
				houseruled(TALENT_NOT_INCLUDED_D)
			])
		})

		it("not include profession 1 when it is not set", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_NOT_INCLUDED_A.code] },
				talents: TALENTS,
				professions: []
			})

			expect(ancestry).toEqual([houseruled(TALENT_NOT_INCLUDED_A)])
		})

		it("not include profession 2 when it is not set", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_NOT_INCLUDED_A.code] },
				talents: TALENTS,
				professions: [PROFESSION_1]
			})

			expect(ancestry).toEqual([houseruled(TALENT_NOT_INCLUDED_A)])
		})

		it("not include profession 3 when it is not set", async () => {
			const ancestry = calculateTalents({
				character: { talents: [TALENT_NOT_INCLUDED_A.code] },
				talents: TALENTS,
				professions: [PROFESSION_1, PROFESSION_WITHOUT_WILDCARDS]
			})

			expect(ancestry).toEqual([houseruled(TALENT_NOT_INCLUDED_A)])
		})
	*/
})

function profession(number: 1 | 2 | 3, ...talents: Array<TalentTech>) {
	return {
		name: `Profession ${number}`,
		code: `profession${number}`,
		items: talents
	}
}
