export default function newMessageQueue({ pass }: { pass: string }) {
	const obj = {
		pass: pass,
		queue: [],
		locked: false
	} as unknown as MessageQueue
	obj.push = async action => {
		obj.queue.push(action)
		if (!obj.locked) {
			obj.locked = true
			while (obj.queue.length) {
				const action = obj.queue.shift() as Message
				obj.pass = await action(obj.pass)
			}
			obj.locked = false
		}
	}
	return obj
}

export type MessageQueue = {
	locked: boolean
	pass: string
	push: (action: Message) => void
	queue: Array<Message>
}

type Message = (pass: string) => Promise<string>
