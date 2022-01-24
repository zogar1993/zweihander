import { Item } from "@core/domain/Item"
import React from "react"
import styled from "styled-components"

export default function RemovableItems({
	items,
	removeItem
}: RemovableItemsProps) {
	return (
		<>
			{items.map(item => {
				return (
					<React.Fragment key={item.code}>
						<span>{item.name}</span>
						<TagContainer>
							{item.items.map(sub => (
								<Tag
									onClick={() => removeItem({ item: sub.code, key: item.code })}
									key={sub.code}
								>
									{sub.name}
								</Tag>
							))}
						</TagContainer>
					</React.Fragment>
				)
			})}
		</>
	)
}

type RemovableItemsProps = {
	items: Array<Item & { items: Array<Item> }>
	removeItem: (params: { item: string; key: string }) => void
}

const TagContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.span`
	border: 1px solid lightgray;
	border-radius: 4px;
	padding: 3px 5px 3px 5px;
	margin: 2px;
`
