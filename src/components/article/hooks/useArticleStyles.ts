import { useState } from 'react';
import { TArticleStylesSheet } from 'src/constants/articleProps';

export const useArticleStyles = (defaultArticleStyles: TArticleStylesSheet) => {
	/** Хук состояния стилей статьи */
	const [articleStyles, setArticleStyles] =
		useState<TArticleStylesSheet>(defaultArticleStyles);

	/** Сбрасывает состояниt стилей к дефолтным значениям */
	const resetStyles = () => {
		setArticleStyles(defaultArticleStyles);
	};

	/** Устанавливает полученные стили в состояние стилей статьи */
	const applyStyles = (styles: TArticleStylesSheet) => setArticleStyles(styles);

	return { articleStyles, resetStyles, applyStyles };
};
