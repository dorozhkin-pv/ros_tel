<template>
    <div class="home">
        <h1>Начни думать о планете сегодня!</h1>

        <h3>Выберите тип мусора для утилизации</h3>

        <form @submit.prevent>
            <div class="form-check" v-for="(item, index) in selected">
                <input class="form-check-input"
                       :id="index"
                       :key="index"
                       type="checkbox"
                       :value="item"
                       @change="onChange(index, $event.target)">
                <label class="form-check-label" :for="index">{{ item }}
                </label>
            </div>
         
            <button type="submit" class="btn btn-primary" @click="goToCard">Найти</button>
        </form>
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
        background: url('../assets/main.jpg') no-repeat;
        background-size: cover;
    }
</style>
