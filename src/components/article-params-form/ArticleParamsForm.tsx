import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { CSSProperties, Fragment, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/common/hooks/useOutsideClickClose';
import { useDisclosure } from 'src/common/hooks/useDisclosure';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	articleParamsFormTitle,
	articleParamsMap,
} from 'src/constants/articleProps';
import { useForm } from '../../common/hooks/useForm';

export type TArticleParamsFormProps = {
	initialOpen?: boolean;
	currentParams: ArticleStateType;
	applyParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const { initialOpen = false, currentParams, applyParams } = props;

	const formStyles: CSSProperties = { gap: 50 };

	const {
		selectedParams,
		handleChange,
		handleCancel,
		handleReset,
		handleSubmit,
	} = useForm<ArticleStateType>(currentParams, applyParams);

	const { isOpen, toggle, change } = useDisclosure(initialOpen, {
		onClose: handleCancel,
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
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					style={formStyles}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						{articleParamsFormTitle}
					</Text>
					{articleParamsMap.map((group, index) => (
						<Fragment key={index}>
							{index > 0 && <Separator />}
							{group.map((element) => {
								const Field = element.type;
								return (
									<Field
										key={element.name}
										title={element.title}
										options={element.options}
										selected={selectedParams[element.name]}
										name={element.name}
										onChange={(option) =>
											handleChange({
												[element.name]: option,
											})
										}
									/>
								);
							})}
						</Fragment>
					))}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
