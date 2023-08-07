import { auth, db } from "@/Utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/components/messages";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";


export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  // See if user is logged
  console.log(user);

  const getData = (async) => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };
  // delete post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  //   get User data

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your post</h1>

      <div>
        {posts.map((post) => {
          return (
            <Message {...post} key={post.id}>
              <div className="flex gap-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" />
                  Delete
                </button>
                <Link href={{pathname: '/auth/post', query:post}}>
                <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                  <AiFillEdit className="text-2xl"/>
                  Edit
                </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>
      <button
        className="bg-gray-800 text-white py-2 px-4 rounded-md"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
