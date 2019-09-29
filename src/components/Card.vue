<template>
	<div>
		<div class="buttons-block">
			<div class="map-button" @click.prevent="block = 'map'">Карта</div>
			<div class="map-button" @click.prevent="block = 'list'">Список</div>
		</div>

		<div style="height: 100%;" v-show="block == 'map'">
			<div ref="map" v-bind:style="{ width: '100%', height: '80vh' }"></div>
		</div>

		<div class="bottom-text">
			<input type="text" @keyup="find()" v-model="findText" placeholder="Введите тег (аккумулятор, ТБО и тд)">
		</div>

		<div style="height: 100%" v-show="block == 'list'">
			<div class="bin" v-for="(bin, index) in trashBins" @click.prevent="setBin(bin)">
				<div class="bin-header">{{ bin.name }}</div>
				<div class="bin-distance">{{ (bin.distance * 111.195).toFixed(2) }}км</div>
				<div class="bin-how_to_find">{{ bin.how_to_find }} </div>
				<div class="bin-icons">
					Принимает:
					<div class="bin-icon" v-for="(icon, index) in bin.trash_bin_tags"> {{ icon.tag.name }} </div>
				</div>
			</div>
		</div>

		<div class="description" v-if="showedTrashBin">
			<h1>{{ showedTrashBin.name }}</h1>
			<div class="close" @click="showedTrashBin = false;">X</div>
			<div class="distance">{{ (showedTrashBin.distance * 111.195).toFixed(2) }}км</div>
			<div class="how_to_find">{{ showedTrashBin.how_to_find }} </div>
			<div class="icons">
				Принимает:
				<div class="icon" v-for="(icon, index) in showedTrashBin.trash_bin_tags"> {{ icon.tag.name }} </div>
			</div>
			<p>{{ showedTrashBin.description }}</p>
			
		</div>
		<div class="question" @click="goToLegend"></div>
		<div class="heart">
			<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="heart-img svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#c10000" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
		</div>
		
	</div>
</template>

<script>
export default {
    created() {
        this.platform = new H.service.Platform({
//            "app_id": 'yGQwElInyFe9aWTCBSjj',
//            "app_code": 'FRNa10auc3Pi_tOo00RJDA',
			"apikey": "G5eJQLddyvvvXbEIAjSD66fDE939PDbaYOErvyYoXuY",
//            useHTTPS: true
        });
    },
  data(){
      return {
          data: this.$store.getters.checks,
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
      };
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

//            this.map.addEventListener('dragend',  (evt) => {
//                var coord = this.map.screenToGeo(evt.currentPointer.viewportX,
//                    evt.currentPointer.viewportY);
//                console.log('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
//                    ((coord.lat > 0) ? 'N' : 'S') +
//                    ' ' + Math.abs(coord.lng.toFixed(4)) +
//                    ((coord.lng > 0) ? 'E' : 'W'));
//                this.lat = coord.lat;
//                this.lng = coord.lng;
//                this.loadTrashBins(this.data);
//            });

            this.map.addEventListener('tap',  (evt) => {
                var coord = this.map.screenToGeo(evt.currentPointer.viewportX,
                    evt.currentPointer.viewportY);

                this.lat = coord.lat;
                this.lng = coord.lng;
                this.loadTrashBins(this.data, this.findText);
            });

            this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

// Create the default UI components
            this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
            this.loadTrashBins(this.data, this.findText);
        });

    },
    methods: {
    	goToLegend(){
        	this.$router.push({ path: 'legend' });
        },
        loadTrashBins(tags, text){
            let append = '';
            if(tags.length && !text){
                append = '&where[]=["trashBinTags.tag_id","in",['+tags.filter(a=>a).join(",")+']]';
			}
			if(text){
                append = append + '&where[]=["trashBinTags.tag.name","like","'+encodeURI('%'+text+'%')+'"]';
                console.log('append',append);
			}
            fetch('https://trashbin.dev.sa-wd.ru/api/v1/trashBin?order[]=["distance","asc"]&scope=["addDistance,position,'+this.lng+','+this.lat+',distance"]&with=["trashBinTags.tag"]'+append).then(response => response.json()).then(data => {
                this.trashBins = data.data;
                this.map.removeObjects(this.map.getObjects ());
                this.trashBins.map(trashBin => this.addDomMarker(trashBin));
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

		},

		find(){
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                console.log(this.findText);
                this.loadTrashBins(this.data, this.findText);
            }, 800);
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

	.buttons-block {
		display: flex;
		height:50px;
		justify-content: center;
		align-content: center;
	}

	.buttons-block.checked {
		opacity: 0.5;
	}

	.bin {
		background-color: rgba(255,255,255, 0.4);
		font-size:15px;
		margin-bottom:30px;
	}

	.map-button {
		width:50%;
		height:50px;
		font-size: 32px;
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
	.question {
		position: absolute;
		top: 23%;
		right: 10px;
		width: 40px;
		height: 40px;
		background-color: red;
		border-radius: 50%;
		background: url('../img/question.png') no-repeat;
		background-size: 115%;
		border: 2px solid #013220;
		cursor: pointer;
		background-position: -3px 0px;
		z-index: 0;
	}
	.heart {
		position: absolute;
		top: 33%;
		right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid #c10000;
		cursor: pointer;
		z-index: 0;
		&-img {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 25px;
		}
	}

	.bottom-text {
		position: absolute;
		bottom:0;
		width:100%;
	}
	.bottom-text input {
		width:100%;
	}
</style>
