import { getAncestries } from "@core/actions/GetAncestries"
import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import { Ancestry } from "@core/domain/Ancestry"
import { CharacterSheetData } from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet from "@core/domain/character_sheet/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { Talent } from "@core/domain/Talent"
import { store } from "@web/redux/store"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Provider } from "react-redux"
import styled from "styled-components"

export default function CharactersScreen(props: {
	character: CharacterSheetData
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
}) {
	const router = useRouter()

	useEffect(() => {
		if (router.isFallback) return
		store.dispatch({
			type: "initialize",
			payload: { ...props, character: sanitizeCharacterSheet(props.character) }
		})
	}, [props])

	const character = router.isFallback ? {} as Partial<CharacterSheetData> : props.character

	return (
		<Provider store={store}>
			<Layout>
				<Bio>
					<Field label="Name" value={character.name} />
					<AvatarContainer>
						<Avatar
							src={character.avatar || "/character/bandit.png"}
							alt="Avatar"
							width={143}
							height={143}
						/>
					</AvatarContainer>
				</Bio>
				<AttributesSection>{"mono"}</AttributesSection>
			</Layout>
		</Provider>
	)
}

//TODO may need some more love, maybe even move to csr
export async function getStaticProps({ params: { character: id } }: any) {
	const character = await getCharacterSheetOfId(id)
	const ancestries = await getAncestries()
	const talents = await getTalents()
	const professions = await getProfessions()
	const schools = await getMagicSchools()
	return {
		props: {
			character,
			ancestries,
			talents,
			professions,
			schools
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true
	}
}

export const BLOCK_WIDTH = "255px"
export const DESKTOP_MAX_WIDTH = `calc((${BLOCK_WIDTH} * 4) + (${theme.spacing.separation} * 3))`
//TODO SWR
const Layout = styled.div`
  display: grid;
  width: ${DESKTOP_MAX_WIDTH};
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.separation};
  grid-template-areas:
		"bio peril-tracker damage-tracker misc"
		"attributes skills skills misc";

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    grid-template-areas:
			"bio"
			"peril-tracker"
			"damage-tracker"
			"attributes"
			"skills"
			"misc";
  }
`

const Bio = styled.div`
  grid-area: bio;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.separation};
`
const AttributesSection = styled.div`
  grid-area: attributes;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.separation};
`

const Avatar = styled(Image)`
  border-radius: ${theme.borders.radius};
  width: 143px;
  height: 143px;
`

const AvatarContainer = styled.div`
  display: flex;
`
