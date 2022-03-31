import {CustomResponse} from "../../utils/util"
import Web3Service from "../../config/web3Service";
const _web3Service = new Web3Service();


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
        async fetch({commit, dispatch}){
            const response = new CustomResponse();
            try{
                await _web3Service.getAccounts();
                const pollsLength = await _web3Service.call('getTotalPolls');
                console.log('length:', pollsLength)
                const tmpArr = [];
                for(let count = 0; count < pollsLength; count++){
                    const _poll = await _web3Service.call('getPoll', count);
                    tmpArr.push({
                        id: _poll[0],
                        data: {
                            question : _poll[1],
                            results : _poll[2].map(result=>Number.parseInt(result)),
                            options : _poll[3].map(_web3Service.stringFromBytes32),
                            thumbnail : _poll[4],
                            voters: _poll[5],
                            createdBy: _poll[6],
                            createdAt: Number.parseInt(_poll[7])
                        }
                    })
                }
                commit('setPolls', tmpArr);
                _web3Service.onEvents('pollCreated', (_payload)=>{
                    console.log(_payload);
                    dispatch('fetch');
                })
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async add({dispatch}, poll){
            const response = new CustomResponse();
            try{
                await _web3Service.getAccounts();
                response.data.txHash = await _web3Service.execTransaction(
                    'createPoll',
                    poll.question,
                    poll.thumbnail,
                    poll.options.map(option=>_web3Service.stringToByte32(option))
                    );
                dispatch('fetch');
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        },
        async vote({dispatch}, {poll, selectedIdx}){
            const response = new CustomResponse();
            try{
                await _web3Service.getAccounts();
                response.data.txHash = await _web3Service.execTransaction(
                    'vote',
                    poll.id,
                    selectedIdx
                );
                dispatch('fetch');
            }catch (e){
                response.onError(e.message)
            }
            return Promise.resolve(response);
        }
    }
}