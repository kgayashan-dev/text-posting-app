import Message from "@/components/messages";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth, db } from "@/Utils/firebase";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { BsTrash2Fill } from "react-icons/bs";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  //   submit message

  const submitMessage = async () => {
    if (!auth.currentUser) return router.push("/auth/login");
    if (!message) {
      toast.error("Dont leave an empty message ...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //   get comments

  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessage(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, []);

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            className="px-2 bg-gray-600 w-full text-white"
            type="text"
            value={message}
            placeholder="send a message "
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white  text-sm rounded-r-md py-2 px-2"
          >
            Submit
          </button>
        </div>

        <div>
          <div className="py-6">
            <h2 className="font-bold">Comments</h2>
            {allMessage?.map((message) => (
              <div
                key={message.time.toMillis()}
                className="bg-white p-4 my-4 border-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={message.avatar}
                    alt="avatar"
                    className="w-10 rounded-full"
                  />
                  <p>{message.userName}</p>
                </div>
                <p>
                  {message.message}
                  <BsTrash2Fill />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
