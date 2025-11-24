import { component$ } from '@builder.io/qwik';

import { css, cx } from '@/styled-system/css';
import { flex, square } from '@/styled-system/patterns';
import { button, icon } from '@/styled-system/recipes';

import { useBackToTopButton } from './use-back-to-top-button';

interface BackToTopButtonProps {
	top?: number;
	isSmooth?: boolean;
}

export const BackToTopButton = component$<BackToTopButtonProps>(
	({ top = 200, isSmooth = true }) => {
		const { isVisible, btnRef, scrollToTop$ } = useBackToTopButton(
			top,
			isSmooth,
		);

		const btnClasses = button({ size: 'sm', variant: 'outlined' });
		const iconClasses = icon({ mode: 'mask', size: 'md' });

		return (
			<div
				class={flex({
					zIndex: 'tooltip',
					pos: 'sticky',
					left: '100%',
					bottom: 'var(--btt-btn-size)',
					translate: 'auto',
					y: 'var(--btt-btn-size)',
					justify: 'center',
					align: 'center',
					w: 'var(--btt-btn-size)',
					h: 'var(--btt-btn-size)',
					mr: 'var(--btt-btn-size)',
					mb: 'var(--btt-btn-size)',
					opacity: 0,
					transitionDuration: 'normal',
					transitionProperty: 'opacity, translate',
					pointerEvents: 'none',
					_visible: {
						y: '0',
						opacity: 1,
						pointerEvents: 'auto',
					},
					xs: { '--btt-btn-size': 'sizes.12' },
					md: { w: 'fit-content' },
					'--btt-btn-size': 'sizes.10',
				})}
				data-visible={isVisible.value}
			>
				<button
					aria-label='Back to top'
					class={cx(
						btnClasses.root,
						'group',
						flex({
							pos: 'relative',
							align: 'center',
							boxSize: '{sizes.full}',
						}),
					)}
					onClick$={scrollToTop$}
					ref={btnRef}
					type='button'
				>
					<div
						class={cx(
							btnClasses.content,
							css({
								justifyContent: 'center',
								h: '{sizes.full}',
								overflow: 'hidden',
							}),
						)}
					>
						<span
							class={square({
								h: 'calc({sizes.full} - 0.25rem)',
								overflow: 'hidden',
							})}
						>
							<i
								aria-hidden='true'
								class={cx(
									iconClasses,
									css({
										maskImage: '{assets.arrowUp}',
										_groupHover: {
											animation: 'icon-cycle-up',
											animationDuration: 'longer',
										},
										xs: { w: '1.7em', h: '1.7em' },
									}),
								)}
							/>
						</span>
						<span
							class={css({
								srOnly: true,
								md: { ml: '1.5', srOnly: false },
							})}
						>
							Back to top
						</span>
					</div>
				</button>
			</div>
		);
	},
);
