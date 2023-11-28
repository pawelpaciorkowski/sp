// UserDetailModal.tsx
import React from "react";
import { User } from "../types";

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4 font-bold">Szczegóły użytkownika</h2>
        <p>
          <strong>Imię i Nazwisko:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rola:</strong> {user.team.name}
        </p>
        {user.team.id && (
          <p>
            <strong>Administrator procesu:</strong>  ✅
          </p>
        )}
        {user.team.name && (
          <p>
            <strong>Dyrektor:</strong> {user.team.name}
          </p>
        )}
        {/* {user.processes && user.processes.length > 0 ? (
          <p>
            <strong>Proces:</strong> {user.processes.join(", ")}
          </p>
        ) : (
          <p>
            <strong>Proces:</strong> Brak
          </p>
        )} */}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-300 text-white px-2 py-1 mt-2 rounded hover:bg-red-500 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
