import getMagicSources from "@core/actions/GetMagicSources"
import { fireEvent, render, screen, within } from "@testing-library/react"
import MagicScreen from "@web/components/magic/MagicScreen"
import { useState } from "react"

function useRouterMock() {
	const [query, setQuery] = useState<Record<string, string>>({})
	return {
		push: (path: string) => {
			const index = path.indexOf("?")
			if (index === -1) return setQuery({})
			const queryparams = path.substring(index + 1).split("&")
			const query: any = {}
			queryparams.forEach(part => {
				const [key, value] = part.split("=")
				query[key] = value
			})
			setQuery(query)
		},
		query: query
	}
}

const useRouterSpy = jest.spyOn(require("next/router"), "useRouter")
useRouterSpy.mockImplementation(useRouterMock as any)

describe("MagicScreen should", () => {
	it("render all Arcanas and their spells", async () => {
		const sources = await getMagicSources()
		const source = sources.find(x => x.code === "arcana")!
		const school = source.schools[0]
		const spells = school.spells

		render(<MagicScreen source={source} school={school} spells={spells} />)

		for (const school of source.schools)
			screen.getByRole("link", {name: school.name})

		for (const spell of spells) {
			const article = screen.getByRole("article", { name: spell.name })
			within(article).getByText(spell.name)
			within(article).getByText(spell.description)
			within(article).getByText(spell.distance_tag)
			within(article).getByText(spell.principle)
			within(article).getByText(spell.school)
			fireEvent.click(article)
			await screen.findByText(spell.effect)
			await screen.findByText(spell.critical_failure)
			await screen.findByText(spell.critical_success)
			await screen.findByText(spell.reagents)
			//TODO fix ambiguity here
			//await screen.findByText(spell.duration)
			//await screen.findByText(spell.distance)
		}
	})
})
