import { getAncestries } from "@core/actions/GetAncestries"
import { Ancestry } from "@core/domain/Ancestry"
import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function AncestriesScreen({ ancestry }: any) {
	return (
		<section>
			<h1>{ancestry.name}</h1>
			<p>{ancestry.description}</p>
			<section>
				<h2>Traits</h2>
				{ancestry.traits.map((trait: Trait) => (
					<TraitBox key={trait.name}>
						<h3>{trait.name}</h3>
						<p>{trait.description}</p>
						<p>{trait.effect}</p>
					</TraitBox>
				))}
			</section>
		</section>
	)
}

export async function getStaticProps({ params: { slug } }: any) {
	const ancestries = await getAncestries()
	return {
		props: {
			ancestry: ancestries.find(
				(ancestry: Ancestry) => ancestry.code === slug
			)!,
		},
	}
}

export async function getStaticPaths() {
	const ancestries = await getAncestries()
	const paths = ancestries.map((x: { code: string }) => ({
		params: { slug: x.code },
	}))
	return {
		paths,
		fallback: false,
	}
}

const TraitBox = styled.article`
	border: 1px solid lightgray;
	border-radius: ${theme.borders.radius};
	padding: ${theme.spacing.separation} calc(3 * ${theme.spacing.separation});
`
