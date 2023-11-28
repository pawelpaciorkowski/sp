import apiInstance from "../common";

export class AuthAPI {
  // Metoda do pozyskiwania tokena
  private getToken(): string | null {
    const authData = localStorage.getItem("authData");
    return authData ? JSON.parse(authData).token : null;
  }

  // Metoda do logowania użytkownika
  async loginUser(email: string, password: string) {
    try {
      const response = await apiInstance.post("login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Metoda do odświeżania tokena
  async refreshToken(refreshToken: string) {
    try {
      const response = await apiInstance.post("token/refresh", { refresh_token: refreshToken });
      return response.data;
    } catch (error) {
      console.error("Error refresh token", error);
      throw error;
    }
  }

  // Metoda do resetowania hasła
  async resetPassword(email: string) {
    try {
      const response = await apiInstance.post("/user/reset", { email });
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  // Metoda do pobierania danych użytkowników
  async getUsersData() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Token nie jest dostępny");
    }

    try {
      const response = await apiInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika:", error);
      throw error;
    }
  }

  // Metoda do pobierania profilu użytkownika
  async getUserProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Token nie jest dostępny");
    }

    try {
      const response = await apiInstance.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania profilu użytkownika:", error);
      throw error;
    }
  }

  // Metoda do dodawania użytkownika
  async addUser(user: {
    email: string;
    name: string;
    surname: string;
    password: string;
    team: number;
    flows: string[];
  }) {
    const token = this.getToken();
  
    if (!token) {
      throw new Error("Token nie jest dostępny");
    }

    try {
      const response = await apiInstance.post("/user", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Błąd podczas dodawania użytkownika:", error);
      throw error;
    }
  }

  // Metoda do zmiany hasła z użyciem ticketu
  async changePasswordWithTicket(ticket: string, newPassword: string): Promise<any> {
    try {
      const response = await apiInstance.post(`/user/reset/${ticket}`, { ticket, newPassword });
      if (response.data.success) {
        return { success: true, message: "Hasło zostało pomyślnie zaktualizowane." };
      } else {
        throw new Error(response.data.message || "Nieznany błąd.");
      }
    } catch (error) {
      console.error("Błąd podczas zmiany hasła z użyciem ticketu:", error);
      throw error;
    }
  }

  // Metoda do usuwania użytkownika
  async deleteUser(id: number) {
    const token = this.getToken();

    if (!token) {
      throw new Error("Token nie jest dostępny");
    }

    try {
      const response = await apiInstance.delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Błąd podczas usuwania użytkownika:", error);
      throw error;
    }
  }

  // Metoda do aktualizacji danych użytkownika
  async patchUser(id: number, userData: any) {
    const token = this.getToken();

    if (!token) {
      throw new Error("Token nie jest dostępny");
    }

    try {
      const response = await apiInstance.patch(`/api/user`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Błąd podczas aktualizacji danych użytkownika:", error);
      throw error;
    }
  }
}
