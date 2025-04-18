import { firebase } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
        const userRef = doc(firebase, "users", uid);
        await updateDoc(userRef, updatedData);

        return { success: true, msg: "Updated successfully"}
    } catch (error: any ) {
        return { success: false, msg: error?.message }
    }
}