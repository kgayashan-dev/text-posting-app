import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "src/Utils/Firebase.js";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  // sign in with google

  // console.log(auth);

  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const GoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
        console.log("login")
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h1 className="text-2xl font-medium">Join today</h1>

      <div className="py-4">
        <h3 className="py-4">Sign in with the one of the providers.</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl " />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
