<template>
	<div class="container pt-5">
		<h1>Типы точек утилизации</h1>

		<ul class="list-group mt-3" v-for="(item, index) in tags">
		  <li class="list-group-item">
		  	<!-- <span><img :src="../assets/trash/" alt=""></span> -->
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
	.list-group {
		text-align: left;
		&-item {
			span {
				display: inline-block;
				width: 15px;
				height: 15px;
				background-color: red;
				border-radius: 50%;
			}
		}
	}
	
	
</style>
