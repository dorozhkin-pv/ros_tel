<template>
	<div>
		<qrcode-stream v-if="qrEnabled" @decode="onDecode"></qrcode-stream>
		Ваш счет: {{ user.scores }}
	</div>
</template>

<script>
export default {
  props: {

  },
	data() {
      return {
          qrEnabled: 1
	  };
	},
    computed: {
        user(){
            return this.$store.getters.auth.user;
        }
    },
	mounted(){
	},
	methods: {
      onDecode(str){
          console.log('qr',str);
          fetch('https://trashbin.dev.sa-wd.ru/api/v1/user/'+this.$store.getters.auth.user.user_id+'?api_token='+localStorage.getItem('api_token'), {
              method: 'PUT',
              body: new URLSearchParams({scores: str})
		  }).then(data => data.json()).then(data => {
		      this.qrEnabled = 0;
		      this.scores = data.scores;
		  });
	  }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
