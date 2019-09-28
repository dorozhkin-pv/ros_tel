<template>
  <div id="app">
    <nav class="navbar navbar-light bg-success">
      <a class="navbar-brand" href="#"><img class="navbar-brand logo" src="./img/logo.png"></img></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-for="nav in navbarNav">
                <router-link :to="nav.page" class="my-link">{{ nav.name }}</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>

  </div>
</template>

<script>
    export default {
      data() {
        return {
            navbarNav: this.$store.getters.navbarNav,
            links: []
        }
      },
        computed:{
            currentRouteName() {
                return this.$route.name;
            }
        }
    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #fff;
    }
  }
}
.my-link {
    color: #fff;
}
</style>
