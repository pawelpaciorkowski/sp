// import React, { useState, useEffect } from "react";
// import { PersonCircle } from "react-bootstrap-icons";
// import { useAuth } from "../../_hooks/auth";
// import { AuthAPI } from "../../_services/api/authAPI";

// const UserProfile = () => {
//   const { authData } = useAuth();

//   const [user, setUser] = useState({
//     id: "",
//     name: "",
//     surname: "",
//     roles: "",
//     email: "",
//     team: {
//       id: "",
//       name: "",
//     },
//   });

//   const authAPI = new AuthAPI();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userProfileData = await authAPI.getUserProfile();
//         setUser({
//           id: userProfileData.id.toString(),
//           name: userProfileData.name,
//           surname: userProfileData.surname,
//           roles: userProfileData.team.name,
//           email: userProfileData.email,
//           team: {
//             id: userProfileData.team.id.toString(),
//             name: userProfileData.team.name
//           }
//         });
        
//       } catch (error) {
//         console.error("Błąd podczas pobierania danych użytkownika:", error);
//       }
//     };

//     fetchData();
//   }, [authData]);

//   return (
//     <div>
//       <nav className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
//         <div className="flex w-full flex-wrap items-center justify-between px-5">
//           <div>Profil użytkownika</div>
//         </div>
//       </nav>
//       <div className="bg-white rounded-lg shadow-lg p-6 mx-auto mt-4">
//         <div className="text-center">
//           <PersonCircle className="text-8xl text-blue-500 mx-auto" />
//           <div className="mt-4 p-4 border border-gray-300 rounded-md w-1/3 mx-auto min-w-1/3 shadow-lg">
//             <div className="my-2">
//               <label className="block font-semibold text-gray-600">ID:</label>
//               <p className="text-gray-600">{user.id}</p>
//             </div>
//             <div className="my-2">
//               <label className="block font-semibold text-gray-600">Imię:</label>
//               <p className="text-gray-600">{user.name}</p>
//             </div>
//             <div className="my-2">
//               <label className="block font-semibold text-gray-600">
//                 Nazwisko:
//               </label>
//               <p className="text-gray-600">{user.surname}</p>
//             </div>
//             <div className="my-2">
//               <label className="block font-semibold text-gray-600">Rola:</label>
//               <p className="text-gray-600">{user.roles}</p>
//             </div>
//             <div className="my-2">
//               <label className="block font-semibold text-gray-600">
//                 Email:
//               </label>
//               <p
//                 className="text-gray-600"
//                 style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
//               >
//                 {user.email}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from "react";
import UserProfile from './userInfo';
import { useAuth } from "../../_hooks/auth";
import { AuthAPI } from "../../_services/api/authAPI";

// Strona UserProfilePage, zarządzająca stanem i logiką
const UserProfilePage = () => {
    const { authData } = useAuth();
    const [user, setUser] = useState({
        id: "",
        name: "",
        surname: "",
        roles: "",
        email: "",
        team: {
            id: "",
            name: "",
        },
    });

    const authAPI = new AuthAPI();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileData = await authAPI.getUserProfile();
                setUser({
                    id: userProfileData.id.toString(),
                    name: userProfileData.name,
                    surname: userProfileData.surname,
                    roles: userProfileData.team.name,
                    email: userProfileData.email,
                    team: {
                        id: userProfileData.team.id.toString(),
                        name: userProfileData.team.name
                    }
                });
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };

        fetchData();
    }, [authData]);

    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
};

export default UserProfilePage;
