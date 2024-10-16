import { Talent } from "@core/domain/types/Talent"

describe("/talents", () => {
	before(() => {
		// @ts-ignore ts shenanigans
		cy.login()
	})

	beforeEach(() => {
		// @ts-ignore ts shenanigans
		cy.preserveAuth0CookiesOnce()
	});

	(require("../fixtures/talents.json") as ReadonlyArray<Talent>).map(talent =>
		it(`Talent ${talent}`, () => {
			cy.visit("/talents").then(() => {
				cy.findByRole("article", {name: talent.name}).findByText(talent.name)
				cy.findByRole("article", {name: talent.name}).findByText(talent.description)
				cy.findByRole("article", {name: talent.name}).findByText(talent.effect)
			})
		})
	)
})
