import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/Utils/Firebase.js";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  return (
    <nav className="flex justify-between items-center py-2 bg-slate-500 rounded px-2">
      <Link href={"/"}>
        <button className="text-lg font-light text-white"> Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <li className="py-2 px-4 text-small bg-cyan-500 text-white rounded-lg ">
              Join now
            </li>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href={"/auth/post"}>
              <button className="font-medium bg-cyan-500 text-white px-4 py-2 rounded-md  text-sm">
                Post
              </button>
            </Link>
            
            <Link href={"/auth/dashboard"}>
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
