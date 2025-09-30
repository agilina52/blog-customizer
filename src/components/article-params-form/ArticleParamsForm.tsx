import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	ArticleStateType,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = (props: {
	onParamsChange: (params: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOptionChange = (key: keyof ArticleStateType, value: any) => {
		setArticleState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.onParamsChange(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		props.onParamsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={articleState.fontFamilyOption}
						onChange={(option) =>
							handleOptionChange('fontFamilyOption', option)
						}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={articleState.fontSizeOption}
						name='fontSize'
						onChange={(option) => handleOptionChange('fontSizeOption', option)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={articleState.fontColor}
						onChange={(option) => handleOptionChange('fontColor', option)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						onChange={(option) => handleOptionChange('backgroundColor', option)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={articleState.contentWidth}
						onChange={(option) => handleOptionChange('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
