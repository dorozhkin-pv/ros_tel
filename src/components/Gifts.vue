<template>
	<div>
		<div v-if="!isMessage">
			<h1 class="main-title">Выбор подарка</h1>
			<div class="card mb-3">
			  <div class="card-body">
			    <h5 class="card-title">Месяц бесплатного интернета</h5>
			    <p class="card-text text-italic">6000 бонусов</p>
			     <button type="submit" class="btn btn-primary btn-change" @click="isMessage = !isMessage">Выбрать</button>
			  </div>
			</div>

			<div class="card mb-3">
			  <div class="card-body">
			    <h5 class="card-title">Скидка 50% на услуги свзи</h5>
			    <p class="card-text text-italic">5000 бонусов</p>
			     <button type="submit" class="btn btn-primary btn-change" @click="isMessage = !isMessage">Выбрать</button>
			  </div>
			</div>

			<div class="card mb-3">
			  <div class="card-body">
			    <h5 class="card-title">Мяч из переработанного пластика</h5>
			    <p class="card-text text-italic">3000 бонусов</p>
			     <button type="submit" class="btn btn-primary btn-change" @click="isMessage = !isMessage">Выбрать</button>
			  </div>
			</div>
		</div>
		
		<div class="my-toast" role="alert" aria-live="assertive" aria-atomic="true" v-else>
		  <div class="toast-header">
		    <!-- <img src="..." class="rounded mr-2" alt="..."> -->
		    <strong class="mr-auto">Успех!</strong>
		    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" 
		    		@click="isMessage = !isMessage">
		      <span aria-hidden="true">&times;</span>
		    </button>
		  </div>
		  <div class="toast-body mt-5">
		    <h3>Вы успешно активировали подарок и списали бонусы!</h3>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
  	return {
  		isMessage: false
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.my-toast {
		width: 100%;
		height: 50vh;
		background-color: #777;
	}
	.card {
		/* width: 90%; */
		&-body {
			margin: 0 auto;
		}
	}
</style>
