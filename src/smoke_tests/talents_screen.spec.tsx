import getTalents from "@core/actions/GetTalents"
import { render, screen, within } from "@testing-library/react"
import TalentsScreen from "@web/components/talents/TalentsScreen"

describe("TalentsScreen should", () => {
	it("render completely", async () => {
		const talents = await getTalents()
		render(<TalentsScreen talents={talents} />)

		for (const talent of talents) {
			const article = screen.getByRole("article", { name: talent.name })
			within(article).getByText(talent.name)
			within(article).getByText(talent.effect)
			within(article).getByText(talent.description)
		}
	})
})
