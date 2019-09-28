<template>
    <div>
        <div v-if="!user.user_id">
            <h1 class="main-title">Авторизуйтесь</h1>
            <form>
                <div class="form-group">
                    <label for="name">Имя</label>
                    <input type="text" v-model="name" class="form-control" id="name" aria-describedby="emailHelp">
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Номер телефона</label>
                    <input type="phone" v-model="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input type="password" v-model="pass" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="forget_password_link_container">
                    <a href="#" class="forget_password_link link">Забыли пароль?</a>
                </div>
            </form>
            <div class="registration_link_container">
                <a href="#" @click="reg()" class="registration_link link">Зарегистрироваться</a> или
                <a href="#" @click="auth()" class="registration_link link">Войти</a>
            </div>
        </div>
        <div v-if="user.user_id">
            Привет, {{ user.name }}.
            У вас на счету {{ user.scores }} баллов.
        </div>
    </div>
</template>

<script>
export default {
  props: {

  },
    data: function(){
      return {
          phone: '',
          pass: '',
          name: '',
      }
    },
    computed: {
        user(){
            return this.$store.getters.auth.user;
        }
    },
    mounted(){
        this.current();
    },
    methods: {
        auth(){
            fetch('https://trashbin.dev.sa-wd.ru/api/v1/auth/login',{
                method: 'POST',
                body: new URLSearchParams({email: this.phone, pass: this.pass})
            }).then(a=>a.json()).then(data => {
                this.$store.commit('setApiToken', data);
                this.current();
                console.log('data', data);
            });
        },
        reg(){
            fetch('https://trashbin.dev.sa-wd.ru/api/v1/auth/register',{
                method: 'POST',
                body: new URLSearchParams({email: this.phone, password: this.pass, name: this.name})
            }).then(a=>a.json()).then(data => {
                this.$store.commit('setApiToken', data);
                this.current();
                console.log('data', data);
            });
        },
        current(){
            fetch('https://trashbin.dev.sa-wd.ru/api/v1/auth/current?api_token='+this.$store.getters.auth.api_token)
                .then(a=>a.json()).then(data => {
                    console.log('user', data);
                this.$store.commit('setAuth', data);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>


