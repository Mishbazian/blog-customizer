import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEventHandler, ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/common/hooks/useOutsideClickClose';
import { useDisclosure } from 'src/common/hooks/useDisclosure';

export type TArticleParamsFormProps = {
	initialState?: boolean;
	children?: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onReset: FormEventHandler<HTMLFormElement>;
	onClose?: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	children,
	onSubmit,
	onReset,
	onClose,
}: TArticleParamsFormProps) => {
	const { isOpen, toggle } = useDisclosure(initialState, { onClose });
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: toggle,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={rootRef}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
