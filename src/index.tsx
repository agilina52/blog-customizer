import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const saveParamsToStorage = (params: ArticleStateType) => {
		localStorage.setItem('articleParams', JSON.stringify(params));
	};

	const loadParamsFromStorage = () => {
		const savedParams = localStorage.getItem('articleParams');
		if (savedParams) {
			return JSON.parse(savedParams);
		}
		return defaultArticleState;
	};

	useEffect(() => {
		const initialParams = loadParamsFromStorage();
		setArticleParams(initialParams);
	}, []);

	const handleParamsChange = (newParams: ArticleStateType) => {
		setArticleParams(newParams);
		saveParamsToStorage(newParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onParamsChange={handleParamsChange} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
