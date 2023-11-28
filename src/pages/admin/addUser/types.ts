export interface User {
  email: string;
  flows: [];
  id: number;
  isActive: boolean;
  isProcessAdministrator: boolean;
  name: string;
  surname: string;
  team: { id: number; name: string };
  user: null;
  password: string;
}

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  user: User;
  roles: string[];
  directors: string[];
  processes: string[];
}

export const Teams = [
  {
      "id": 1,
      "name": "Super Admin"
  },
  {
      "id": 2,
      "name": "Administrator"
  },
  {
      "id": 3,
      "name": "Administrator procesu"
  },
  {
      "id": 4,
      "name": "Przedstawiciel handlowy"
  },
  {
      "id": 5,
      "name": "Dyrektor regionalny"
  }
]

export type processName = {
  id: number;
  name: string;
  color: string;
};

export const processName = [
  { id: 1, name: "Proces 1", color: "teal" },
];

export const admins = [true, false];

export const directors = ["Dyrektor A", "Dyrektor B", "Dyrektor C"];

export const processes = ["Proces A", "Proces B", "Proces C"];

/**typy pod zaślepkę
 * trzeb abedzie dostać z backendu 
 * 
 * 
 *moze coś takiego ?? 
 
 * export interface User {
  id: number;
  name: string;
  surname: string; 
  email: string;
  isActive: boolean;
  team: {
    id: number;
    name: string;
  };
  isProcessAdministrator: boolean;
  flows: number[];  
}


export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  user: User;
  roles: string[];
  directors: string[];
  processes: string[];
}


export type UserRole = {
  [teamId: number]: string[];
};


export const teamRoles: UserRole=  {
 1: ["Super Admin"],
  2: ["Administrator"],
  3: ["Administrator procesu"],
  4: ["Przedstawiciel handlowy"],
  5: ["Dyrektor regionalny"],
  6: ["Rozliczenia"],
  7: ["IT"],
  8: ["Dział konkursów"],
  9: ["Logistyka"],
  10: ["Integrator (HL7)"],
};

export type processName = {
  id: number;
  name: string;
  color: string;
};

export const processName = [
  { id: 1, name: "Proces 1", color: "teal" },
];


 **/

