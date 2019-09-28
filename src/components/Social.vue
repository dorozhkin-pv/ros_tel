<template>
	<div>

		<div style="height: 100%">
			<div class="bin" v-for="(str, index) in data" @click="showedTrashBin = str;">
				<div class="bin-header">{{ str.event.author.author_url }}</div>
				<div class="bin-distance">{{ str.event.event_url }}</div>
				<div class="bin-how_to_find">{{ str.event.text.substr(0, 50) }}</div>
			</div>
		</div>

		<div class="description" v-if="showedTrashBin">
			<h1>{{ showedTrashBin.event.author.author_url }}</h1>
			<div class="close" @click="showedTrashBin = false;">X</div>
			<div class="distance">{{ showedTrashBin.event.event_url }}</div>
			<div class="how_to_find">{{ showedTrashBin.event.text }}</div>
		</div>


	</div>
</template>

<script>
export default {
    created() {

    },
  data(){
      return {
          data: [],
			showedTrashBin: false
      };
  },
    mounted() {
		this.loadTrashBins();
    },
    methods: {
        loadTrashBins(){

            fetch('https://trashbin.dev.sa-wd.ru/api/v1/call/trashBin/soc').then(response => response.json()).then(data => {
                this.data = data;

            });

		},


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

	.bottom-text {
		position: absolute;
		bottom:0;
		width:100%;
	}
	.bottom-text input {
		width:100%;
	}

	.description {
		padding: 20px 20px 20px 20px;
		text-align: left;
	}
</style>
