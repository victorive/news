const SearchBar = ({...props}) => {
  return (
    <div className="mt-1">
      <input
        type="text"
        className="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        placeholder={"Enter search term"}
        {...props}
      />
    </div>
  );
};

export default SearchBar;
  