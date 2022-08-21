import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"

export default function calculateSkillsExperience({
																										bought,
																										remaining
																									}: {
	bought: ReadonlyArray<ReadonlyArray<string>>,
	remaining: ReadonlyArray<string>,
}) {

	const matrix = {} as Record<string, [XpMultiplier, XpMultiplier, XpMultiplier]>
	SKILL_DEFINITIONS.forEach(({ code }) => {
		matrix[code] = [XpMultiplier.Empty, XpMultiplier.Empty, XpMultiplier.Empty]
	})
	bought.forEach((codes, i) => {
		codes.forEach(code => {
			matrix[code][i] = XpMultiplier.Profession
		})
	})

	remaining.forEach(skill => {
		const vector = matrix[skill]
		const index = vector.findIndex(x => x === XpMultiplier.Empty)
		if (index === -1) throw Error(`skill ${skill} was found more than 3 times`)
		vector[index] = XpMultiplier.NonProfession
	})

	return SKILL_DEFINITIONS.reduce((accumulator, { code }) =>
			accumulator + matrix[code].map((item, i) => item * (i + 1) * 100).reduce((accum, value) => accum + value, 0),

		0)
}

enum XpMultiplier {
	Empty = 0,
	Profession = 1,
	NonProfession = 2
}