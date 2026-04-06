import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ElementsGroup,
	TArticleStylesSheet,
	articleParamsFormTitle,
	articleParamsMap,
	defaultArticleStyles,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { useFormFields } from './components/article-params-form/hooks/useFormFields';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	/** Хук состояния стилей статьи */
	const [articleStyles, setArticleStyles] =
		useState<TArticleStylesSheet>(defaultArticleStyles);

	/**Коллбэк для сoбытия reset формы
	 * Сбрасывает сщстояния формы и стилей к дефолтным значениям */
	const handleReset = () => {
		setArticleStyles(defaultArticleStyles);
	};

	/** Коллбэк для события submit формы
	 * устанавливает стили полученные из состояния формы в состояние стилей статьи */
	const handleSubmit = (styles: TArticleStylesSheet) =>
		setArticleStyles(styles);

	/** Хук управляющий состоянием полей формы */
	const {
		formParamsState,
		onFieldChange,
		onFormClose,
		onFormSubmit,
		onFormReset,
	} = useFormFields(articleStyles, articleParamsMap, {
		onSubmit: handleSubmit,
		onReset: handleReset,
	});

	const fieldGroups: ElementsGroup = articleParamsMap.reduce((acc, item) => {
		if (!acc[item.group]) acc[item.group] = [];
		acc[item.group].push(item);
		return acc;
	}, {} as ElementsGroup);

	return (
		<main className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm
				title={articleParamsFormTitle}
				fields={[fieldGroups.top, fieldGroups.bottom]}
				onSubmit={onFormSubmit}
				onReset={onFormReset}
				onClose={onFormClose}>
				{(group, index) => (
					<>
						{index > 0 && <Separator />}
						{group
							.sort((a, b) => a.sort - b.sort)
							.map((element) => {
								const Component = element.type;
								return (
									<Component
										key={element.name}
										title={element.title}
										options={element.options}
										selected={formParamsState[element.name]}
										name={element.name}
										onChange={onFieldChange(element.name)}
									/>
								);
							})}
					</>
				)}
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
