<template>
	<div>
		<div class="my-form" v-if="!isMessage">
			<h1 class="main-title">Ваше сообщение</h1>
			<form @submit.prevent="isMessage = !isMessage">
				<div class="form-group">
					<label for="exampleInputEmail1">Тема сообщения</label>
					<input type="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Текст сообщения</label>
					<input type="text" class="form-control" id="exampleInputtext" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Почта для ответа</label>
					<input type="email" class="form-control" id="exampleInputemail" required>
				</div>
				<button type="submit" class="btn btn-primary">Отправить</button>
			</form>
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
		    <h3>Ваше сообщение успешно отправлено!</h3>
		    <p>В ближайшее время мы свяжемся с вами через указанную почту.</p>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
  	return {
  		isMessage: true
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
</style>
