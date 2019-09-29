<template>
	<div class="container pt-3">
		<router-link class="my-link mb-3" to="/card">Назад к карте</router-link>
		<h1>Типы точек утилизации</h1>

		<ul class="list-group mt-3" v-for="(item, index) in tags">
		  <li class="list-group-item">
		  	<span><img :src="images[index]" alt=""></span>
		  	  {{ item.name }}
		  </li>
		</ul>
	</div>	<!-- container -->
</template>

<script>
export default {
  	computed: {
      tags(){
          return this.$store.getters.tags;
	  },
	  images(){
	  	let arr = [];

	  	arr = this.tags.map((item, index) => {
	  		return '../img/trash/' + item.image + '.png';
	  	});

	  	console.log('arr', arr);
        return arr;
	  }
	},
    created() {
        this.$store.dispatch('addTag');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h1{
		font-size: 28px;
	}
	.my-link {
		display: block;
		text-align: left;
	}
	.list-group {
		text-align: left;
		&-item {
			span {
				display: inline-block;
				width: 15px;
				height: 15px;
				background-color: red;
				border-radius: 50%;
				img {
					width: 15px;
					height: 15px;
				}
			}
		}
	}
	
	
</style>
