import { Item } from "@core/domain/Item"
import theme from "@web/theme/theme"
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
					<TagGroup key={item.code}>
						<TagGroupName>{item.name}</TagGroupName>
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
					</TagGroup>
				)
			})}
		</>
	)
}

type RemovableItemsProps = {
	items: Array<Item & { items: Array<Item> }>
	removeItem: (params: { item: string; key: string }) => void
}

const TagGroup = styled.div`
	display: flex;
	flex-direction: column;
`

const TagGroupName = styled.span`
	font-size: 26px;
	font-family: ${theme.fonts.stylish};
	text-align: center;
`

const TagContainer = styled.span`
	display: flex;
	flex-wrap: wrap;
`

const Tag = styled.span`
	border: 1px solid lightgray;
	border-radius: 4px;
	padding: 3px 5px 3px 5px;
	margin: 2px;
	user-select: none;
	cursor: pointer;
`
