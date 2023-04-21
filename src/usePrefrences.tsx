import {
  useGetAuthorsQuery,
  useGetCategoriesQuery,
  useGetNewsSourcesQuery,
} from "./store/features/user/UserRequest";

const usePrefrences = () => {
  const { data: sources } = useGetNewsSourcesQuery("");
  const { data: categories } = useGetCategoriesQuery("");
  const { data: authors } = useGetAuthorsQuery("");

  return { sources, categories, authors };
};

export default usePrefrences;
