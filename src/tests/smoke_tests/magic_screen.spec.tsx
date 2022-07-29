import getMagicSources from "@core/actions/GetMagicSources"
import { render } from "@testing-library/react"
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

xdescribe("MagicScreen should", () => {
	it("render all Arcanas and their spells", async () => {
		const sources = await getMagicSources()
		const source = sources.find(x => x.code === "arcana")!
		const school = source.schools.find(x => x.code === "arcana")!
		const spells = school.spells

		render(<MagicScreen source={source} school={school} spells={spells} />)

		//for (const profession of professions) {
		//	const article = screen.getByRole("article", { name: profession.name })
		//	within(article).getByText(profession.name)
		//	within(article).getByText(profession.book)
		//	within(article).getByText(profession.type)
		//	fireEvent.click(article)
		//	await screen.findByText(profession.description)
		//}
	})
})
