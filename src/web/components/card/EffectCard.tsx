import { SpecialRule } from "@core/domain/character_sheet/CharacterSheet"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import React from "react"
import styled from "styled-components"

export default function EffectCard({ trait, onClick }: SpecialRuleCardProps) {
	return (
		<Card>
			<CardTitle onClick={onClick}>{trait.name}</CardTitle>
			<Effect>{trait.effect}</Effect>
		</Card>
	)
}

const Effect = styled.p`
	display: inline;
	cursor: text;
`

type SpecialRuleCardProps = { trait: SpecialRule; onClick?: () => void }
