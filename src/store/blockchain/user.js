import {CustomResponse} from "../../utils/util";
import Web3Service from "../../config/web3Service";
const _web3Service = new Web3Service();

export default {
    namespaced: true,
    state: {
        user: {id: '', data: {}},
        address: ""
    },
    getters: {
        user: state => state.user,
        address: state => _web3Service.checksumAddress(state.address)
    },
    mutations: {
        setUser: (state, payload) => state.user = payload,
        setAddress: (state, payload) => state.address = payload
    },
    actions: {
        async add(context, user){
            const response = new CustomResponse();
            try{
                response.data.txHash = await _web3Service.execTransaction(
                    'createUser',
                    _web3Service.stringToByte32(user.username),
                    user.avatar
                );
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async initAddress({commit}){
            await _web3Service.getAccounts();
            commit('setAddress', _web3Service.account);
        },
        async init({state, commit, dispatch}){
            const response = new CustomResponse();
            try{
                dispatch('initAddress');
                const _user = await _web3Service.call(
                    'getUser',
                    state.address
                );
                if(_user){
                    commit('setUser', {
                        id: _user[0],
                        data: {
                            username: _user[1],
                            avatar: _user[2],
                            createdAt: Number.parseInt(_user[3]),
                        }
                    });
                }
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        }
    }
}