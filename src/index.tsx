import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { Text } from './ui/text';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//@todo вынести типы и константы в constants
	const defaultArticleStyles: TArticleStylesSheet = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};
	type TArticleStylesProperties =
		| '--font-family'
		| '--font-size'
		| '--font-color'
		| '--container-width'
		| '--bg-color';

	type TArticleStylesSheet = Record<TArticleStylesProperties, string>;

	const stylesOptionsMap: Record<
		TArticleStylesProperties,
		keyof ArticleStateType
	> = {
		'--font-family': 'fontFamilyOption',
		'--font-size': 'fontSizeOption',
		'--font-color': 'fontColor',
		'--container-width': 'contentWidth',
		'--bg-color': 'backgroundColor',
	};

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

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
				isOpen={isFormOpen}
				onChange={(isOpen: boolean) => setIsFormOpen(isOpen)}
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
					{/* @todo добавить остальные поля настройки параметров */}
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
