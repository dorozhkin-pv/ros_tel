<template>
    <div class="home">
        <h1 class="main-title">Проект Smart Garbage</h1>
        <p cLASS="slogan">Утилизируйте мусор - спасайте планету - получайте бонусы и подарки</p>
        <p>Выберите тип мусора для утилизации</p>
        <div class="my-form mt-1">
            <div class="flexmy">
                <div class="form-check" :class="(checked.indexOf(item.tag_id) > -1 ? 'checked' : 'not-checked')+' '+item.image" v-for="(item, index) in tags" @click="checkButton(item.tag_id)">
                    <div class="help" v-on:click.stop="header={header: item.name, description: item.description}">?</div>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary" @click="goToCard">Найти</button>

        <div class="description" v-if="header">
            
            <span v-html="header.description"></span>
            <div class="close" @click="header = false;">X</div>

            
        </div>

    </div>
</template>

<script>
export default {
  data() {
        return {
            selected: this.$store.getters.typeOfGarbage,
            checked: [],
            header: false
        }
    },
    computed:{
      tags(){
          return this.$store.getters.tags;
      }
    },
    created() {
        this.$store.dispatch('addTag');
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
        color: white;
        background-color: #013220;
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
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
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
        overflow: auto;
    }

    .close {
        position: absolute;
        left: 90%;
        top: 10px;
    }

    .slogan {
        color:#013220;
        font-weight: bold;
       padding: 0 2px;
       margin-bottom: 20px;
    }
</style>
