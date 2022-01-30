import Grid from "@web/components/general/Grid"
import Link from "@web/components/general/Link"
import theme from "@web/theme/theme"
import Image from "next/image"
import React from "react"
import styled, { css } from "styled-components"

export default function CharactersScreen({
	characters
}: CharactersScreenProps) {
	return (
		<Grid columns={5} mobile-columns={1}>
			{characters === undefined
				? Array.from({ length: 20 }, (_, i) => <Skeleton key={i.toString()} />)
				: characters.map(character => (
						<Card href={`characters/${character.id}`} key={character.id}>
							<CardTitle>{character.name || "unnamed"}</CardTitle>
							<CardBody>
								<Avatar
									src={character.avatar || "/character/bandit.png"}
									alt="Avatar"
									width={70}
									height={70}
								/>
								<CardInfo>
									<CardInfoLine>{character.ancestry}</CardInfoLine>
									<CardInfoLine>{character.profession1}</CardInfoLine>
									<CardInfoLine>{character.profession2}</CardInfoLine>
									<CardInfoLine>{character.profession3}</CardInfoLine>
								</CardInfo>
							</CardBody>
						</Card>
				  ))}
		</Grid>
	)
}

const Card = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	height: 120px;
	padding: 10px;
	border: solid 1px ${theme.colors.border};
	border-radius: ${theme.borders.radius};

	user-select: none;
	cursor: pointer;
`

const CardBody = styled.div`
	display: flex;
	gap: ${theme.spacing.separation};
`

const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const CardInfoLine = styled.span`
	font-family: ${theme.fonts.handwritten};
	color: ${theme.colors.text};
`

const CardTitle = styled.span`
	font-family: ${theme.fonts.stylish};
	font-size: 20px;
	text-align: center;
	color: ${theme.colors.text};
`

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
`

export type CharactersScreenProps = {
	characters: Array<CharacterSheetTag>
}

type CharacterSheetTag = {
	id: string
	name: string
	avatar: string | null
	ancestry: string
	profession1: string
	profession2: string
	profession3: string
}

export const SKELETON_ANIMATION_CSS = css`
	cursor: wait;
	background-image: linear-gradient(
		-45deg,
		gainsboro 40%,
		white 50%,
		gainsboro 60%
	);
	animation: moving-box 1s reverse infinite;
	animation-timing-function: linear;
	background-size: 350% 350%;
	@keyframes moving-box {
		from {
			background-position: -30%;
		}
		to {
			background-position: 130%;
		}
	}
`

const Skeleton = styled.div`
	${SKELETON_ANIMATION_CSS};
	border-radius: ${theme.borders.radius};
	height: 120px;
`
