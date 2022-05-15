import { useEffect, useRef } from 'react';
import { ReactNode, useState } from 'react';
import ReactModal from 'react-modal';

interface Props {
	children: ReactNode;
	setIsOpen: () => void;
	isOpen: boolean;
}

export default function Modal({ children, setIsOpen, isOpen }: Props) {
	const [modalStatus, setModalStatus] = useState(false);
	const prevProps = usePrevious(isOpen);

	useEffect(() => {
		if (prevProps !== isOpen) {
			setModalStatus(isOpen);
		}
	}, [isOpen, prevProps]);

	function usePrevious<T>(value: T): T | undefined {
		const ref = useRef<T>();
		useEffect(() => {
			ref.current = value;
		},[value]);
		return ref.current;
	}

	return (
		<ReactModal
			shouldCloseOnOverlayClick={!false}
			onRequestClose={setIsOpen}
			isOpen={modalStatus}
			ariaHideApp={false}
			style={{
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					background: '#F0F0F5',
					color: '#000000',
					borderRadius: '8px',
					width: '736px',
					border: 'none',
				},
				overlay: {
					backgroundColor: '#121214e6',
				},
			}}
		>
			{children}
		</ReactModal>
	);
}
