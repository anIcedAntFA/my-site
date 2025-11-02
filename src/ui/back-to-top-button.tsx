import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { css, cx } from "@styled-system/css";
import { flex, square } from "@styled-system/patterns";
import { button, icon } from "@styled-system/recipes";

interface BackToTopButtonProps {
	top?: number;
	isSmooth?: boolean;
}

export const BackToTopButton = component$<BackToTopButtonProps>(
	({ top = 200, isSmooth = true }) => {
		const isVisible = useSignal(false);
		const btnRef = useSignal<HTMLButtonElement>();

		const scrollToTop = $(() => {
			window.scrollTo({ top: 0, behavior: isSmooth ? "smooth" : "auto" });
		});

		// biome-ignore lint/correctness/noQwikUseVisibleTask: <wrong>
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
						"--btt-scroll-percent",
						`${scrollPercent}%`,
					);
				};

				handleScroll();
				window.addEventListener("scroll", handleScroll);

				cleanup(() => {
					window.removeEventListener("scroll", handleScroll);
				});
			}
		});

		const btnClasses = button({ size: "sm", variant: "outlined" });
		const iconClasses = icon({ mode: "mask", size: "md" });

		return (
			<div
				class={flex({
					zIndex: "tooltip",
					pos: "sticky",
					left: "100%",
					bottom: "var(--btt-btn-size)",
					translate: "auto",
					y: "var(--btt-btn-size)",
					justify: "center",
					align: "center",
					w: "var(--btt-btn-size)",
					h: "var(--btt-btn-size)",
					mr: "var(--btt-btn-size)",
					mb: "var(--btt-btn-size)",
					opacity: 0,
					transitionDuration: "normal",
					transitionProperty: "opacity, translate",
					pointerEvents: "none",
					_visible: {
						y: "0",
						opacity: 1,
						pointerEvents: "auto",
					},
					xs: { "--btt-btn-size": "sizes.12" },
					md: { w: "fit-content" },
					"--btt-btn-size": "sizes.10",
				})}
				data-visible={isVisible.value}
			>
				<button
					ref={btnRef}
					aria-label="Back to top"
					type="button"
					class={cx(
						btnClasses.root,
						"group",
						flex({
							pos: "relative",
							align: "center",
							boxSize: "{sizes.full}",
						}),
					)}
					onClick$={scrollToTop}
				>
					<div
						class={cx(
							btnClasses.content,
							css({
								justifyContent: "center",
								h: "{sizes.full}",
								overflow: "hidden",
							}),
						)}
					>
						<span
							class={square({
								h: "calc({sizes.full} - 0.25rem)",
								overflow: "hidden",
							})}
						>
							<i
								aria-hidden="true"
								class={cx(
									iconClasses,
									css({
										maskImage: "{assets.arrowUp}",
										_groupHover: {
											animation: "icon-cycle-up",
											animationDuration: "longer",
											animationTimingFunction: "ease-in-out",
										},
										xs: { w: "1.7em", h: "1.7em" },
									}),
								)}
							/>
						</span>
						<span
							class={css({
								srOnly: true,
								md: { ml: "1.5", srOnly: false },
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
