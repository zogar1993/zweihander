import React from "react"
import styled from "styled-components"

export default function RemovableItems<Key extends string, Item>({
	items,
	definitions,
	removeItem
}: RemovableItemsProps<Key, Item>) {
	const keys = Object.keys(items) as Array<Key>
	return (
		<>
			{keys.map(code => {
				const skill = definitions.find(x => x.code === code)!
				return (
					<React.Fragment key={code}>
						<span>{skill.name}</span>
						<div>
							{(items[code] as Array<Item>).map(focus => (
								<Tag onClick={() => removeItem({ item: focus, key: code })}>
									{focus}
								</Tag>
							))}
						</div>
					</React.Fragment>
				)
			})}
		</>
	)
}

type RemovableItemsProps<Key extends string, Item> = {
	items: Partial<Record<Key, Array<Item>>>
	definitions: ReadonlyArray<{ name: string; code: Key }>
	removeItem: (params: { item: Item; key: Key }) => void
}

const Tag = styled.span`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 3px 5px 3px 5px;
  margin: 2px;
`