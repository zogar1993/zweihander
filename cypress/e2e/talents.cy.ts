import {Talent} from "@core/domain/types/Talent"

describe("/talents", () => {
	it("shows all talents", () => {
		// @ts-ignore ts shenanigans
		cy.login().then(() => {
			cy.visit("/talents").then(() =>
				cy.fixture("talent.json").then(talents => {
					(talents as Array<Talent>).forEach(talent => {
						cy.findByRole("article", {name: talent.name}).findByText(talent.name)
						cy.findByRole("article", {name: talent.name}).findByText(talent.description)
						cy.findByRole("article", {name: talent.name}).findByText(talent.effect)
					})
				})
			)
		})
	})
})
