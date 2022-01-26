import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import React from "react"
import styled from "styled-components"

export default function TraitCard({ trait }: SpecialRuleCardProps) {
	return (
		<Card>
			<CardTitle>{trait.name}</CardTitle>
			<Description>{trait.description}</Description>
			<PropertyList>
				<Property name="Effect">{trait.effect}</Property>
			</PropertyList>
		</Card>
	)
}

const Description = styled.p`
	font-style: italic;
	color: black;
`

const PropertyList = styled.dl`
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

type SpecialRuleCardProps = { trait: Trait }
