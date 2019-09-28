<template>
	<div>
		<h1>Карта</h1>
		<div ref="map" v-bind:style="{ width: '100%', height: '500px' }"></div>

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
		  showedTrashBin: false
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
            fetch('/api/v1/trashBin?scope=["addDistance,position,'+this.lng+','+this.lat+',distance"]&with=["trashBinTags.tag"]'+append).then(response => response.json()).then(data => {
                this.trashBins = data.data;
                this.trashBins.map(trashBin => this.addDomMarker(trashBin));

            });

		},
		setBin(domIcon) {
			this.showedTrashBin = domIcon.trashBin;
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
            innerElement.style.font = 'normal 12px arial';
            innerElement.style.lineHeight = '12px'

            innerElement.style.paddingTop = '2px';
            innerElement.style.paddingLeft = '4px';
            innerElement.style.width = '20px';
            innerElement.style.height = '20px';

            // add negative margin to inner element
            // to move the anchor to center of the div
            innerElement.style.marginTop = '-10px';
            innerElement.style.marginLeft = '-10px';

            outerElement.appendChild(innerElement);

            // Add text to the DOM element
            innerElement.innerHTML = marker.name + ( ", "+ (marker.distance * 111.195).toFixed(2) + "км" );

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
                    clonedElement.addEventListener('click', () => { this.setBin(domIcon); })
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
</style>
