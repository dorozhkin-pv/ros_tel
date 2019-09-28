<template>
	<div>
	<h1 class="main-title">Ваше сообщение</h1>
	<form>
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
</template>

<script>
export default {
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
