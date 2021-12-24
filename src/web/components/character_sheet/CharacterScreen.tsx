import theme from "@web/theme/theme"
import styled from "styled-components"

export default function CharacterScreen({ id }: Props) {
	return <Layout></Layout>
}

type Props = {
	id: string
}
//TODO SWR, BUTTON LINKS
const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${theme.spacing.separation};
	grid-template-areas:
		"bio peril-tracker damage-tracker misc"
		"attributes skills skills misc";

	@media (max-width: 768px) {
		grid-template-columns: minmax(0, 1fr);
		width: 100%;
		grid-template-areas:
			"bio"
			"peril-tracker"
			"damage-tracker"
			"attributes"
			"skills"
			"misc";
	}
`
//width: ${DESKTOP_MAX_WIDTH};
