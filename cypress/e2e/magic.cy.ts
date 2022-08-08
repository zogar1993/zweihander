import {MagicSource} from "@core/domain/types/MagicSource"
import {Spell} from "@core/domain/types/Spell"


describe("/magic/{school?}", () => {

	before(() => {
		// @ts-ignore ts shenanigans
		cy.login()
	})

	beforeEach(() => {
		// @ts-ignore ts shenanigans
		cy.preserveAuth0CookiesOnce()
	})
	const sources = require("../fixtures/magic_source.json") as Array<MagicSource>
	const sources_with_schools = sources.filter(source => source.schools.length > 1)
	const sources_without_schools = sources.filter(source => source.schools.length === 1)

	sources_without_schools.map(source =>
		source.schools.map(school =>
			school.spells.map(spell =>
				it(`${source.name} - ${spell.name}`, () => {
					cy.visit(`magic/${source.code}`)
					validateSpell(spell)
				})
			)
		)
	)

	sources_with_schools.map(source =>
		source.schools.map(school =>
			school.spells.map(spell =>
				it(`${source.name} - ${school.name} - ${spell.name}`, () => {
					cy.visit(`magic/${source.code}/${school.code}`)
					cy.findByRole("link", {name: school.name}).click()
					validateSpell(spell)
				})
			)
		)
	)
})

function validateSpell(spell: Spell) {
	cy.findByRole("article", {name: spell.name}).findByText(spell.name)
	cy.findByRole("article", {name: spell.name}).findByText(spell.description)
	cy.findByRole("article", {name: spell.name}).findByText(spell.distance_tag)
	cy.findByRole("article", {name: spell.name}).findByText(spell.principle)
	cy.findByRole("article", {name: spell.name}).findByText(spell.school)
	cy.findByRole("article", {name: spell.name}).click()
	cy.findByText(spell.effect)
	cy.findByText(spell.critical_failure)
	cy.findByText(spell.critical_success)
	cy.findByText(spell.reagents)
	//TODO fix ambiguity here
	//await screen.findByText(spell.duration)
	//await screen.findByText(spell.distance)
	//TODO fix root sources like magic/arcana/
}