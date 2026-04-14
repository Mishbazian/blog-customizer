import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from './components/article-params-form';
import styles from './styles/index.module.scss';
import { defaultArticleState } from './constants/articleProps';
import { Article } from './components/article';

export const App = () => {
	/** Хук, управляющий состоянием стилей статьи */
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				applyParams={setArticleState}
				currentParams={articleState}
			/>
			<Article />
		</main>
	);
};
