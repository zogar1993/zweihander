import getAncestries from "@core/actions/GetAncestries"
import { Ancestry } from "@core/domain/Ancestry"
import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import SpecialRuleCard from "@web/components/card/SpecialRuleCard"
import Grid from "@web/components/general/Grid"
import { PageTitle } from "@web/components/general/PageTitle"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function AncestriesScreen({ ancestry }: any) {
	return (
		<>
			<PageTitle>{ancestry.name}</PageTitle>
			<Paragraph>{ancestry.description}</Paragraph>
			<section>
				<SubSectionTitle>Traits</SubSectionTitle>
				<Grid columns={3} mobile-columns={1}>
					{ancestry.traits.map((trait: Trait) => (
						<SpecialRuleCard key={trait.name} trait={trait} />
					))}
				</Grid>
			</section>
		</>
	)
}

export async function getStaticProps({
	params: { ancestry: ancestryCode }
}: any) {
	const ancestries = await getAncestries()
	return {
		props: {
			ancestry: ancestries.find(
				(ancestry: Ancestry) => ancestry.code === ancestryCode
			)!
		}
	}
}

export async function getStaticPaths() {
	const ancestries = await getAncestries()
	const paths = ancestries.map((x: { code: string }) => ({
		params: { ancestry: x.code }
	}))
	return {
		paths,
		fallback: false
	}
}

const Paragraph = styled.p`
	color: black;
`
export const SubSectionTitle = styled.h3`
	font-size: 26px;
	text-align: center;
	color: black;
	text-transform: capitalize;
	font-family: ${theme.fonts.title};
`
