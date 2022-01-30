import React, { ReactNode, useCallback, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import Dialog from "./Dialog"
import Title from "./Title"

export default function ItemsModal<T extends Item>({
	render,
	item,
	items,
	navigate,
	children
}: Props<T>) {
	const [leaving, setLeaving] = useState<{
		item: T
		direction: "up" | "left" | "right"
	} | null>(null)

	const direction = leaving?.direction || "none"
	const id = animationId(leaving?.item.code || "")
	const inAnimation = IN_ANIMATIONS[direction](id)
	const outAnimation = OUT_ANIMATIONS[direction](id)

	const show = useCallback(
		(item: T) => {
			navigate(item.code)
			setLeaving(null)
		},
		[navigate]
	)

	const hide = useCallback(() => {
		if (item === null) return
		navigate()
		setLeaving({ item, direction: "up" })
	}, [item, navigate])

	const previous = useCallback(
		(item: T) => {
			const index = items.indexOf(item)
			if (index === -1 || index === 0) return
			setLeaving({ item, direction: "left" })
			navigate(items[index - 1].code)
		},
		[items, navigate]
	)

	const next = useCallback(
		(item: T) => {
			const index = items.indexOf(item)
			if (index === -1 || index === items.length - 1) return
			setLeaving({ item, direction: "right" })
			navigate(items[index + 1].code)
		},
		[items, navigate]
	)

	useEffect(() => {
		const handleOnKeyDown = (e: any) => {
			if (item === null) return
			switch (e.key) {
				case "ArrowLeft":
					previous(item)
					e.preventDefault()
					break
				case "ArrowRight":
					next(item)
					e.preventDefault()
					break
				case "Escape":
					hide && hide()
					e.preventDefault()
					break
			}
		}

		document.body.addEventListener("keydown", handleOnKeyDown)
		return () => document.body.removeEventListener("keydown", handleOnKeyDown)
	}, [previous, next, hide, item])

	return (
		<>
			{children(show)}
			<Dialog active={item !== null}>
				<Background onClick={hide} show={item !== null} />
				{item ? (
					<Card item={item} animation={inAnimation} render={render} />
				) : null}
				{leaving ? (
					<Card item={leaving.item} animation={outAnimation} render={render} />
				) : null}
			</Dialog>
		</>
	)
}

type Props<T> = {
	onClose?: () => void
	render: (item: T) => ReactNode
	item: T | null
	items: Array<T>
	navigate: (path?: string) => void
	children: (show: (item: T) => void) => ReactNode
}

const Background = styled.div<{ show: boolean }>`
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	background-color: rgba(10, 10, 10, 0.86);
	opacity: ${({ show }) => (show ? 1 : 0)};
	transition: ${({ show }) => (show ? "ease-out" : "ease-in")} 0.4s;
`

const ModalCard = styled.div<{ animation?: string }>`
	display: flex;
	flex-direction: column;
	position: absolute;
	max-width: 80vw;
	max-height: 80vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
	}
	${({ animation }) => animation || ""};
`

const ModalHeader = styled.header`
	background-color: lightgrey;
	min-height: 25px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	padding: 10px;
`

const ModalBody = styled.div`
	background-color: white;
	padding: 10px;
	max-height: 75vh;
	overflow-y: auto;
	overflow-x: hidden;
`

const ModalFooter = styled.footer`
	background-color: lightgrey;
	min-height: 15px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 10px;
`

function Card<T extends Item>({ item, render, animation }: CardProps<T>) {
	return (
		<ModalCard animation={animation}>
			<ModalHeader>
				<Title font="Almendra SC">{item?.name}</Title>
			</ModalHeader>
			<ModalBody>{render(item)}</ModalBody>
			<ModalFooter />
		</ModalCard>
	)
}

type CardProps<T> = { item: T; render: (item: T) => ReactNode; animation: any }

const animationId = (value: string) =>
	value
		.split("")
		.map(x => x.charCodeAt(0))
		.join("")

type Item = {
	code: string
	name: string
}

const bounceInTop = () => css`
	animation: bounce-in-top 0.8s both;
	@keyframes bounce-in-top {
		0% {
			transform: translateY(-100vh);
			animation-timing-function: ease-in;
			opacity: 0;
		}
		38% {
			transform: translateY(0);
			animation-timing-function: ease-out;
			opacity: 1;
		}
		55% {
			transform: translateY(-13vh);
			animation-timing-function: ease-in;
		}
		72% {
			transform: translateY(0);
			animation-timing-function: ease-out;
		}
		81% {
			transform: translateY(-6vh);
			animation-timing-function: ease-in;
		}
		93% {
			transform: translateY(0);
			animation-timing-function: ease-out;
		}
		97% {
			transform: translateY(-1.2vh);
			animation-timing-function: ease-in;
		}
		100% {
			transform: translateY(0);
			animation-timing-function: ease-out;
		}
	}
`

const slideOutTop = () => css`
	animation: slide-out-top 0.3s both;
	@keyframes slide-out-top {
		from {
			transform: translateY(0);
			animation-timing-function: ease-in;
		}
		to {
			transform: translateY(-100vh);
		}
	}
`

const slideInRight = (id: string) => css`
	animation: slide-in-right-${id} 0.3s both;
	@keyframes slide-in-right-${id} {
		from {
			transform: translateX(-100vw);
			animation-timing-function: ease-in;
		}
		to {
			transform: translateX(0);
		}
	}
`

const slideInLeft = (id: string) => css`
	animation: slide-in-left-${id} 0.3s both;
	@keyframes slide-in-left-${id} {
		from {
			transform: translateX(100vw);
			animation-timing-function: ease-in;
		}
		to {
			transform: translateX(0);
		}
	}
`

const slideOutLeft = (id: string) => css`
	animation: slide-out-left-${id} 0.3s both;
	@keyframes slide-out-left-${id} {
		from {
			transform: translateX(0);
			animation-timing-function: ease-in;
		}
		to {
			transform: translateX(-100vw);
		}
	}
`

const slideOutRight = (id: string) => css`
	animation: slide-out-right-${id} 0.3s both;
	@keyframes slide-out-right-${id} {
		from {
			transform: translateX(0);
			animation-timing-function: ease-in;
		}
		to {
			transform: translateX(100vw);
		}
	}
`

const IN_ANIMATIONS = {
	none: bounceInTop,
	left: slideInRight,
	right: slideInLeft,
	up: () => ""
}

const OUT_ANIMATIONS = {
	none: () => "",
	left: slideOutRight,
	right: slideOutLeft,
	up: () => slideOutTop
}
