import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterJournal from "@web/components/character_sheet/hooks/update/useSetCharacterJournal"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

export default function CharacterSheetJournal() {
	const { character: { journal } } = useCharacterSheetState()
	const setJournal = useSetCharacterJournal()
	const [text, setText] = useState(journal)
	const ref = useRef<HTMLTextAreaElement>(null)
	const isOwner = useIsCharacterSheetOwner()

	const resize = useCallback(() => {
		ref.current!.style.height = "inherit" //important to shrink on delete
		ref.current!.style.height = `${ref.current!.scrollHeight}px`
	}, [])

	useEffect(() => {
		resize()
	}, [text])

	useEffect(() => {
		setText(journal)
	}, [journal])

	return (
		<TextArea
			aria-label="Journal"
			ref={ref}
			value={text}
			onChange={e => setText(e.target.value)}
			onBlur={() => setJournal(text)}
			disabled={!isOwner}
		/>
	)
}

const TextArea = styled.textarea`
  outline: none;
  resize: none;
  width: 100%;
  min-height: 45px;
  height: unset;
  padding: ${theme.spacing.separation};
  border-radius: ${theme.borders.radius};
`
