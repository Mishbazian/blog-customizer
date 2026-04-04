import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEventHandler, ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/common/hooks/useOutsideClickClose';

export type TArticleParamsFormProps = {
	isOpen: boolean;
	children?: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onReset: FormEventHandler<HTMLFormElement>;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
	const onArrowBtnClick = () => setIsOpen(!isOpen);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowBtnClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={props.onSubmit}
					onReset={props.onReset}>
					{props.children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
