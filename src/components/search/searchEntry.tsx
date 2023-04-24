import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  path: string;
  description: string;
  url: string;
};

export function SearchEntry({ title, path, description, url }: Props) {
  return (
    <div className="rounded-md bg-slate-100 shadow-xl p-4 flex flex-col gap-3 text-gray-900">
      <h2 className="font-bold text-lg prose prose-em:text-red-600 prose-em:font-bold">
        <ReactMarkdown>{title}</ReactMarkdown>
      </h2>
      <h3 className="text-sm">{path}</h3>
      <div className="rounded-md border border-gray-400 p-3 prose prose-h1:text-lg prose-p:text-sm prose-em:text-red-600 prose-em:font-bold">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
      <a
        href={url}
        className="rounded-md bg-red-500 hover:bg-red-300 px-3 py-2 text-white"
      >
        Go to page
      </a>
    </div>
  );
}
