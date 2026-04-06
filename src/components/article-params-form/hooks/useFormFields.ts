import { FormEvent, useEffect, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	PropertyMap,
	TArticleStylesProperties,
	TArticleStylesSheet,
	defaultArticleState,
} from 'src/constants/articleProps';

export type FormCallbacks = {
	onSubmit: (styles: TArticleStylesSheet) => void;
	onReset: () => void;
};

export const useFormFields = (
	initialStyles: TArticleStylesSheet,
	paramsMap: PropertyMap,
	{ onSubmit, onReset }: FormCallbacks
) => {
	const [styles, setStyles] = useState<TArticleStylesSheet>(initialStyles);

	/** Хук состояния полей формы */
	const [formParamsState, setFormParamsState] =
		useState<ArticleStateType>(defaultArticleState);

	/** Получает набор выбранных опций для полей формы на основе текущего состояния стилей статьи */
	const getCurrentOptions = (styles: TArticleStylesSheet): ArticleStateType => {
		return paramsMap.reduce(
			(acc, { name, property, options }) => {
				acc[name] =
					options?.find((opt) => opt.value === styles[property]) ??
					formParamsState[name];
				return acc;
			},
			{ ...formParamsState }
		);
	};
	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(getUpdatedStyles());
	};

	const onFormReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onReset();
	};
	/** Получает набор стилей для стати из состояния полей формы */
	const getUpdatedStyles = (): TArticleStylesSheet => {
		return paramsMap.reduce(
			(acc, { name, property }) => {
				acc[property as TArticleStylesProperties] = formParamsState[name].value;
				return acc;
			},
			{ ...styles }
		);
	};

	/** Коллбэк для события закрытия формы
	 * сбрасывает состояние полей формы к текущему состоянию стилей статьи
	 */
	const onFormClose = () => {
		setFormParamsState(getCurrentOptions(initialStyles));
	};
	/** Меняет выбранную опцию в состоянии полей формы */
	const onFieldChange = (property: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setFormParamsState({ ...formParamsState, [`${property}`]: option });
		};
	};

	useEffect(() => {
		if (initialStyles !== styles) {
			setStyles(initialStyles);
			setFormParamsState(getCurrentOptions(initialStyles));
		}
	}, [initialStyles]);

	return {
		formParamsState,
		onFieldChange,
		onFormClose,
		onFormSubmit,
		onFormReset,
	};
};
