import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import { css, cx } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

interface BackToTopButtonProps {
	top?: number;
	isSmooth?: boolean;
}

function pxToRem(px: number, base = 16): string {
	return `${px / base}rem`;
}

export const BackToTopButton = component$<BackToTopButtonProps>(
	({ top = 2, isSmooth = true }) => {
		const isVisible = useSignal(false);
		const btnRef = useSignal<HTMLButtonElement>();

		const scrollToTop = $(() => {
			window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' });
		});

		useVisibleTask$(({ cleanup, track }) => {
			track(() => top);

			if (btnRef.value) {
				const handleScroll = () => {
					isVisible.value = window.scrollY > top;

					const rootEle = document.documentElement;
					const scrollTop = rootEle.scrollTop;
					const scrollTotal = rootEle.scrollHeight - rootEle.clientHeight;
					const scrollPercent = (scrollTop / scrollTotal) * 100;

					btnRef.value?.style.setProperty(
						'--btt-scroll-percent',
						`${scrollPercent}%`,
					);
				};

				handleScroll();
				window.addEventListener('scroll', handleScroll);

				cleanup(() => {
					window.removeEventListener('scroll', handleScroll);
				});
			}
		});

		return (
			<div
				class={flex({
					zIndex: 50,
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
					md: {
						w: '100%',
						maxW: pxToRem(160),
					},
					xs: {
						'--btt-btn-size': 'sizes.12',
					},
					'--btt-btn-size': 'sizes.10',
				})}
				data-visible={isVisible.value}
			>
				<button
					ref={btnRef}
					aria-label='Back to top'
					type='button'
					class={cx(
						'group',
						flex({
							cursor: 'pointer',
							pos: 'relative',
							align: 'center',
							border: 'md',
							bdc: 'accent',
							rounded: 'md',
							w: '100%',
							h: 'var(--btt-btn-size)',
							color: 'slate.900',
							// bg: 'slate.50/50',
							shadow: '2px 4px {colors.accent}',
							md: {
								gap: '2',
								px: '3',
								backdropFilter: 'auto',
								backdropBlur: 'sm',
							},
						}),
					)}
					// style={{ backdropFilter: 'blur(8px)' }}
					onClick$={scrollToTop}
				>
					<span
						class={flex({
							justify: 'center',
							align: 'center',
							w: '100%',
							h: 'calc(var(--btt-btn-size) - 0.125rem)',
							overflow: 'hidden',
							md: {
								w: 'auto',
								h: 'calc(var(--btt-btn-size) - 0.5rem)',
							},
						})}
					>
						<i
							class={css({
								display: 'inline-block',
								w: '1.5em',
								h: '1.5em',
								bg: 'currentColor',
								maskPosition: 'center',
								maskRepeat: 'no-repeat',
								maskImage: '{assets.arrowUp}',
								maskSize: 'contain',
								_groupHover: {
									color: 'accent',
									animation: 'icon-cycle-up',
									animationDuration: 'longer',
									animationTimingFunction: 'ease-in-out',
								},
							})}
						/>
					</span>
					<span
						class={css({
							srOnly: true,
							md: {
								fontSize: 'lg',
								fontWeight: 'medium',
								srOnly: false,
								_groupHover: {
									color: 'accent',
								},
							},
						})}
					>
						Back to top
					</span>
				</button>
			</div>
		);
	},
);
