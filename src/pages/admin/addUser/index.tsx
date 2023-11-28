import React, { useState, useEffect } from "react";
import { PencilSquare, TrashFill, InfoCircleFill } from "react-bootstrap-icons";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import UserDetailModal from "./UserDetailModal";
import { User } from "./types";
import Pagination from "../../../globalComponents/Pagination/Pagination";
import { AuthAPI } from "../../../_services/api/authAPI";

const UserList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const authAPI = new AuthAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await authAPI.getUsersData();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Błąd podczas ustawiania użytkowników w stanie:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const result = users.filter(
      (user) =>
        (user.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
        (user.surname?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
        (user.email?.toLowerCase().includes(lowerCaseSearchTerm) || false)
    );
    setFilteredUsers(result);
  }, [searchTerm, users]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModal = (id: number) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserToDelete(null);
    setIsModalOpen(false);
  };

  const openEditUserModal = (user: User) => {
    setUserToEdit(user);
    setIsEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setUserToEdit(null);
    setIsEditUserModalOpen(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closeEditUserModal();
  };

  const handleDelete = async () => {
    if (userToDelete !== null) {
      try {
        await authAPI.deleteUser(userToDelete);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
        closeModal();
      } catch (error) {
        console.error("Błąd podczas usuwania użytkownika", error);
        // Możesz tutaj obsłużyć błąd, np. wyświetlając komunikat użytkownikowi
      }
    }
  };
  

  const handleAddUser = async (user: User) => {
    try {
      const userWithTeamId = { ...user, team: user.team.id };
      const newUser = await authAPI.addUser(userWithTeamId);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Błąd podczas dodawania użytkownika:", error);
    }
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;

  return (
    <div>
      <nav className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>Użytkownicy</div>
        </div>
      </nav>
      <div className="p-4 flex justify-end">
        <div className="p-2 flex justify-center ">
          <input
            type="text"
            placeholder="Szukaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
          />
        </div>

        <button
          className="bg-[#3B71CA] hover:bg-blue-600 text-white px-4 py-2 rounded mb-2 mt-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] focus:outline-none"
          onClick={openAddUserModal}
        >
          Dodaj użytkownika
        </button>
        <AddUserModal isOpen={isAddUserModalOpen} onClose={closeAddUserModal} onUserAdded={handleAddUser} />

      </div>
      <Pagination
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <div className="ml-4 mr-4 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] ">
        <table className="bg-white rounded-lg border border-gray-200 w-full">
          <thead className=" bg-[#BFDBFE] border border-[#BFDBFE] rounded-lg ">
            <tr>
              <th className="py-2 px-4 border-b"></th>
              <th className="w-1/9 py-2 border-b justify-start ">ID</th>
              <th className="w-1/4 py-2 px-4 border-b">Użytkownik</th>
              <th className="w-1/4 py-2 px-4 border-b">Email</th>
              <th className="w-1/4 py-2 px-4 border-b">Rola</th>
              <th className="w-1/6 py-2 px-4 border-b">Akcje</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers
              .slice(indexOfFirstUser, indexOfLastUser)
              .map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b justify-center text-center"></td>
                  <td className="py-2 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b justify-center text-center">
                    {user.name} {user.surname}
                  </td>
                  <td className="py-2 px-4 border-b justify-center text-center">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b justify-center text-center">
                    {user.team.name}
                  </td>
                  <td className="py-2 px-4 flex justify-center">
                    <button
                      onClick={() => openEditUserModal(user)}
                      className="bg-yellow-300 text-white px-2 py-1 rounded hover:bg-yellow-500 flex items-center justify-center h-8 w-8 mr-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
                    >
                      <PencilSquare />
                    </button>

                    <button
                      onClick={() => openModal(user.id)}
                      className="bg-red-300 text-white px-2 py-1 rounded hover:bg-red-500 flex items-center justify-center h-8 w-8 mr-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
                    >
                      <TrashFill />
                    </button>

                    {isModalOpen && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20">
                        <div className="bg-white p-4 rounded shadow-lg w-1/3">
                          <h2 className="text-xl mb-4 font-bold">
                            Potwierdzenie
                          </h2>
                          <p>
                            Czy na pewno chcesz usunąć tego użytkownika? <br />
                            Po usunięciu nie będzie można go przywrócić :(
                          </p>
                          <div className="mt-4 flex justify-end">
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
                              onClick={handleDelete}
                            >
                              Usuń
                            </button>
                            <button
                              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
                              onClick={closeModal}
                            >
                              Anuluj
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-300 text-white px-2 py-1 rounded hover:bg-blue-500 flex items-center justify-center h-8 w-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
                    >
                      <InfoCircleFill className="" />
                    </button>
                  </td>
                  {selectedUser && (
                    <UserDetailModal
                      user={selectedUser}
                      onClose={() => setSelectedUser(null)}
                    />
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-5 ">
            O nie :( <br /> Brak użytkownika spełniającego kryteria wyszukiwania
          </div>
        )}
      </div>
      {userToEdit && (
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onClose={closeEditUserModal}
          userToEdit={userToEdit}
        />
      )}
    </div>
  );
};

export default UserList;
