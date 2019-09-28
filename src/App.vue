<template>
  <div id="app">
    <nav class="d-flex navbar navbar-light bg-light">
      <a class="navbar-brand order-2" href="#"><img class="navbar-brand logo" src="./assets/logo.png"></img></a>
      <button class="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-for="(nav, index) in navbarNav">
                <span><router-link :to="nav.page" class="my-link" :key="index">{{ nav.name }}</router-link></span>
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
.logo {
    width: 30px;
    margin-right: -10px;
}
.my-link {
    color: #2c3e50;
}
h1.main-title {
    color: #013220;
    margin-bottom: 30px;
    margin-top: 10px;
    font-size: 28px;
}

.logo {
    width: 40px;
    padding-right:10px;
}

button.navbar-toggler {
    
}
/* ------------------------------Лера------------------------------- */
    body {
        background-color: #d0f0c0;
    }

    .btn.btn-primary {
        border-color: #013220;
        background-color:#013220;
        margin:10px 0;
    }

    .link {
        color: #013220;
    }


    .forget_password_link {
        font-size:13px;
    }

    .forget_password_link_container {
        text-align: right;
        margin: -20px 0 15px 0;
    }



    span.mini-title {
        color:#013220;
        font-size:16px;
        font-weight:bold;
    }

    span.red-text {
        color:red;
    }

    .green-title {
        color: #488042;
        font-weight:bold;
    }

    ul.special-markers > li:before{
        content: '✔  ';
        position: absolute; top: 0; left: -25px;
        color: #013220;
    }

    ul.special-markers{
        list-style: none;
    }
    ul.special-markers > li{
        position: relative;
        margin: 10px;
    }



    .btn.btn-success {
        width: 130px;
        height: 80px;
        margin-right: 10px;
        color:white;
        font-size: 13px;
        margin-bottom:20px;
        text-align: center;
    }

    .btn-success.one {
        border-color:#488042;
        background-color: #488042;
    }

    .btn-success.two {
        border-color: #013220;
        background-color: #013220;
    }

    .footer {
        text-align:center;
        background-color: #013220;
        color:white;
        font-size: 10px;
        height: 20px;
        width:100%;
        position: absolute;
        bottom: 0;
        left:0;
    }

    .footer-special {
        text-align:center;
        background-color: #013220;
        color:white;
        font-size: 10px;
        height: 20px;
        width:100%;
        padding:0px;
        margin:20px 0 0 0;
    }

    .btn.btn-link.collapsed {
        text-align: left;
    }
</style>
