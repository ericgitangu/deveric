import React, { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
// Generic component type
type CustomComponent<T extends keyof JSX.IntrinsicElements> = React.FC<
	ComponentPropsWithoutRef<T> & { className?: string }
>;

function clsx(...args: (string | undefined | false | null)[]): string {
	return args.filter(Boolean).join(" ");
}

const components = {
	h1: (({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h1">,

	h2: (({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h2">,

	h3: (({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h3">,

	h4: (({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h4">,

	h5: (({ className, ...props }: ComponentPropsWithoutRef<"h5">) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h5">,

	h6: (({ className, ...props }: ComponentPropsWithoutRef<"h6">) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"h6">,

	a: (({ className, href, ...props }: ComponentPropsWithoutRef<"a">) => (
		<Link
			className={clsx(
				"font-medium text-zinc-900 underline underline-offset-4",
				className,
			)}
			href={href || "#"}
			{...props}
		/>
	)) as CustomComponent<"a">,

	p: (({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	)) as CustomComponent<"p">,

	ul: (({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	)) as CustomComponent<"ul">,

	ol: (({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	)) as CustomComponent<"ol">,

	li: (({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
		<li className={clsx("mt-2", className)} {...props} />
	)) as CustomComponent<"li">,

	blockquote: (({
		className,
		...props
	}: ComponentPropsWithoutRef<"blockquote">) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"blockquote">,

	pre: (({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"pre">,

	code: (({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
				className,
			)}
			{...props}
		/>
	)) as CustomComponent<"code">,

	img: (({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-md border border-zinc-200", className)}
			alt={alt}
			{...props}
		/>
	)) as React.FC<React.ImgHTMLAttributes<HTMLImageElement>>,

	hr: ((props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-4 border-zinc-200 md:my-8" {...props} />
	)) as React.FC<React.HTMLAttributes<HTMLHRElement>>,

	table: (({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	)) as React.FC<React.HTMLAttributes<HTMLTableElement>>,

	tr: (({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
				className,
			)}
			{...props}
		/>
	)) as React.FC<React.HTMLAttributes<HTMLTableRowElement>>,

	th: (({
		className,
		...props
	}: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
		<th
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	)) as React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>>,

	td: (({
		className,
		...props
	}: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
		<td
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	)) as React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>>,

	Image, // Mapping 'Image' from next/image if used in MDX
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
