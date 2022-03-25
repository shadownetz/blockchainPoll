import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
import {CustomResponse} from "../../utils/util";
import User from "../../models/user";
import {auth} from "../../firebase/firebase";

export default {
    namespaced: true,
    state: {
        loggedIn: false
    },
    getters: {
        loggedIn(state){
            let status = state.loggedIn;
            onAuthStateChanged(auth, user=>{
                status = !!user
            })
            return status
        }
    },
    mutations: {

    },
    actions: {
       async signUpWithEmailPassword({dispatch}, {email,password}){
            const response = new CustomResponse();
            try{
                const credential = await createUserWithEmailAndPassword(auth, email, password);
                const user = credential.user;
                const newUser = new User();
                newUser.username = user.username
                newUser.avatar = user.avatar;
                await dispatch('user/addWithID', {user: newUser, userID: user.uid}, {root: true});
                await dispatch('user/init', user.uid, {root: true});
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response)
        },
        async signInWithEmailPassword({dispatch}, {email, password}){
            const response = new CustomResponse();
            try{
                const credential = await signInWithEmailAndPassword(auth, email, password);
                const user = credential.user;
                await dispatch('user/init', user.uid, {root: true});
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response)
        },
        async logOut(){
           return auth.signOut()
        }
    }
}