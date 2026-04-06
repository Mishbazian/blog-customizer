import { FunctionComponent } from 'react';
import { RadioGroup, RadioGroupProps } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select';
import { SelectProps } from 'src/ui/select/Select';

export const fontFamilyClasses = [
	'open-sans',
	'ubuntu',
	'cormorant-garamond',
	'days-one',
	'merriweather',
] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

export type OptionType = {
	title: string;
	value: string;
	className: string;
	optionClassName?: string;
};

export const fontFamilyOptions: OptionType[] & {
	optionClassName?: FontFamiliesClasses;
} = [
	{ title: 'Open Sans', value: 'Open Sans', className: fontFamilyClasses[0] },
	{ title: 'Ubuntu', value: 'Ubuntu', className: fontFamilyClasses[1] },
	{
		title: 'Cormorant Garamond',
		value: 'Cormorant Garamond',
		className: fontFamilyClasses[2],
	},
	{ title: 'Days One', value: 'Days One', className: fontFamilyClasses[3] },
	{
		title: 'Merriweather',
		value: 'Merriweather',
		className: fontFamilyClasses[4],
	},
];

export const fontColors: OptionType[] = [
	{
		title: 'Черный',
		value: '#000000',
		className: 'font-black',
		optionClassName: 'option-black',
	},
	{
		title: 'Белый',
		value: '#FFFFFF',
		className: 'font-white',
		optionClassName: 'option-white',
	},
	{
		title: 'Серый',
		value: '#C4C4C4',
		className: 'font-gray',
		optionClassName: 'option-gray',
	},
	{
		title: 'Розовый',
		value: '#FEAFE8',
		className: 'font-pink',
		optionClassName: 'option-pink',
	},
	{
		title: 'Ярко-розовый',
		value: '#FD24AF',
		className: 'font-fuchsia',
		optionClassName: 'option-fuchsia',
	},
	{
		title: 'Жёлтый',
		value: '#FFC802',
		className: 'font-yellow',
		optionClassName: 'option-yellow',
	},
	{
		title: 'Зелёный',
		value: '#80D994',
		className: 'font-green',
		optionClassName: 'option-green',
	},
	{
		title: 'Голубой',
		value: '#6FC1FD',
		className: 'font-blue',
		optionClassName: 'option-blue',
	},
	{
		title: 'Фиолетовый',
		value: '#5F0DEE',
		className: 'font-purple',
		optionClassName: 'option-purple',
	},
];

export const backgroundColors: OptionType[] = [
	{
		title: 'Белый',
		value: '#FFFFFF',
		className: 'bg-white',
		optionClassName: 'option-white',
	},
	{
		title: 'Черный',
		value: '#000000',
		className: 'bg-black',
		optionClassName: 'option-black',
	},
	{
		title: 'Серый',
		value: '#C4C4C4',
		className: 'bg-gray',
		optionClassName: 'option-gray',
	},
	{
		title: 'Розовый',
		value: '#FEAFE8',
		className: 'bg-pink',
		optionClassName: 'option-pink',
	},
	{
		title: 'Ярко-розовый',
		value: '#FD24AF',
		className: 'bg-fuchsia',
		optionClassName: 'option-fuchsia',
	},
	{
		title: 'Жёлтый',
		value: '#FFC802',
		className: 'bg-yellow',
		optionClassName: 'option-yellow',
	},
	{
		title: 'Зелёный',
		value: '#80D994',
		className: 'bg-green',
		optionClassName: 'option-green',
	},
	{
		title: 'Голубой',
		value: '#6FC1FD',
		className: 'bg-blue',
		optionClassName: 'option-blue',
	},
	{
		title: 'Фиолетовый',
		value: '#5F0DEE',
		className: 'bg-purple',
		optionClassName: 'option-purple',
	},
];

export const contentWidthArr: OptionType[] = [
	{
		title: 'Широкий',
		value: '1394px',
		className: 'width-wide',
		optionClassName: 'option-wide',
	},
	{
		title: 'Узкий',
		value: '948px',
		className: 'width-narrow',
		optionClassName: 'option-narrow',
	},
];

export const fontSizeOptions: OptionType[] = [
	{ title: '18px', value: '18px', className: 'font-size-18' },
	{ title: '25px', value: '25px', className: 'font-size-25' },
	{ title: '38px', value: '38px', className: 'font-size-38' },
];

export const defaultArticleState = {
	fontFamilyOption: fontFamilyOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
	fontSizeOption: fontSizeOptions[0],
};

export type ArticleStateType = typeof defaultArticleState;

/** Переменные стилей управляемые формой */
export type TArticleStylesProperties =
	| '--font-family'
	| '--font-size'
	| '--font-color'
	| '--container-width'
	| '--bg-color';

/** Объект для задания стилей  */
export type TArticleStylesSheet = Record<TArticleStylesProperties, string>;

/** Дефолтные значения переменных стилей статьи */
export const defaultArticleStyles: TArticleStylesSheet = {
	'--font-family': defaultArticleState.fontFamilyOption.value,
	'--font-size': defaultArticleState.fontSizeOption.value,
	'--font-color': defaultArticleState.fontColor.value,
	'--container-width': defaultArticleState.contentWidth.value,
	'--bg-color': defaultArticleState.backgroundColor.value,
};

export type ContentGroup = 'top' | 'bottom';
/** Тип объекта определяющего соответствия атрибута стилей и вид используемого компонента, массивов опций группировку и сортировку полей в параметрах настройки Статьи */
export type TStylesPropertyParam = {
	title: string;
	name: keyof ArticleStateType;
	property: TArticleStylesProperties;
	options: OptionType[];
	group: ContentGroup;
	sort: number;
	type: FunctionComponent<SelectProps> | FunctionComponent<RadioGroupProps>;
};

/** Массив объектов оответствия атрибута стилей и массивов опций в параметрах настройки Статьи*/
export type PropertyMap = TStylesPropertyParam[];
export type ElementsGroup = Record<ContentGroup, TStylesPropertyParam[]>;
/** Константа соответствия атрибутов стилей и массивов опций в параметрах настройки Статьи */
export const articleParamsMap: PropertyMap = [
	{
		title: 'Шрифт',
		name: 'fontFamilyOption',
		property: '--font-family',
		options: fontFamilyOptions,
		group: 'top',
		sort: 100,
		type: Select,
	},
	{
		title: 'рвзмер шрифта',
		name: 'fontSizeOption',
		property: '--font-size',
		options: fontSizeOptions,
		group: 'top',
		sort: 200,
		type: RadioGroup,
	},
	{
		title: 'цвет шрифта',
		name: 'fontColor',
		property: '--font-color',
		options: fontColors,
		group: 'top',
		sort: 300,
		type: Select,
	},
	{
		title: 'цвет фона',
		name: 'backgroundColor',
		property: '--bg-color',
		options: backgroundColors,
		group: 'bottom',
		sort: 100,
		type: Select,
	},
	{
		title: 'ширина контента',
		name: 'contentWidth',
		property: '--container-width',
		options: contentWidthArr,
		group: 'bottom',
		sort: 200,
		type: Select,
	},
];

export const articleParamsFormTitle = 'задайте параметры';
