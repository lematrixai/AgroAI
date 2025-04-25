import { auth, firebase } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types"
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            setUser({
                uid: firebaseUser?.uid,
                name: firebaseUser.displayName || null,
                email: firebaseUser.email || null,
            });
            updateUserData(firebaseUser?.uid);
            router.replace("/(tabs)/home");
        } else {
            setUser(null);
            router.replace("/(auth)/welcome");
        }
    })
    return () => unsub();
}, [])


  const login = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return {success: true, msg: "Login successful"}
    } catch (error: any) {
        let msg = error.message;
        if(msg.includes("(auth/invalid-credential)")) msg = "Invalid credentials";
        if(msg.includes("(auth/invalid-email)")) msg = "Invalid email";
        if(msg.includes("(auth/user-not-found)")) msg = "User not found";
        if(msg.includes("auth/network-request-failed")) msg = "You are offline: Connect to the internet to conitue login";
        return {success: false, msg }
        
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
        let response = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(firebase, "users", response?.user?.uid), {
            name,
            email,
            uid: response?.user?.uid,
        });
        
        return {success: true, msg: "register successful"}
    } catch (error: any) {
        let msg = error.message;
        if(msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
        if(msg.includes("(auth/weak-password)")) msg = "Password should be at least 6 characters";
        if(msg.includes("(auth/operation-not-allowed)")) msg = "Operation not allowed";
        if(msg.includes("(auth/invalid-email)")) msg = "Invalid email";
        if(msg.includes("auth/network-request-failed")) msg = "You are offline: Connect to the internet to continue register";
        return {success: false, msg }
        
    }
  }

  const updateUserData = async (uid: string,  ) => {
    try {
        const docRef = doc(firebase, "users", uid);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            const data = docSnap.data();
            const userData: UserType = {
                uid: data?.uid,
                name: data.name || null,
                email: data.email || null,
                image: data.image || null,
            };
            setUser({ ...userData });
        }
        return {success: true, msg: "User data updated"}
    } catch (error: any) {
        let msg = error.message;
        console.log("error", error);
    }
  }

  const contextValue: AuthContextType = {
    login,
    register,
    user,
    setUser,
    updateUserData,
  }

  return(
    <AuthContext.Provider value={contextValue} >
        {children}
    </AuthContext.Provider>
  )
}
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}