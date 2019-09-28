<template>
    <div>
        <h1 class="main-title">Авторизуйтесь</h1>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Номер телефона</label>
                <input type="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="forget_password_link_container">
                <a href="#" class="forget_password_link link">Забыли пароль?</a>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="registration_link_container">
            <a href="#" class="registration_link link">Зарегистрироваться</a>
        </div>
    </div>
</template>

<script>
export default {
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>


