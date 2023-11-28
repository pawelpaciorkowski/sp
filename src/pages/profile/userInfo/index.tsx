import { PersonCircle } from "react-bootstrap-icons";

// Komponent UserProfile, wyświetlający informacje o użytkowniku
const UserProfile = ({ user }: { user: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto mt-4">
      <div className="text-center">
        <PersonCircle className="text-8xl text-blue-500 mx-auto" />
        <div className="mt-4 p-4 border border-gray-300 rounded-md w-1/3 mx-auto min-w-1/3 shadow-lg">
          <div className="my-2">
            <label className="block font-semibold text-gray-600">ID:</label>
            <p className="text-gray-600">{user.id}</p>
          </div>
          <div className="my-2">
            <label className="block font-semibold text-gray-600">Imię:</label>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div className="my-2">
            <label className="block font-semibold text-gray-600">
              Nazwisko:
            </label>
            <p className="text-gray-600">{user.surname}</p>
          </div>
          <div className="my-2">
            <label className="block font-semibold text-gray-600">Rola:</label>
            <p className="text-gray-600">{user.roles}</p>
          </div>
          <div className="my-2">
            <label className="block font-semibold text-gray-600">Email:</label>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
