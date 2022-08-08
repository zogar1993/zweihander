import {Profession} from "@core/domain/types/Profession"

describe("/professions", () => {
	(require("../fixtures/profession.json") as Array<Profession>).map(profession =>
		it(`shows talent "${profession.name}"`, () => {
			// @ts-ignore ts shenanigans
			cy.login().then(() => {
				cy.visit("/professions").then(() => {

					cy.findByRole("article", {name: profession.name}).findByText(profession.name)
					cy.findByRole("article", {name: profession.name}).findByText(profession.book)
					cy.findByRole("article", {name: profession.name}).findByText(profession.type)
					cy.findByRole("article", {name: profession.name}).click()
					cy.wait(10000).then(() => {
						cy.findByText(profession.description).then(() => {
							cy.get("body").type("{esc}")
						})
					})
				})
			})
		})
	)
})
