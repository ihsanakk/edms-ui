<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="login col-md-6">
          <form name="form" @submit.prevent="login">
            <div class="container">
              <h1>Login</h1>
              <p>Please fill in this form to login.</p>
              <hr>

              <label for="username"><b>Username</b></label>
              <input v-model="user.username" type="text" placeholder="Enter Username" name="username" id="username" required>

              <label for="psw"><b>Password</b></label>
              <input v-model="user.password" type="password" placeholder="Enter Password" name="psw" id="psw" required>

              <hr>
              <button @click="login()" class="btn btn-primary w-100">Login</button>
            </div>

            <div class="container signin">
              <p>You don't have an account?
                <router-link to="/register">Register</router-link>
                .
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/service/AuthService";
import User from "@/model/User";
export default {
  name: "LoginPage",
  data() {
    return {
      user: new User("","",""),
      username:"",
      password:""
    }
  },
  methods: {

    login() {
      this.user = AuthService.login(this.user)
      .then(response => {
        if (response.data.id) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.user = response.data;
          this.$router.push("/").catch(()=> {})
          location.reload();
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    }

  }
}
</script>

<style scoped>
@import "../assets/css/login-page.css";
</style>