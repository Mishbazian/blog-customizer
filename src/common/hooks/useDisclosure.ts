import { useState, useEffect } from 'react';
type TCb = {
	onOpen?: () => void;
	onClose?: () => void;
};
export function useDisclosure(
	initialState = false,
	{ onOpen, onClose }: TCb = {}
) {
	const [state, setState] = useState(initialState);
	const [isOpen, setIsOpen] = useState(state);

	const open = () => {
		setIsOpen(true);
		onOpen?.();
	};
	const close = () => {
		setIsOpen(false);
		onClose?.();
	};
	const toggle = () => {
		if (!isOpen) {
			open();
		} else {
			close();
		}
	};
	const change = (newValue: boolean) => {
		if (newValue !== isOpen) {
			setIsOpen(newValue);
			(newValue && open()) || close();
		}
	};
	useEffect(() => {
		if (initialState !== state) {
			setState(initialState);
		}
	}, [initialState]);

	return { isOpen, toggle, open, close, change };
}
