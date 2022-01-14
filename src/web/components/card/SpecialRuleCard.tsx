import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import { CardTitle } from "@web/components/general/CardTitle"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function SpecialRuleCard({ trait }: { trait: Trait }) {
	return (
		<TraitBox>
			<CardTitle>{trait.name}</CardTitle>
			<Description>{trait.description}</Description>
			<PropertyList>
				<Property name="Effect">{trait.effect}</Property>
			</PropertyList>
		</TraitBox>
	)
}

const TraitBox = styled.article`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	border: 1px solid lightgray;
	border-radius: ${theme.borders.radius};
	padding: ${theme.spacing.separation} calc(3 * ${theme.spacing.separation});
`

const Description = styled.p`
	font-style: italic;
	color: black;
`

const PropertyList = styled.dl`
	font-family: Arial, Times, serif;
	font-size: 16px;
	color: black;
`

function Property({ name, children }: PropertyProps) {
	return (
		<>
			<Term>{name}</Term>
			<Definition>{children}</Definition>
		</>
	)
}

const Term = styled.dt`
	display: inline-block;
	cursor: text;
	font-weight: bold;
	font-style: italic;

	:after {
		content: ": ";
		white-space: pre;
	}
`

const Definition = styled.dd`
	display: inline;
	cursor: text;

	:after {
		display: block;
		content: "";
	}
`

type PropertyProps = {
	name: string
	children: string
}
