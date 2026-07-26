import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CreateUserProfileParams {
  uid: string;
  fullName: string;
  email: string;
}

export async function createUserProfile({
  uid,
  fullName,
  email,
}: CreateUserProfileParams) {
  await setDoc(doc(db, "users", uid), {
    uid,
    fullName,
    email,
    createdAt: serverTimestamp(),
  });
}