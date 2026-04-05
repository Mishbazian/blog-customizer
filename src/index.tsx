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

	//@todo написать хук на изменение состояния формы
	// useEffect(() => {}, [isFormOpen]);

	const handleChange = (property: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setFormParamsState({ ...formParamsState, [`${property}`]: option });
		};
	};

	const handleReset = () => setArticleStyles(defaultArticleStyles);

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
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles(getUpdatedStyles());
	};

	return (
		<main className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm
				initialState={false}
				onSubmit={handleSubmit}
				onReset={handleReset}>
				<>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formParamsState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={formParamsState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={formParamsState.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={formParamsState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formParamsState.contentWidth}
						onChange={handleChange('contentWidth')}
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
