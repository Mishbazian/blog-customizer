import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEventHandler, ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/common/hooks/useOutsideClickClose';

export type TArticleParamsFormProps = {
	isOpen: boolean;
	children?: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onReset: FormEventHandler<HTMLFormElement>;
	onChange: (isOpen: boolean) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	children,
	onSubmit,
	onReset,
	onChange,
}: TArticleParamsFormProps) => {
	const onArrowBtnClick = () => {
		onChange(!isOpen);
	};
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: onChange,
	});
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowBtnClick} />
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
