// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MeiliSearch, { SearchResponse } from "meilisearch";
import type { NextApiRequest, NextApiResponse } from "next";
import { WikiPage } from "./seed-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse<WikiPage>>
) {
  const getSearchQuery = () => {
    const { q } = req.query;
    if (Array.isArray(q)) {
      return q.length > 0 ? q[0] : undefined;
    }
    return q;
  };

  const q = getSearchQuery();

  const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: process.env.MEILI_SEARCH_MASTER_KEY,
  });

  const result = await client.index<WikiPage>("wikiPages").search(q, {
    sort: ["order:asc"],
    attributesToCrop: ["content"],
    cropLength: 100,
    attributesToHighlight: ["title", "content"],
    highlightPreTag: "*",
    highlightPostTag: "*",
  });

  return res.status(200).json(result);
}

export type WikiPageResult = WikiPage & { _formatted?: WikiPage };
