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
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	defaultArticleStyles,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	stylesOptionsMap,
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
	const [articleStyles, setArticleStyles] =
		useState<TArticleStylesSheet>(defaultArticleStyles);

	const [formParamsState, setFormParamsState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChangeField = (property: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setFormParamsState({ ...formParamsState, [`${property}`]: option });
		};
	};

	const handleFormReset = () => {
		setArticleStyles(defaultArticleStyles);
		setFormParamsState(defaultArticleState);
	};

	//@todo вынести функцию в utils
	const getUpdatedStyles = (): TArticleStylesSheet => {
		return Object.entries(stylesOptionsMap).reduce(
			(acc, [property, option]) => {
				acc[property as TArticleStylesProperties] =
					formParamsState[option].value;
				return acc;
			},
			{ ...articleStyles }
		);
	};
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles(getUpdatedStyles());
	};

	return (
		<main className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm
				initialState={false}
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
