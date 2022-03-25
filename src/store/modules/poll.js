import {CustomResponse} from "../../utils/util"
import {firestore, pollStore} from "../../firebase/firebase";
import {
    addDoc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    doc,
    arrayUnion
} from "firebase/firestore"

export default {
    namespaced: true,
    state: {
        polls: []
    },
    getters: {
        polls: state => state.polls
    },
    mutations: {
        setPolls: (state, payload) => state.polls = payload
    },
    actions: {
        fetch({commit}){
            const q = query(pollStore, orderBy('createdAt', 'desc'))
            onSnapshot(q, snapshot=>{
                const tmp_arr = [];
                snapshot.forEach(doc=>tmp_arr.push({id: doc.id, data: doc.data()}));
                commit('setPolls', tmp_arr)
            })
        },
        async add(context, poll){
            const response = new CustomResponse();
            try{
                response.data = await addDoc(pollStore, poll.toJSON());
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async vote({rootGetters}, {poll, selectedIdx}){
            const response = new CustomResponse();
            const user = rootGetters['user/user']
            try{
                poll.data.results.push(selectedIdx);
                response.data = await updateDoc(doc(firestore, "polls", poll.id), {
                    results: poll.data.results,
                    voters: arrayUnion(user.id)
                });
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        }
    }
}