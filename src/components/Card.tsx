import { Link } from "react-router-dom";

const Card = ({
  title,
  description,
  date,
  image,
  news_source,
  author,
}: any) => {
  return (
    <div className="mx-auto mt-12 grid w-full grid-cols-1">
      <div
        key=""
        className="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={image ?? "/placeholder.jpeg"}
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <p className="text-sm font-medium">
              <span className="text-gray-500">
                {news_source} | {author}
              </span>
            </p>
            <Link to="" className="mt-2 block" target="_blank">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{description}</p>
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900"></p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime="">{date}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
