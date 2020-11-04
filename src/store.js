import Vue from 'vue' ;
import Vuex from 'vuex' ;
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            account: {},
            password: {},
            checkPwd: {},
            userName: {},
            userGender: {
                value: '',
                label: ''
            },
            userMail: {}
        },
        rules: {
            account: {
                pattern: '^[a-z0-9]{4,20}$',
                errMsg: '請輸入4-20碼英文小寫、數字'
            },
            password: {
                pattern: '^[a-z0-9]{6,12}$',
                errMsg: '請輸入6-12碼英文小寫、數字'
            },
            checkPwd: {
                errMsg: '請確認輸入密碼欄位是否相同',
            },
            userName: {
                pattern: '^[^@#$%^&+=\\d\\s]*$',
                errMsg: '必填，請勿輸入數字、空白及特殊符號'
            },
            userMail: {
                pattern: '^([a-z0-9_\\.-]+)@([\\da-z\.-]+)\\.([a-z\\.]{2,6})$',
                errMsg: '需符合電子郵箱格式'
            }
        },
        finalInfo: {
            account: '',
            password: '',
            userName: '',
            userGender: '',
            userMail: ''
        }
    },
    actions: {
        textInValue({ commit }, data) {
            commit('USER_INFO', data);
        },
        sendInfo({ commit }, data) {
            commit('FINAL_INFO', data);
        }
    },
    mutations: {
        USER_INFO(state, data) {
            let { type, value , error, label } = data;
            state.user[type] = {
                'value': value,
                'label': label,
                'error': error,
            };
        },
        FINAL_INFO(state, data) {
            state.finalInfo = data;
        }
    },
    getters: {
        getFinalInfo: state => state.finalInfo
    }
})
