// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MeiliSearch, { EnqueuedTask } from "meilisearch";
import wikiPages from "../../seed-data/wiki-pages.json";
import type { NextApiRequest, NextApiResponse } from "next";

// Don't save more than this amount of characters for the content field.
const MAX_CONTENT_LENGHT = 10000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnqueuedTask>
) {
  const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: process.env.MEILI_SEARCH_MASTER_KEY,
  });
  await client.index("wikiPages").delete();
  const wikiPagesWithTitles = wikiPages.map(addTitle).map(reduceContent);
  const result = await client
    .index("wikiPages")
    .addDocuments(wikiPagesWithTitles);
  await client.index("wikiPages").updateSortableAttributes(["order"]);

  return res.status(200).json(result);
}

const addTitle = (wikiPage: ImportedWikiPage): WikiPage => {
  const title = wikiPage.path.split("/").pop() || "";
  return { ...wikiPage, title };
};

const reduceContent = (wikiPage: WikiPage): WikiPage => {
  const isTooLarge = wikiPage.content.length > MAX_CONTENT_LENGHT;
  if (!isTooLarge) {
    return wikiPage;
  }
  const reducedContent = wikiPage.content.slice(0, MAX_CONTENT_LENGHT) + "...";
  return { ...wikiPage, content: reducedContent };
};

type ImportedWikiPage = {
  path: string;
  order: number;
  gitItemPath: string;
  subPages: ImportedWikiPage[];
  url: string;
  remoteUrl: string;
  id: number;
  content: string;
};

export type WikiPage = ImportedWikiPage & { title: string };
