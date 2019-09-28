<template>
	<div>
		<div class="buttons-block">
			<div class="map-button" @click.prevent="block = 'map'">Карта</div>
			<div class="map-button" @click.prevent="block = 'list'">Список</div>
		</div>

		<div style="height: 100%;" v-show="block == 'map'">
			<div ref="map" v-bind:style="{ width: '100%', height: '700px' }"></div>
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
		  block: 'map'
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
                this.loadTrashBins(this.data);
            });

            this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

// Create the default UI components
            this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
            this.loadTrashBins(this.data);
        });

    },
    methods: {
        loadTrashBins(tags){
            let append = '';
            if(tags.length){
                append = '&where[]=["trashBinTags.tag_id","in",['+tags.filter(a=>a).join(",")+']]';
			}
            fetch('/api/v1/trashBin?order[]=["distance","asc"]&scope=["addDistance,position,'+this.lng+','+this.lat+',distance"]&with=["trashBinTags.tag"]'+append).then(response => response.json()).then(data => {
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
            innerElement.style.backgroundColor = 'blue';
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
</style>
