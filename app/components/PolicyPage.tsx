import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders a policy from /policies at build time. The Markdown files are the
// source of truth: update the file and the page follows.
const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">{children}</h1>
  ),
  h2: ({ children }) => <h2 className="mt-4 mb-4 text-2xl md:text-3xl font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-lg md:text-xl font-semibold">{children}</h3>,
  p: ({ children }) => <p className="mb-4 leading-relaxed text-[#f4f1ea]/80">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2 text-[#f4f1ea]/80">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-[#f4f1ea]/80">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#f4f1ea]">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-[#EACE76] underline underline-offset-4 hover:text-[#f4f1ea] transition-colors duration-200">
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm text-[#f4f1ea]/80">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/20 px-3 py-2 text-left font-semibold text-[#f4f1ea]">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-white/10 px-3 py-2 align-top">{children}</td>,
};

export default async function PolicyPage({ file }: { file: string }) {
  const markdown = await readFile(path.join(process.cwd(), "policies", file), "utf8");

  return (
    <main>
      <article className="max-w-3xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
