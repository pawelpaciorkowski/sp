import { Link } from 'react-router-dom';

export default function TableComponent() {
  const users = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry", last: "Wild", handle: "@twitter" },
    { id: 4, first: "Tom", last: "Allen", handle: "@tall" },
    { id: 5, first: "Chandler", last: "Bing", handle: "@chandler" },
    { id: 6, first: "Ross", last: "Geller", handle: "@ross" },
  ];

  return (
    <div>
      <nav
        className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4 mb-3">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>
            Lista procesów
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap justify-center items-stretch">
        {users.map((user, index) => (
          <Link
            to={`/process/${user.id}`}
            key={index}
            className="overflow-hidden border rounded w-64 mb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] flex flex-col m-2 p-4"
          >
            <h1 className="text-2xl font-bold text-gray-900">#{user.id}</h1>
            <p className="mt-1 text-sm text-gray-600">{user.first} {user.last}</p>
            <p className="mt-1 text-sm text-gray-600">{user.handle}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
