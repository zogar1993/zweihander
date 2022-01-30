import { Spell } from "@core/domain/Spell"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function SpellCard({ spell, onClick }: Props) {
	return (
		<CardContainer onClick={onClick}>
			<CardTitle>{spell.name}</CardTitle>
			<TagContainer>
				<Tag>{spell.school}</Tag>
				<Tag>{spell.principle}</Tag>
				<Tag>{spell.distance_tag}</Tag>
			</TagContainer>
			<Paragraph>{spell.description}</Paragraph>
		</CardContainer>
	)
}

type Props = {
	spell: Spell
	onClick: () => void
}

const CardContainer = styled(Card)`
	min-width: 200px;
`

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing.separation};
`

const Tag = styled.span`
	border: 1px solid lightgray;
	border-radius: 4px;
	padding: 3px 5px 3px 5px;
`

const Paragraph = styled.p`
	color: black;
`
