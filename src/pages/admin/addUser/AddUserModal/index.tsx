import React, { useState } from "react";
import { AuthAPI } from "../../../../_services/api/authAPI";
import { User, Teams } from "../types";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
  
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState<number | null>(null);
  const [flows, setFlows] = useState<string[]>([]);

  const authAPI = new AuthAPI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (team === null) {
        // Wyświetl błąd lub ustaw domyślną wartość
        console.error("Team is required");
        return;
      }
      const user = {
        email,
        name,
        surname,
        password,
        team,
        flows,
      };
      const addedUser = await authAPI.addUser(user); // Zapisz dodanego użytkownika
      onUserAdded(addedUser); // Aktualizuj listę użytkowników
      onClose();
    } catch (error) {
      console.error("Błąd podczas dodawania użytkownika:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4 font-bold">Dodaj użytkownika</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Imię */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Imię
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Nazwisko */}
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nazwisko
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Hasło */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rola
            </label>
            <select
              id="role"
              value={team || ""}
              onChange={(e) =>
                setTeam(e.target.value ? parseInt(e.target.value) : null)
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Wybierz rolę</option>
              {Teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Przepływy pracy (opcjonalne) */}
          {/* Tutaj możesz dodać logikę do wyboru przepływów pracy, jeśli są one wymagane */}

          {/* Przyciski */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Zapisz
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
          >
            Anuluj
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
