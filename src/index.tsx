import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	TArticleStylesProperties,
	TArticleStylesSheet,
	articleStylesPropertyMap,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	defaultArticleStyles,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { Text } from './ui/text';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	/** Хук состояния стилей статьи */
	const [articleStyles, setArticleStyles] =
		useState<TArticleStylesSheet>(defaultArticleStyles);
	/** Хук состояния полей формы */
	const [formParamsState, setFormParamsState] =
		useState<ArticleStateType>(defaultArticleState);
	/** Получает набор стилей для стати из состояния полей формы */
	const getUpdatedStyles = (): TArticleStylesSheet => {
		return articleStylesPropertyMap.reduce(
			(acc, { name, property }) => {
				acc[property as TArticleStylesProperties] = formParamsState[name].value;
				return acc;
			},
			{ ...articleStyles }
		);
	};
	/** Получает набор выбранных опций для полей формы на основе текущего состояния стилей статьи */
	const getCurrentOptions = (): ArticleStateType => {
		return articleStylesPropertyMap.reduce(
			(acc, { name, property, options }) => {
				acc[name] =
					options?.find((opt) => opt.value === articleStyles[property]) ??
					formParamsState[name];
				console.log('acc', articleStyles[property]);
				return acc;
			},
			{ ...formParamsState }
		);
	};
	/** Меняет выбранную опцию в состоянии полей формы */
	const handleChangeField = (property: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setFormParamsState({ ...formParamsState, [`${property}`]: option });
		};
	};
	/**Коллбэк длясщбытия reset формы
	 * Сбрасывает сщстояния формы и стилей к дефолтным значениям */
	const handleFormReset = () => {
		setArticleStyles(defaultArticleStyles);
		setFormParamsState(defaultArticleState);
	};
	/** Коллбэк для события закрытия формы
	 * сбрасывает состояние полей формы к текущему состоянию стилей статьи
	 */
	const handleFormClose = () => {
		setFormParamsState(getCurrentOptions());
	};
	/** Коллбэк для события submit формы
	 * устанавливает стили полученные из состояния формы в состояние стилей статьи */
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles(getUpdatedStyles());
	};

	return (
		<main className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm
				initialState={false}
				onClose={handleFormClose}
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}>
				<>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formParamsState.fontFamilyOption}
						onChange={handleChangeField('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={formParamsState.fontSizeOption}
						onChange={handleChangeField('fontSizeOption')}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={formParamsState.fontColor}
						onChange={handleChangeField('fontColor')}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={formParamsState.backgroundColor}
						onChange={handleChangeField('backgroundColor')}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formParamsState.contentWidth}
						onChange={handleChangeField('contentWidth')}
					/>
				</>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
