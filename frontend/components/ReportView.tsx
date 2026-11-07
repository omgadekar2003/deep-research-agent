"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReportView({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
          ),
          h2: (props) => (
            <h2 className="text-2xl font-bold mt-8 mb-3" {...props} />
          ),
          h3: (props) => (
            <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />
          ),
          p: (props) => <p className="my-3 leading-7" {...props} />,
          ul: (props) => (
            <ul className="list-disc my-3 ml-6 space-y-1" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal my-3 ml-6 space-y-1" {...props} />
          ),
          li: (props) => <li className="leading-7" {...props} />,
          a: (props) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 my-4 italic text-zinc-600 dark:text-zinc-400"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto my-4"
              {...props}
            />
          ),
          table: (props) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-zinc-200 dark:border-zinc-800" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-zinc-50 dark:bg-zinc-900 text-left font-semibold"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="border border-zinc-200 dark:border-zinc-800 px-3 py-2"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}