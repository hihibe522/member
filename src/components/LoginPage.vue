<template>
    <div>
        <div class="container">
            <div class="loginBox">
                <h1>加入會員</h1>
                <ul>
                    <li>
                        <div>
                          <ui-textbox
                              floating-label
                              help="必填，可輸入4-20碼英文小寫、數字"
                              label="帳號"
                              :error="rules.account.errMsg"
                              :invalid="user.account.error"
                              v-model="userAccount"
                          >
                          </ui-textbox>
                        </div>
                    </li>
                    <li>
                        <div>
                            <ui-textbox
                                floating-label
                                type="password"
                                help="必填，可以輸入輸入6-12碼英文小寫、數字"
                                label="密碼"
                                :error="rules.password.errMsg"
                                :invalid="user.password.error"
                                v-model="userPassword"
                            >
                            </ui-textbox>
                        </div>
                    </li>
                    <li>
                        <div>
                            <ui-textbox
                                floating-label
                                type="password"
                                help="請再次確認密碼"
                                label="確認密碼"
                                :error="rules.checkPwd.errMsg"
                                :invalid="user.checkPwd.error"
                                v-model="doubleCheckPwd"
                            >
                            </ui-textbox>
                        </div>
                    </li>
                    <li>
                        <div>
                            <ui-textbox
                                floating-label
                                help="必填，不輸入數字、空白及特殊符號"
                                label="姓名"
                                :error="rules.userName.errMsg"
                                :invalid="user.userName.error"
                                v-model="userName"
                            >
                            </ui-textbox>
                        </div>
                    </li>
                    <li>
                        <div>
                            <ui-select
                                floating-label
                                label="請選擇性別"
                                :options="genter"
                                v-model="userGender"
                            >
                            </ui-select>
                        </div>
                    </li>
                    <li>
                        <div>
                            <ui-textbox
                                floating-label
                                help="需符合電子郵箱格式"
                                label="電子信箱"
                                name="userEmail"
                                v-model="userMail"
                                :error="rules.userMail.errMsg"
                                :invalid="user.userMail.error"
                            >
                            </ui-textbox>
                        </div>
                    </li>
                </ul>
                <ui-button
                    class="sendBtn"
                    color="primary"
                    size="large"
                    @click="sendMyInfo('modal1')"
                >送出
				        </ui-button>
            </div>
        </div>
        <ui-modal ref="modal1" title="會員資料">
            <ul class="modal-ul">
                <li v-for="(item, key) in getFinalInfo" :key="key">
                    <div>
                        <span>{{key}}</span>
                        <p>{{item}}</p>
                    </div>
                </li>
            </ul>
        </ui-modal>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: 'LoginPage',
    data () {
        return {
            genter:[
                {label: "男生", value: "male"},
                {label: "女生", value: "female"}
            ]
        }
    },
    computed: {
        ...mapState(['user', 'rules']),
        ...mapGetters(['getFinalInfo']),
        userAccount: {
            get() {
                return this.user.account.value;
            },
            set(val) {
                let { account } = this.rules;
                let re = new RegExp(account.pattern);
                this.textInValue({
                    type: 'account',
                    error: !(re.test(val) && val),
                    value: val
                });
            }
        },
        userPassword: {
            get() {
                return this.user.password.value;
            },
            set(val) {
                let { password } = this.rules;
                let re = new RegExp(password.pattern);
                this.textInValue({
                    type: 'password',
                    error: !(re.test(val) && val),
                    value: val
                });
                // if (this.user.checkPwd.value && (this.user.password.value !== this.user.checkPwd.value)) {
                //     this.textInValue({
                //         type: 'checkPwd',
                //         error: true,
                //         value: this.user.checkPwd.value
                //     });
                // } else {
                //     this.textInValue({
                //         type: 'checkPwd',
                //         error: false,
                //         value: this.user.checkPwd.value
                //     });
                // }
                if (this.user.checkPwd.value) {
                    if (this.user.password.value !== this.user.checkPwd.value) {
                        this.textInValue({
                            type: 'checkPwd',
                            error: true,
                            value: this.user.checkPwd.value
                        });
                    } else {
                        this.textInValue({
                            type: 'checkPwd',
                            error: false,
                            value: this.user.checkPwd.value
                        });
                    }
                }
            }
        },
        doubleCheckPwd: {
            get() {
                return this.user.checkPwd.value;
            },
            set(val) {
                this.textInValue({
                    type: 'checkPwd',
                    error: !((val === this.user.password.value) && val),
                    value: val
                });
            }
        },
        userName: {
            get() {
                return this.user.userName.value;
            },
            set(val) {
                let { userName } = this.rules;
                let re = new RegExp(userName.pattern);
                this.textInValue({
                    type: 'userName',
                    error: !(re.test(val) && val),
                    value: val
                });
            }
        },
        userGender: {
            get() {
                return this.user.userGender;
            },
            set(val) {
                this.textInValue({
                    type: 'userGender',
                    value: val.value,
                    label: val.label
                });
            }
        },
        userMail: {
            get() {
                return this.user.userMail.value;
            },
            set(val) {
                let { userMail } = this.rules;
                let re = new RegExp(userMail.pattern);
                this.textInValue({
                    type: 'userMail',
                    error: !(re.test(val) || !val),
                    value: val
                });
            }
        }
    },
    methods: {
        ...mapActions(['textInValue', 'sendInfo']),
        sendMyInfo(ref) {
            let { account, password, checkPwd, userName, userGender, userMail } = this.user;
            let data = {
                type: '',
                error: false
            };
            if (!account.value) {
                data.type = 'account';
                data.error = true;
                this.textInValue(data);
                return;
            }
            if (!password.value) {
                data.type = 'password';
                data.error = true;
                this.textInValue(data);
                return;
            }
            if (!checkPwd.value || checkPwd.value !== password.value) {
                data.type = 'checkPwd';
                data.error = true;
                this.textInValue(data);
                return;
            }
            if(!userName.value) {
                data.type = 'userName';
                data.error = true;
                this.textInValue(data);
                return;
            }
            let vals = Object.keys(this.user).map(key => {
                return this.user[key];
            });
            let errRules = vals.filter(item => {
                return item.error === true;
            });

            if (errRules.length) {
                alert("請確認內容格式");
                return;
            }
            this.sendInfo({
                account: account.value,
                password: password.value,
                userName: userName.value,
                userGender: userGender.value,
                userMail: userMail.value,
            });
            this.$refs[ref].open();
        }
    },
}
</script>

<style scoped>

h1 {
    color: gray;
    padding: 26px;
}

.loginBox {
    width: 40%;
    padding: 10px 30px;
    margin: 0 auto;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
}

ul, li {
    list-style:none;
}

.sendBtn {
    margin: 30px auto;
    width: 50%;
    cursor: pointer;
}

.modal-ul {
    font-size: 1.2rem;
}

.modal-ul span {
    color: #2E9688;
}

.modal-ul p {
    padding-left: 20px;
}





</style>
