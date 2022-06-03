<template>
  <div id="app">
    <nav class="navbar navbar-expand fixed-top navbar-light bg-primary">
      <div class="container">
        <a class="navbar-brand text-white" href="/">MyApp</a>
        <div class="navbar-nav mr-auto">
          <router-link v-if="user" to="/upload" class="nav-link text-white text">
            Share Document
          </router-link>
          <router-link v-if="user" to="/me" class="nav-link text-white text-capitalize">
            {{ user.name }}
          </router-link>

        </div>
      </div>
      <div style="cursor: pointer;" v-if="user" class="nav-link text-danger" @click="logout()">
        Logout
      </div>
    </nav>

    <div class="router-view-body">
      <router-view/>
    </div>
  </div>
</template>
<script>
import AuthService from "@/service/AuthService";
export default {
  name: 'App',
  components: {},
  data() {
    return {
      isLoggedIn: false,
      user: null
    }
  },
  methods: {
    logout() {
      AuthService.logout();
      location.reload();
    }
  },
  mounted() {
    if (!localStorage.getItem('user')) {
      this.$router.push("/login").catch(() => {
      })
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  },
  computed: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-view-body {
  padding-top: 55px;
}

</style>
