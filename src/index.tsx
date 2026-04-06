import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Separator } from './ui/separator';

import {
	ElementsGroup,
	articleParamsFormTitle,
	articleParamsMap,
	defaultArticleStyles,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { useFormFields } from './components/article-params-form/hooks/useFormFields';
import { useArticleStyles } from './components/article/hooks/useArticleStyles';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	/** Хук, управляющий состоянием стилей статьи */
	const { articleStyles, resetStyles, applyStyles } =
		useArticleStyles(defaultArticleStyles);

	/** Хук управляющий состоянием полей формы */
	const {
		formParamsState,
		onFieldChange,
		onFormClose,
		onFormSubmit,
		onFormReset,
	} = useFormFields(articleStyles, articleParamsMap, {
		onSubmit: applyStyles,
		onReset: resetStyles,
	});
	/** Массив сгруппированных по признаку group данные полей формы */
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
