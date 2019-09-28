<template>
	<div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="main-title">Компаниям</h1>
                <p>Выберите свою роль</p>
                
                <div class="mycontainer">
                    <button type="button" class="btn btn-success one" @click="goToList">Мне нужно вывозить мусор</button>
                    <button type="button" class="btn btn-success two">Я - организация утилизатор</button>
                </div>  
                <p>В приложении "Утилизируй мусор" вы можете</p>
                <ul>
                    <li>найти организацию для периодического вывоза мусора</li>
                    <li>найти компанию, которой требуется постоянная утилизация отходов</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    goToList(){
        this.$router.push({ path: 'list' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
