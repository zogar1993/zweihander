import { getMagicSources } from "@core/actions/GetMagicSources"
import ButtonsGroup from "@web/components/general/ButtonsGroup"
import {
	MagicSourceScreenProps,
	SourceContainer,
	Title
} from "@web/components/magic/MagicSourceScreen"
import SpellCards from "@web/components/magic/SpellCards"
import { useRouter } from "next/router"
import React from "react"

export default function ({ source, school }: MagicSourceScreenProps) {
	const router = useRouter()
	return (
		<SourceContainer>
			<Title>{source.name}</Title>
			{source.schools.length > 1 && (
				<ButtonsGroup
					items={source.schools}
					selected={school}
					onChange={school => {
						router.push(`/magic/${source.code}/${school.code}`)
					}}
				/>
			)}
			<SpellCards spells={school.spells} />
		</SourceContainer>
	)
}

export async function getStaticProps({ params: { source: sourceCode } }: any) {
	const sources = await getMagicSources()
	const source = sources.find(x => x.code === sourceCode)!
	return { props: { source, school: source.schools[0] } }
}

export async function getStaticPaths() {
	const sources = await getMagicSources()
	const paths = sources.map(source => ({ params: { source: source.code } }))
	return { paths, fallback: false }
}
