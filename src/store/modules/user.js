import {CustomResponse} from "../../utils/util";
import {addDoc, setDoc, doc, getDoc} from "firebase/firestore";
import {firestore, userStore} from "../../config/firebase";

export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}},
    },
    getters: {
        user: state => state.user,
    },
    mutations: {
        setUser: (state, payload) => state.user = payload,
    },
    actions: {
        async add(context, user){
            const response = new CustomResponse();
            try{
                response.data = await addDoc(userStore, user.toJSON());
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async addWithID(context, {user, userID}){
            const response = new CustomResponse();
            try{
                response.data = await setDoc(doc(firestore, "users", userID), user.toJSON());
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async init({commit}, userID){
            const response = new CustomResponse();
            try{
                const user = await getDoc(doc(firestore, "users", userID));
                commit('setUser', {
                    id: user.id,
                    data: user.data()
                });
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        }
    }
}