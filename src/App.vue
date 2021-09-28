<template>
  <nav class="navbar navbar-expand navbar-light bg-light shadow">
      <a href="/home" class="navbar-brand">SynLine</a>
      <div class="navbar-nav mr-auto">
        
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li v-if="!showAdminBoard" class="nav-item">
          <router-link to="/cart" class="nav-link">
            <font-awesome-icon icon="shopping-basket" /> Cart
          </router-link>
        </li>

      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
          <button class="btn btn-primary">
            Sign Up
          </button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
          <button class="btn btn-outline-primary">
             Login
          </button>
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a v-if="!showAdminBoard" href="/user/sales" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.name }}
          </a>
          <a v-if="showAdminBoard" href="/sales" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.name }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <button class="btn btn-danger">
               Log Out
            </button>
          </a>
        </li>
      </div>
  </nav>  
    
  <router-view />

</template>

<script>

export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_USER');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.error-feedback{
  color: red;
}
</style>
