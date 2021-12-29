import { getCharacters } from "@core/actions/GetCharacters"
import Grid from "@web/components/general/Grid"
import Link from "@web/components/general/Link"
import theme from "@web/theme/theme"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function CharactersScreen({
	characters
}: {
	characters: Array<CharacterSheetTag>
}) {
	return (
		<Grid columns={5} mobile-columns={1}>
			{characters.map(character => (
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

export async function getServerSideProps() {
	const characters = await getCharacters()
	return {
		props: {
			characters
		}
	}
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
`

const CardTitle = styled.span`
  font-family: ${theme.fonts.stylish};
  font-size: 20px;
  text-align: center;
`

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
`

type CharacterSheetTag = {
	id: string
	name: string
	avatar: string | null
	ancestry: string
	profession1: string
	profession2: string
	profession3: string
}
