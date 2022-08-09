import { Ancestry } from "@core/domain/types/Ancestry"

describe("/ancestries", () => {
	before(() => {
		// @ts-ignore ts shenanigans
		cy.login()
	})

	beforeEach(() => {
		// @ts-ignore ts shenanigans
		cy.preserveAuth0CookiesOnce()
	});

	(require("../fixtures/ancestry.json") as Array<Ancestry>).map(ancestry =>
		it(`Ancestry ${ancestry.name}`, () => {
			cy.visit(`/ancestries/${ancestry.code}`).then(() => {
				//cy.findByText(ancestry.description)
				ancestry.traits.forEach(trait => {
					cy.findByRole("article", {name: trait.name}).findByText(trait.name)
					cy.findByRole("article", {name: trait.name}).findByText(trait.description)
					cy.findByRole("article", {name: trait.name}).findByText(trait.effect)
				})
			})
		})
	)
})
