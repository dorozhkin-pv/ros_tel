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

        <div style="height: 300px">
            <div ref="map" v-bind:style="{ width: '100%', height: '300px' }"></div>
        </div>

        <button type="submit" class="btn btn-primary" @click="saveBin()">Сохранить</button>


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
            header: false,
            trashBins: [],
            map: {},
            platform: {},
            lat: '',
            lng: '',
            description: '',
            name: '',
            showedTrashBin: false,
            block: 'map',
            timer: null,
            findText: ''
        }
    },
    created() {
        this.$store.dispatch('addTag');
        this.tags = this.$store.getters.tags;
        this.platform = new H.service.Platform({
//            "app_id": 'yGQwElInyFe9aWTCBSjj',
//            "app_code": 'FRNa10auc3Pi_tOo00RJDA',
            "apikey": "G5eJQLddyvvvXbEIAjSD66fDE939PDbaYOErvyYoXuY",
//            useHTTPS: true
        });
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.defaultLayers = this.platform.createDefaultLayers();

        console.log('map', this.platform, this.lat, this.lng);

        this.map =
            new H.Map(
                this.$refs.map,
                this.defaultLayers.raster.normal.map,
                {
                    zoom: 15,
                    center: { lng: this.lng, lat: this.lat }
                }
            );

        this.map.addEventListener('tap',  (evt) => {
            var coord = this.map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);

            this.lat = coord.lat;
            this.lng = coord.lng;

            this.map.removeObjects(this.map.getObjects ());

            this.addDomMarker({
                position: {
                    lat: this.lat,
                    lng: this.lng
                },
                name: 'Я',
                distance: 0,
                noEvents: true
            });
        });

        this.addDomMarker({
            position: {
                lat: this.lat,
                lng: this.lng
            },
            name: 'Я',
            distance: 0,
            noEvents: true
        });

        this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

// Create the default UI components
        this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
    })
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
        },
        goToLegend(){
            this.$router.push({ path: 'legend' });
        },
        saveBin(){

            fetch('https://trashbin.dev.sa-wd.ru/api/v1/call/trashBin/addBin',{
                method: 'POST',
                body: new URLSearchParams({
                    tags: this.checked,
                    lat: this.lat,
                    lng: this.lng,
                    description: 'созданая точка',
                    how_to_find: 'как найти точку надпись',
                    time_from: this.time_from || '00:00',
                    time_to: this.time_to || '23:59',
                    scores: 1000,
                    name: 'Новая точка #'+(new Date).getSeconds()
                })
            }).then(a=>a.json()).then(data => {
                this.goToCard();
            });
        },


        setBin(domIcon) {
            this.showedTrashBin = domIcon.trashBin || domIcon;
        },
        setDataForPopup(desc, name){
            this.description = desc;
            this.name = name;
        },
        setTags(tags){
            console.log('tags', tags);
            this.tags = tags;
        },
        addDomMarker(marker) {
            console.log('marker', marker);
            var outerElement = document.createElement('div'),
                innerElement = document.createElement('div');

            outerElement.style.userSelect = 'none';
            outerElement.style.webkitUserSelect = 'none';
            outerElement.style.msUserSelect = 'none';
            outerElement.style.mozUserSelect = 'none';
            outerElement.style.cursor = 'default';

            innerElement.style.color = 'red';
            innerElement.style.backgroundColor = marker.noEvents ? 'lightblue' : (['', 'red', 'green', 'blue', 'yellow', 'red', 'white', 'black', 'grey', 'darkgreen'][marker.trash_bin_tags[0].tag_id]);
            innerElement.style.border = '2px solid black';
            innerElement.style.borderRadius = '30px';
            innerElement.style.font = 'normal 18px arial';
            innerElement.style.lineHeight = '20px';

            innerElement.style.paddingTop = '15px';
            innerElement.style.paddingLeft = '15px';
            innerElement.style.width = '20px';
            innerElement.style.height = '20px';

            // add negative margin to inner element
            // to move the anchor to center of the div
            innerElement.style.marginTop = '-10px';
            innerElement.style.marginLeft = '-10px';

            outerElement.appendChild(innerElement);

            // Add text to the DOM element
            innerElement.innerHTML = marker.name + (marker.noEvents ? '' : ( ", "+ (marker.distance * 111.195).toFixed(2) + "км" ));

            function changeOpacity(evt) {
                evt.target.style.opacity = 0.6;
            };

            function changeOpacityToOne(evt) {
                evt.target.style.opacity = 1;
            };



            //create dom icon and add/remove opacity listeners
            var domIcon = new H.map.DomIcon(outerElement, {
                // the function is called every time marker enters the viewport
                onAttach: (clonedElement, domIcon, domMarker) => {
                    clonedElement.addEventListener('mouseover', changeOpacity);
                    clonedElement.addEventListener('mouseout', changeOpacityToOne);
                    if(!marker.noEvents){
                        clonedElement.addEventListener('click', () => { this.setBin(domIcon); })
                    }

                },
                // the function is called every time marker leaves the viewport
                onDetach: (clonedElement, domIcon, domMarker) => {
                    clonedElement.removeEventListener('mouseover', changeOpacity);
                    clonedElement.removeEventListener('mouseout', changeOpacityToOne);
                    clonedElement.removeEventListener('click', ()=> {this.setBin(domIcon)});
                },
            });

            domIcon.trashBin = marker;

            // Marker for Chicago Bears home

            var bearsMarker = new H.map.DomMarker(marker.position, {
                icon: domIcon
            });
            this.map.addObject(bearsMarker);
        }
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
