import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  useLazyGetArticlePostsQuery,
} from "../store/features/articles/articlesRequest";
import usePrefrences from "../usePrefrences";

const Home = () => {
  const [querySource, setQuerySource] = useState("");
  const [queryAuthor, setQueryAuthor] = useState("");
  const [queryCategories, setQueryCategories] = useState("");

  const [trigger, { currentData, isFetching, isError, isLoading }] =
    useLazyGetArticlePostsQuery();
  const { authors, categories, sources } = usePrefrences();

  useEffect(() => {
    const arrayOfQueries = [querySource, queryAuthor, queryCategories];
    let queryKeys = "";

    for (let i = 0; i < arrayOfQueries.length; i++) {
      if (arrayOfQueries[i] !== "") {
        queryKeys += arrayOfQueries[i];
      }
    }
    trigger({ query: queryKeys });
  }, [querySource, queryAuthor, queryCategories]);



  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          News from your preferred sources in one place
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Search category
          </label>
          <select
            title="categories"
            onChange={(e: void | any) =>
              setQueryCategories(`filter[category_id]=${e.target.value}`)
            }
            className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose categories</option>
            {categories?.data.map((category: { id: number; name: string }) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by source
          </label>
          <select
            title="sources"
            onChange={(e: void | any) =>
              setQuerySource(`&filter[news_source_id]=${e.target.value}`)
            }
            className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose sources</option>
            {sources?.data.map((source: { id: number; name: string }) => (
              <option value={source.id}>{source.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Author
          </label>
          <select
            title="authours"
            onChange={(e: void | any) =>
              setQueryAuthor(`&filter[author_id]=${e.target.value}`)
            }
            className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose authors</option>
            {authors?.data.map((author: { id: number; name: string }) => (
              <option value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
      </div>
      {isFetching ? (
        <p>loading</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {currentData?.data.map((item: any) => (
            <Card
              key={item.id}
              title={item.title}
              image={item.image_url}
              description={item.description}
              author={item.author}
              news_source={item.news_source}
              content={item.content}
              date={item.published_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
