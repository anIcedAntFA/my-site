import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image().optional(),
			publishedDate: z.coerce.date(),
			modifiedDate: z.coerce.date().optional(),
			isDraft: z.boolean().optional(),
			isFeatured: z.boolean().optional(),
			// tags: z.array(z.enum(TAG_VARIANT)),
			author: z.string(),
			seo: z
				.object({
					title: z.string().optional(),
					description: z.string().optional(),
					image: image().optional(),
				})
				.optional(),
		}),
});

export const collections = { blog };
