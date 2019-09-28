<template>
    <div class="home">
        <h1>Начни думать о планете сегодня!</h1>

        <h3>Выберите тип мусора для утилизации</h3>

        <form @submit.prevent>
            <div class="form-check" v-for="(item, index) in tags">
                <input class="form-check-input"
                       :id="item.tag_id"
                       :key="index"
                       type="checkbox"
                       :value="item.tag_id"
                       @change="onChange(item.tag_id, $event.target)">
                <label class="form-check-label" :for="index">{{ item.name }}
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
            checked: [],
            tags: []
        }
    },
    mounted() {
        fetch("/api/v1/tag").then(response => response.json()).then(data => this.setTags(data.data));
    },
    methods: {
        onChange(index, event){
            this.$set(this.checked, index, event.value);  //отослать на сервер

            console.log(this.checked);

            this.$store.commit('setTypeOfGarbage', this.checked);
        },
        goToCard(){
            this.$router.push({ path: 'card' });
        },
        setTags(tags){
//            this.$set(this.tags, tags);
            console.log('tags', tags);
            this.tags = tags;
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
