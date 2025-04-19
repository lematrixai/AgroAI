import { firebase } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
        // updated image
        if(updatedData.image && updatedData?.image?.uri) {
            const imageUploadRes = await uploadFileToCloudinary(updatedData.image, "users");

            if (!imageUploadRes.success) {
                return {
                    success: false,
                    msg: imageUploadRes.msg || "Failed to upload image"
                }
            }

            updatedData.image = imageUploadRes.data;
        }

        // update username
        const userRef = doc(firebase, "users", uid);
        await updateDoc(userRef, updatedData);

        return { success: true, msg: "Updated successfully"}
    } catch (error: any ) {
        return { success: false, msg: error?.message }
    }
}







