import { getMagicSources } from "@core/actions/GetMagicSources"
import { MagicSource } from "@core/domain/MagicSource"
import ButtonsGroup from "@web/components/general/ButtonsGroup"
import SpellCards from "@web/components/magic/SpellCards"
import theme from "@web/theme/theme"
import React, { useState } from "react"
import styled from "styled-components"
import { SEPARATION } from "../ancestries/[slug]"

export default function MagicSourceScreen({ source }: { source: MagicSource }) {
	const [school, setSchool] = useState(source.schools[0])

	return (
		<SourceContainer>
			<Title>{source.name}</Title>
			{source.schools.length > 1 && (
				<ButtonsGroup
					items={source.schools}
					selected={school}
					onChange={setSchool}
				/>
			)}
			<SpellCards spells={school.spells} />
		</SourceContainer>
	)
}

export async function getStaticProps({ params: { slug } }: any) {
	const sources = await getMagicSources()
	return {
		props: {
			source: sources.find(x => x.code === slug)!,
		},
	}
}

export async function getStaticPaths() {
	const sources = await getMagicSources()
	const paths = sources.map((x: { code: string }) => ({
		params: { slug: x.code },
	}))
	return {
		paths,
		fallback: false,
	}
}

const Title = styled.h3`
	font-size: 34px;
	text-align: center;
	color: black;
	text-transform: capitalize;
	font-family: ${theme.fonts.title};
`

const SourceContainer = styled.h3`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: ${SEPARATION};
`

//TODO order by petty to greater
//TODO fix generalist getting state of other source