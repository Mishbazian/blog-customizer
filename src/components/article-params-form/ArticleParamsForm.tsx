import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEventHandler, ReactNode, useState } from 'react';
import clsx from 'clsx';

export type TArticleParamsFormProps = {
	isOpen: boolean;
	children?: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onReset: FormEventHandler<HTMLFormElement>;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(props.isOpen);
	const onArrowBtnClick = () => setIsOpen(!isOpen);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowBtnClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
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
