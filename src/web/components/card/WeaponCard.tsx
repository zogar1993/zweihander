import { Weapon } from "@core/domain/types/Weapon"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import React from "react"
import styled from "styled-components"


export default function WeaponCard({ weapon }: SpecialRuleCardProps) {
	return (
		<Card aria-label={weapon.name}>
			<CardTitle>{weapon.name}</CardTitle>
			<Description>{weapon.description}</Description>
			<PropertyList>
				<Property name="load">{weapon.load}</Property>
				<Property name="handling">{weapon.handling}</Property>
				<Property name="distance">{weapon.distance}</Property>
				<Property name="qualities">{weapon.qualities}</Property>
				<Property name="type">{weapon.type}</Property>
				<Property name="encumbrance">{weapon.encumbrance}</Property>
				<Property name="price">{weapon.price}</Property>
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

type SpecialRuleCardProps = { weapon: Weapon }