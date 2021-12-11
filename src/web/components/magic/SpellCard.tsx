import { Spell } from "@core/domain/Spell"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function SpellCard({ spell }: Props) {
	return (
		<Section>
			<Title>{spell.name}</Title>
			<TagContainer>
				<Tag>{spell.school}</Tag>
				<Tag>{spell.principle}</Tag>
				<Tag>{spell.distance_tag}</Tag>
			</TagContainer>
			<Paragraph>{spell.description}</Paragraph>
		</Section>
	)
}

type Props = {
	spell: Spell
}

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};

	border: 1px solid lightgray;
	border-radius: ${theme.borders.radius};
	padding: ${theme.spacing.separation} calc(3 * ${theme.spacing.separation});
	min-width: 200px;

	user-select: none;
	cursor: pointer;
`

const TagContainer = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
`

const Tag = styled.span`
	border: 1px solid lightgray;
	border-radius: 4px;
	padding: 3px 5px 3px 5px;
	margin: 2px;
`

const Paragraph = styled.p`
	color: black;
`

const Title = styled.h5`
	font-family: ${theme.fonts.title};
	font-size: 26px;
	text-align: center;
	color: black;
	text-transform: capitalize;
`
