<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>

        </div>
        <div class="register col-md-4">
          <form>
            <div class="container">

              <label for="email"><b>Email</b></label>
              <input v-model="user.email" type="text" placeholder="Enter Email" name="email" id="email" required>

              <label for="psw"><b>Password</b></label>
              <input v-model="user.password" type="password" placeholder="Enter Password" name="psw" id="psw" required>

              <label for="psw-repeat"><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
              <hr>

            </div>


          </form>

        </div>
        <div class="col-md-4">
          <label for="username"><b>Username</b></label>
          <input v-model="user.username" type="text" placeholder="Enter Username" name="username" id="username" required>

          <label for="name"><b>Name</b></label>
          <input v-model="user.name" type="text" placeholder="Enter Name" name="name" id="name" required>

          <label for="lastname"><b>Enter Lastname</b></label>
          <input v-model="user.lastname" type="text" placeholder="Enter Lastname" name="lastname" id="lastname" required>
        </div>
        <div class="col-md-4">
          <label for="department"><b>Department</b></label>
          <input v-model="user.department" type="text" placeholder="Enter Department" name="department" id="department" required>
        </div>
        <div class="col-md-12">
<!--          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>-->
          <button @click="register()" type="submit" class="btn btn-primary w-25">Register</button>
          <div class="container signin">
            <p>Already have an account?
              <router-link to="/login">Sign in</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AuthService from "@/service/AuthService";
import User from "@/model/User";

export default {
  name: "RegisterPage",
  data() {
    return {
      user: new User("", "", "", "", "", "")
    }
  },
  methods: {
    register() {
      AuthService.register(this.user)
          .then(res => {
            alert("User registered Successfully")
            console.log(res.data)
            location.reload()
            this.$router.push("/login")
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