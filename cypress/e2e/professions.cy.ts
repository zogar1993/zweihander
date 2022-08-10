import { Profession } from "@core/domain/types/Profession"

describe("/professions", () => {

	before(() => {
		// @ts-ignore ts shenanigans
		cy.login()
	})

	beforeEach(() => {
		// @ts-ignore ts shenanigans
		cy.preserveAuth0CookiesOnce()
	});

	(require("../fixtures/profession.json") as Array<Profession>).map(profession =>
		it(`Profession "${profession.name}"`, () => {
			cy.visit("/professions").then(() => {
				cy.findByRole("article", {name: profession.name}).findByText(profession.name)
				cy.findByRole("article", {name: profession.name}).findByText(profession.book)
				cy.findByRole("article", {name: profession.name}).findByText(profession.type)
				cy.findByRole("article", {name: profession.name}).click()
				cy.findByText(profession.description)
			})
		})
	)
})
