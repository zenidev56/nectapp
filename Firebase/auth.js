import { auth, googleAuthProvider } from "@/config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

export class AuthService {
    async signInWithEmailAndPassword(email, password) {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
        } catch (error) {
            throw (error);
        }
    }

    async signInWithGoogle() {
        try {
            const res = await signInWithPopup(auth, googleAuthProvider);
            return res;
        } catch (error) {
            throw (error);
        }
    }
    async logout() {
        try {
            const res = await signOut(auth);
            return true;
        } catch (error) {
            throw (error);
        }
    }

}
const authService = new AuthService();
export default authService;