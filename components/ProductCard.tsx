import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-white">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    priority={priority}
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="capitalize">{product.category}</span>
                    <div className="flex items-center gap-1">
                        <span>★</span>
                        <span>{product.rating.rate}</span>
                        <span className="text-neutral-300">({product.rating.count})</span>
                    </div>
                </div>
                <h2 className="mb-2 text-lg font-semibold leading-tight text-neutral-900 dark:text-white">
                    <Link href={`/products/${product.id}`} className="hover:underline">
                        {product.title}
                    </Link>
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-neutral-900 dark:text-white">
                        ${product.price.toFixed(2)}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}
