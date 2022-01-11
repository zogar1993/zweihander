import { Ancestry } from "@core/domain/Ancestry"

export const TEST_ANCESTRIES: Array<Ancestry> = Array.from(
	Array(10).keys(),
	n => n + 1
).map(n => ({
	name: `Ancestry ${n}`,
	code: `ancestry_${n}`,
	description: `Ancestry ${n} description`,
	type: `ancestry_${n}_type`,
	family: `ancestry_${n}_family`,
	attribute_bonuses: {
		combat: -2,
		fellowship: -1,
		brawn: 1,
		willpower: 2
	},
	traits: Array.from(Array(10).keys(), m => m + 1).map(m => ({
		name: `Ancestry ${n} Trait ${m}`,
		code: `ancestry_${n}_trait_${m}`,
		description: `ancestry_${n}_trait_${m}_description`,
		effect: `ancestry_${n}_trait_${m}_effect`,
		from: 10 * (m - 1) + 1,
		to: 10 * m
	}))
}))