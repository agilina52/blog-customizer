import { useState, useRef } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = (props: {
	onParamsChange: (params: ArticleStateType) => void;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onChange: setIsMenuOpen,
	});

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
		<div ref={formRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(
					styles.container,
					isMenuOpen ? styles.container_open : ''
				)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{/* <h2 className={styles.title}>Задайте параметры</h2> */}
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
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
		</div>
	);
};
