import { useState } from "react";
import { useAuth } from "../../_hooks/auth";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, resetPassword: resetUserPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (email === "" || password === "") {
      setError("Proszę wprowadzić email i hasło.");
    } else {
      try {
        await login({ email, password });
      } catch (error: any) {
        setError(
          error.message ||
            "Wystąpił błąd podczas logowania. Proszę spróbować ponownie."
        );
      }
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await resetUserPassword(email);
      if (result) {
        setMessage(
          "Proszę sprawdzić swoją skrzynkę e-mail w celu zresetowania hasła."
        );
      } else {
        setMessage("Proszę sprawdzić swoją skrzynkę e-mail.");
      }
    } catch (error) {
      setMessage("Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ffffff]">
      <div className="bg-gray-100 shadow-md rounded p-6 mt-10 w-1/4">
        <div className="flex items-end mb-4 justify-center">
          <img src="/logoalab.png" alt="Logo Alab" className="w-20 h-20 mr-2" />
          <h1 className="text-2xl font-bold text-[#black]">AlabFlow</h1>
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {isResetMode ? (
          <>
            {!message ? ( // Jeśli wiadomość nie została wyświetlona
              <>
                {message && <div className="mb-4 text-blue-600">{message}</div>}
                <form onSubmit={handleLogin}>
                  <input
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Wpisz swój adres email"
                  />
                  <div className="flex justify-center">
                    <button
                      disabled={isLoading}
                      className="w-150 bg-[#00A0E3] hover:bg-[#007CB6] text-white font-bold py-2 px-4 rounded"
                      onClick={handlePasswordReset}
                      type="button"
                    >
                      Zresetuj hasło
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="mb-4 text-blue-600 text-lg">{message}</div>
                <button
                  className="w-150 bg-[#00A0E3] hover:bg-[#007CB6] text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsResetMode(!isResetMode)}
                  disabled={isLoading}
                >
                  Powrót do logowania
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <input
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <div className="relative w-full mb-6 border border-gray-300 rounded">
                <input
                  className="w-full p-2 pl-3 pr-10"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Hasło"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  disabled={!email || !password || isLoading}
                  className={`w-150 font-bold py-2 px-4 rounded ${
                    email && password && !isLoading
                      ? "bg-[#00A0E3] hover:bg-[#007CB6] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  type="submit"
                >
                  Zaloguj się
                </button>
              </div>
            </form>
          </>
        )}
        <div className="flex justify-center mt-2 ">
          {!message && (
            <button
              className="text-red-400 hover:text-red-500"
              onClick={() => setIsResetMode(!isResetMode)}
              disabled={isLoading}
            >
              {isResetMode ? "Anuluj" : "Zapomniałem hasła"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
