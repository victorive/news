import { useEffect, useState } from "react";
import { useGetNewsSourcesQuery } from "../store/features/news-sources/newsSourcesRequest";
import {
  useGetAuthorsQuery,
  useGetCategoriesQuery,
  useGetCurrentUserQuery,
  useSetPreferencesMutation,
} from "../store/features/user/UserRequest";
import usePrefrences from "../usePrefrences";

const Preferences = () => {
  const [checkedAuthors, setCheckedAuthors] = useState<any>([]);
  const [checkedCategories, setCheckedCategories] = useState<any>([]);
  const [checkedSources, setCheckedSources] = useState<any>([]);
  const [setPreferences, isFetching] = useSetPreferencesMutation();
  const { data: userData, isError, isSuccess } = useGetCurrentUserQuery("");

  const { authors, categories, sources } = usePrefrences();

  console.log(checkedSources, isSuccess, "olll", userData);

  useEffect(() => {
    if (isSuccess) {
      const user = userData as {
        id: number;
        preferences:
          | []
          | {
              authors:
                | {
                    id: number;
                    name: string;
                  }
                | string[];

              categories:
                | {
                    id: number;
                    name: string;
                  }
                | string[];
            };
      };
      setCheckedAuthors(
        Object.values(user?.preferences)[0].map(
          (item: { id: number }) => item.id
        )
      );
      setCheckedCategories(
        Object.values(user?.preferences)[2].map(
          (item: { id: number }) => item.id
        )
      );
      setCheckedSources(
        Object.values(user?.preferences)[1].map(
          (item: { id: number }) => item.id
        )
      );
    }
  }, []);

  const handleChange = (e: any) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedAuthors([...checkedAuthors, item]);
    } else {
      setCheckedAuthors(checkedAuthors.filter((i: string) => i !== item));
    }
  };
  const handleChangeCategory = (e: any) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedCategories([...checkedCategories, item]);
    } else {
      setCheckedCategories(checkedCategories.filter((i: string) => i !== item));
    }
  };
  const handleChangeSource = (e: any) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedSources([...checkedSources, item]);
    } else {
      setCheckedSources(checkedSources.filter((i: string) => i !== item));
    }
  };

  const handleSubmit = async () => {
    const body = {
      news_source_id: checkedSources,
      category_id: checkedCategories,
      author_id: checkedAuthors,
    };

    await setPreferences(body);
  };

  return (
    <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Preferences
        </h2>

        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Authors
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select preferred authors below
                    </p>
                  </div>
                  <div className="mt-6">
                    <fieldset>
                      <div
                        className="text-base text-gray-500 flex flex-col gap-4"
                        aria-hidden="true"
                      >
                        {authors?.data.map((item: any) => (
                          <label>
                            <input
                              type="checkbox"
                              name={`${item.id}`}
                              className="mr-2"
                              checked={checkedAuthors.includes(`${item.id}`)}
                              onChange={handleChange}
                            />
                            {item.name}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Categories
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select preferred categories below
                    </p>
                  </div>
                  <div className="mt-6">
                    <div
                      className="text-base text-gray-500 flex flex-col gap-4"
                      aria-hidden="true"
                    >
                      {categories?.data.map((item: any) => (
                        <label>
                          <input
                            type="checkbox"
                            name={`${item.id}`}
                            className="mr-2"
                            checked={checkedCategories.includes(`${item.id}`)}
                            onChange={handleChangeCategory}
                          />
                          {item.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Sources
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select preferred sources below
                    </p>
                  </div>
                  <div className="mt-6">
                    <div
                      className="text-base text-gray-500 flex flex-col gap-4"
                      aria-hidden="true"
                    >
                      {sources?.data.map((item: any) => (
                        <label>
                          <input
                            type="checkbox"
                            name={`${item.id}`}
                            className="mr-2"
                            checked={checkedSources.includes(`${item.id}`)}
                            onChange={handleChangeSource}
                          />
                          {item.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
