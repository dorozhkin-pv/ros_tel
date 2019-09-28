<template>
	<div class="container pt-5">
		<h1>Список организаций-утилизаторов</h1>

		<p>с услугой самовывоза</p>

		<form>
		  <div class="form-group">
		    <label for="exampleInputEmail1"><img src="../img/glass.svg" alt=""></label>
		    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ключевые слова, например ртутный градусник">
		  </div>
		</form>

		<div class="card mb-3" style="width: 18rem;">
		  <div class="card-body">
		    <h5 class="card-title">ООО "Чистый город"</h5>
		    <p class="card-text">стекло, пластик, бытовой мусор</p>
		    <a href="tel:+79155617881" class="card-link">8 (915) 561- 78 - 81</a>
		    <p class="card-text text-italic">5 км от вас</p>
		  </div>
		</div>

		<div class="card" style="width: 18rem;">
		  <div class="card-body">
		    <h5 class="card-title">ЗАО "Эколоджи-пассифик"</h5>
		    <p class="card-text">взрывоопасные химические вещества</p>
		    <a href="tel:+79163333333" class="card-link">8 (916) 333- 33 - 33</a>
		    <p class="card-text text-italic">10 км от вас</p>
		  </div>
		</div>
	</div>	<!-- container -->
</template>

<script>
export default {
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h1{
		font-size: 28px;
	}
	.card {
		&-body {
			text-align: left;
		}
		margin: 0 auto;
	}
	.form-group {
		display: flex;
    	justify-content: space-between;
    	align-items: center;
    	.form-control {
    		margin-left: 8px;
    	}
		img {
			width: 25px;
			margin-top: 8px;
		}
	}
	.text-italic {
		font-style: italic;
		margin-top: 10px;
	}
</style>
