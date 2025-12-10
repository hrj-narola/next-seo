import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us | Next.js SEO Masterclass",
	description: "Learn more about our mission to teach SEO optimization in Next.js.",
};

export default function About() {
	return (
		<div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
			<main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
				<section aria-labelledby="about-heading" className="space-y-6">
					<h1
						id="about-heading"
						className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
					>
						About Us
					</h1>
					<div className="prose prose-neutral dark:prose-invert max-w-none">
						<p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
							Welcome to the Next.js SEO Masterclass demo application. This project serves as a comprehensive
							example of how to implement advanced SEO techniques in a modern web application.
						</p>
						<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Our Mission</h2>
						<p className="text-neutral-600 dark:text-neutral-400">
							We aim to demystify Server-Side Rendering (SSR), Static Site Generation (SSG), and Semantic
							HTML, helping developers build faster, more discoverable websites.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}
