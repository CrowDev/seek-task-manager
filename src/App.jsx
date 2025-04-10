import "./App.css";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <div className="p-8 mx-auto w-full max-w-md bg-white rounded-lg shadow-md mt-[100px]">
      <h1 className="mb-6 text-2xl font-bold text-center text-neutral-charcoal">
        Welcome to Task Manager Platform
      </h1>

      <p className="mb-8 text-center text-secondary-gray">
        In order to use the platform, please register to access all features and
        benefits.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => auth.signinRedirect()}
          className="py-2 px-6 font-medium text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer focus:ring-2 focus:outline-none bg-primary-blue hover:bg-[#244a7f] focus:ring-[#2d5c9f]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default App;
