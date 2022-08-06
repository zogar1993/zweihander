import getTalents from "@core/actions/GetTalents"

describe("/talents", () => {
	it("shows all talents", () => {
		// @ts-ignore ts shenanigans
		cy.login().then(() => {
			cy.visit("/talents").then(() =>
				getTalents().then(talents => {
					talents.forEach(talent => {
						cy.findByRole("article", {name: talent.name}).findByText(talent.name)
						cy.findByRole("article", {name: talent.name}).findByText(talent.description)
						cy.findByRole("article", {name: talent.name}).findByText(talent.effect)
					})
				})
			)
		})
	})
})
