<template>
  <div id="setting">
    <div class="navbar">
      <NavBars page="normal" />
    </div>
    <div class="setting-right">
      <NavTabs plainText="帳戶設定" />
      <form class="setting-form" @submit.stop.prevent="handleSubmit">
        <div class="form-label-group">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="user.account"
            name="account"
            type="text"
            class="form-control"
            autocomplete="username"
            placeholder="帳號"
            required
            autofocus
          />
        </div>

        <div class="form-label-group">
          <label for="name">名稱</label>
          <input
            id="name"
            v-model="user.name"
            name="name"
            type="text"
            class="form-control"
            autocomplete="username"
            placeholder="名稱"
            required
            autofocus
          />
        </div>

        <div class="form-label-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            name="email"
            type="email"
            class="form-control"
            autocomplete="email"
            placeholder="email"
            required
          />
        </div>

        <div class="form-label-group">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="user.password"
            name="password"
            type="password"
            class="form-control"
            placeholder="密碼"
            autocomplete="new-password"
            required
          />
        </div>

        <div class="form-label-group">
          <label for="password-check">密碼確認</label>
          <input
            id="password-check"
            v-model="user.checkPassword"
            name="checkPassword"
            type="password"
            class="form-control"
            placeholder="密碼確認"
            autocomplete="new-password"
            required
          />
        </div>
        <div class="setting-block">
          <button class="btn" type="submit">儲存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBars from '../components/NavBars.vue'
import NavTabs from '../components/NavTabs.vue'
import userAPI from './../apis/user'
import { Toast } from './../utils/helpers'

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    account: '@root',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
  },
  isAuthenticated: true,
}

export default {
  components: {
    NavBars,
    NavTabs,
  },
  data() {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false,
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.user = dummyUser.currentUser
    },
    // async fetchUser() {
    //  try {
    //     const { id, account, name, email } = this.currentUser;
    //     this.currentUser = {
    //     ...this.currentUser,
    //     id,
    //     account,
    //     name,
    //     email,
    //   };
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: '無法取得用戶資料，請稍後再試',
    //     })
    //   }
    // },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      // TODO: 透過 API 向伺服器更新使用者
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#setting {
  width: 100%;
  display: flex;
}

.navbar {
  margin-left: 6.438rem;
}

.setting-right {
  margin-left: 2.5rem;
  // padding: 0 0 0 1rem;
  flex-grow: 1;
  border-left: 1px solid $popular-border;
}

.setting-form {
  padding: 1.875rem 0 0 1rem;
}

.form-label-group {
  position: relative;
  label {
    position: absolute;
    left: 0.625rem;
    top: 0.313rem;
    color: $input-placeholder;
    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
  }
  input {
    width: 40.125rem;
    height: 3.375rem;
    border-radius: 4px;
    background-color: $input-bg;
    padding: 1.25rem 0 0.25rem 0.625rem;
    margin-bottom: 1.875rem;
    color: $main-text;
    font-size: 19px;
    font-weight: 500;
    @extend %form-input-style;
    &:not(:placeholder-shown):invalid {
      border-bottom: 3px solid $input-underline-error;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px $input-bg inset;
      box-shadow: 0 0 0px 1000px $input-bg inset;
    }
    &::placeholder {
      color: transparent;
    }
    &:not(:placeholder-shown):invalid {
      border-bottom: 3px solid $input-underline-error;
    }
  }
}

.setting-block {
  width: 40.125rem;
  display: inline-flex;
  justify-content: flex-end;
}

.btn {
  border-radius: 50px;
  background-color: $button-color;
  font-size: 18px;
  font-weight: 700;
  color: $button-text;
  margin-top: 0.625rem;
  padding: 0.625rem 2.5rem;
}
</style>
