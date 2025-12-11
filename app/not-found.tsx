import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 text-center dark:bg-neutral-950">
            <h2 className="mb-4 text-9xl font-black text-neutral-200 dark:text-neutral-800">404</h2>
            <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">Page Not Found</h1>
            <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                Oops! The product or page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
                Go back home
            </Link>
        </div>
    );
}
