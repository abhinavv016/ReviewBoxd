import { fetchContent, Content } from "@/lib/fetchContent";
import SearchResult from "./searchResult";

export default async function SearchPage({ params }: { params: { query: string } }) {
  const decodedQuery = decodeURIComponent(params.query);
  const contents: Content[] = await fetchContent(decodedQuery);

  return <SearchResult decodedQuery={decodedQuery} contents={contents} />;
}