import { CharacterPreview } from "@core/domain/types/CharacterPreview"
import createCharacter from "@web/api_calls/CreateCharacter"
import Button from "@web/components/general/Button"
import Grid from "@web/components/general/Grid"
import Link from "@web/components/general/Link"
import { useSetLoadingModal } from "@web/components/redirect_loaders/LoadingModalContext"
import theme from "@web/theme/theme"
import { SKELETON_ANIMATION_CSS } from "misevi"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"

export default function CharactersScreen({
	characters
}: CharactersScreenProps) {
	const router = useRouter()
	const setLoading = useSetLoadingModal()
	const create = async () => {
		setLoading(true)
		const path = await createCharacter()
		await router.push(path)
		setLoading(false)
	}

	return (
		<>
			<Button onClick={create}>Create Character</Button>
			<Grid columns={4} mobile-columns={1}>
				{characters === undefined
					? Array.from({ length: 20 }, (_, i) => (
							<Skeleton key={i.toString()} />
					  ))
					: characters.map(character => (
							<Card href={`characters/${character.id}`} key={character.id}>
								<CardTitle>{character.name || "unnamed"}</CardTitle>
								<CardBody>
									<Avatar
										src={character.avatar || "/characters/bandit.png"}
										alt="Avatar"
										width={70}
										height={70}
									/>
									<CardInfo>
										<CardInfoLine>{character.ancestry}</CardInfoLine>
										<CardInfoLine>{character.profession1}</CardInfoLine>
										{character.visibility === "private" && <CardInfoLine>{character.visibility}</CardInfoLine>}
									</CardInfo>
								</CardBody>
							</Card>
					  ))}
			</Grid>
		</>
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
	font-family: ${theme.fonts.title};
	font-size: 20px;
	text-align: center;
	color: ${theme.colors.text};
`

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
`

export type CharactersScreenProps = {
	characters: ReadonlyArray<CharacterPreview> | undefined
}

const Skeleton = styled.div`
	${SKELETON_ANIMATION_CSS};
	border-radius: ${theme.borders.radius};
	height: 120px;
`
