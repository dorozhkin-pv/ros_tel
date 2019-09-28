<template>
    <div class="home">
        <h1 class="main-title">Организации-утилизатору</h1>
        <p>Добавление нового пункта утилизации</p>
        <div class="point pointone"> 1. Выберите типы перерабатываемого мусора </div>
        <div class="my-form mt-1">
            <div class="flexmy">
                <div class="form-check" :class="(checked.indexOf(item.tag_id) > -1 ? 'checked' : 'not-checked')+' '+item.image" v-for="(item, index) in tags" @click="checkButton(item.tag_id)">
                </div>
            </div>
        </div>

        <div class="point pointtwo"> 2. Выберите тип нового пункта </div>
        <select class="form-control form-control-lg">
        <option>Пункт утилизации</option>
        <option>Организация по вывозу мусора</option>
        <option>Одиночная мусорка</option>
        </select>

        <div class="point pointhree"> 3. Укажите режим работы </div>
        <label class="pointtwo_time">Начало работы<input type="time"></label>
        <label class="pointtwo_time">Завершение работы<input type="time"></label>

        <button type="submit" class="btn btn-primary" @click="goToCard">Перейти к шагу 4</button>


        <div class="description" v-if="header">
            <h1>{{ header.header }}</h1>
            <div class="close" @click="header = false;">X</div>

            <p>{{ header.description }}</p>
        </div>

    </div>
</template>

<script>
export default {
  data() {
        return {
            selected: this.$store.getters.typeOfGarbage,
            checked: [],
            tags: [],
            header: false
        }
    },
    created() {
        this.$store.dispatch('addTag');
        this.tags = this.$store.getters.tags;
    },
    methods: {
        checkButton(value){
            if(this.checked.indexOf(value) != -1){
                this.checked.splice(this.checked.indexOf(value), 1);
            } else {
                this.checked.push(value);
            }

            this.$store.commit('setTypeOfGarbage', this.checked);
        },
        goToCard(){
            this.$router.push({ path: 'card' });
        }/*,
        setTags(tags){
//            this.$set(this.tags, tags);
            console.log('tags', tags);
            this.tags = tags;
        }*/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
    .home {
        height:100%;
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
    .flexmy {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: 391px;
        overflow: auto;
        width:100%;
    }

    .form-check {
        width:33.3%;
        height:100px;
        mix-blend-mode: multiply;
    }

    .checked {

    }

    .not-checked {
        filter: grayscale(100%);
    }

    .aero.not-checked {
        opacity: 0.5;
    }

    .battery.not-checked {
        opacity: 0.5;
    }

    .aero {
        background-image: url('../assets/trash/aero.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .thermo {
        background-image: url('../assets/trash/thermo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .battery {
        background-image: url('../assets/trash/battery.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .chemy {
        background-image: url('../assets/trash/chemy.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .metal {
        background-image: url('../assets/trash/metal.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .organic {
        background-image: url('../assets/trash/oraganic.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .paper {
        background-image: url('../assets/trash/paper.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .plastic {
        background-image: url('../assets/trash/plastic.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .glass {
        background-image: url('../assets/trash/glass.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-full {
        width: 100%;
        height: 50px;
        color: black;
        background-color: green;
        position: absolute;
        bottom: 0;
        left:0;
    }

    .form-check {
        margin-bottom: 30px;
    }

    .help {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        border-radius: 15px;
        font-size: 13px;
    }

    .btn {
        /* align-self: center; */
    }

    .description {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 9999;
        left: 0;
        top: 0;
        background-color: white;
    }

    .close {
        position: absolute;
        left: 90%;
        top: 10px;
    }
    .pointtwo_start, .pointtwo_finish {
        font-size: 15px;
        margin-top: 10px;
    }
    .pointtwo_time {
        text-align: left;
        padding-left: 20px;
        width: 100%;
        input[type="time"] {
            margin-left: 10px;
            width: 30%;
            float: right;
            margin-right: 20px;
        }
    }

    

    .point {
        text-align: left;
        padding-left: 20px;
        margin-top: 20px;
        padding-bottom: 5px;
    }
</style>
