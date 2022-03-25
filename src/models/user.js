import {serverTimestamp} from "firebase/firestore"

class User{
    constructor() {
        this.createdAt = serverTimestamp();
        this.username = "";
        this.avatar = ""
    }

    toJSON(){
        return {
            createdAt: this.createdAt,
            username: this.username,
            avatar: this.avatar
        }
    }
}

export default User