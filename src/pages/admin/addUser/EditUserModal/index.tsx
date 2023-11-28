import React, { useState, useEffect } from "react";
import { User } from "../types";
import { AuthAPI } from "../../../../_services/api/authAPI";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [team, setTeam] = useState<number>(0);
  const [isProcessAdministrator, setIsProcessAdministrator] = useState(false);

  const authAPI = new AuthAPI();

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setSurname(userToEdit.surname);
      setEmail(userToEdit.email);
      setIsActive(userToEdit.isActive);
      setTeam(userToEdit?.id || 0);
      setIsProcessAdministrator(userToEdit.isProcessAdministrator);
    }
  }, [userToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userToEdit) { // Sprawdzenie, czy userToEdit nie jest null
      try {
        const updatedUser = {
          email,
          isActive,
          team,
          id: userToEdit.id,
          isProcessAdministrator,
        };
        await authAPI.patchUser(userToEdit.id, updatedUser);
        onClose();
      } catch (error) {
        console.error("Błąd podczas aktualizacji danych użytkownika:", error);
      }
    }
  };
  

  if (!isOpen || userToEdit === null) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      {/* Treść modala */}
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4 font-bold">Edytuj użytkownika</h2>
        <form onSubmit={handleSubmit}>
          {/* Imie */}
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
              value={userToEdit.name}
              onChange={(e) => setEmail(e.target.value)}
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
              value={userToEdit.surname}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

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
          {/* Numer zespołu */}
          <div className="mb-4">
            <label
              htmlFor="team"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rola
            </label>
            <input
              type="number"
              id="team"
              value={team}
              onChange={(e) => setTeam(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Przepływy pracy (opcjonalne) */}
          {/* Tutaj można dodać logikę do wyboru przepływów pracy, jeśli są one wymagane */}

          {/* Przyciski */}
          <button
            type="submit"
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

export default EditUserModal;
