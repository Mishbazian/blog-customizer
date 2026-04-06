import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/common/hooks/useOutsideClickClose';
import { useDisclosure } from 'src/common/hooks/useDisclosure';
import { Text } from 'src/ui/text';

export type TArticleParamsFormProps<T> = {
	title: string;
	fields: T[];
	children: (item: T, index: number) => ReactNode;
	initialOpen?: boolean;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onReset: (e: FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
};

export const ArticleParamsForm = <T,>({
	title,
	fields,
	children,
	initialOpen = false,
	onSubmit,
	onReset,
	onClose,
}: TArticleParamsFormProps<T>) => {
	const { isOpen, toggle, change } = useDisclosure(initialOpen, {
		onClose,
	});
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: change,
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
					<Text as={'h2'} size={31} weight={800} uppercase>
						{title}
					</Text>
					{fields.map((item, index) => children(item, index))}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
