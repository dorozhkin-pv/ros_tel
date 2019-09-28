<template>
    <div class="home">
        <h1>Начни думать о планете сегодня!</h1>

        <h3>Выберите тип мусора для утилизации</h3>

        <div class="my-form mt-5">
            <form @submit.prevent>
                <div class="form-check" v-for="(item, index) in selected">
                    <div class="my-img" :style="'background-position: 30px 30px'"></div>
                    <input class="form-check-input"
                           :id="index"
                           :key="index"
                           type="checkbox"
                           :value="item.name"
                           @change="onChange(index, $event.target)">
                    <label class="form-check-label" :for="index">{{ item.name }}
                    </label>
                </div>
             
                <button type="submit" class="btn btn-primary mt-2" @click="goToCard">Найти</button>
            </form>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
        return {
            selected: this.$store.getters.typeOfGarbage,
            checked: []
        }
    },
    methods: {
        onChange(index, event){
            this.$set(this.checked, index, event.checked);  //отослать на сервер

            console.log(this.checked);

            this.$store.commit('setTypeOfGarbage', this.checked);
        },
        goToCard(){
            this.$router.push({ path: 'card' });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .home {
        height: calc(100vh - 56px);
        background: url('../assets/main.jpg') no-repeat center;
        background-size: cover;
    }
    .my-img {
        position: absolute;
        left: -40px;
        width: 30px;
        height: 50px;
        background: url('../assets/trash/polee-priviki.jpg');
        background-position: 0px 0px;
        background-size: 200px;
    }
    .my-form {
        display: flex;
        justify-content: center;
        align-items: center;
        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
    .form-check {
        margin-bottom: 30px;
    }
    .btn {
        /* align-self: center; */
    }
</style>
