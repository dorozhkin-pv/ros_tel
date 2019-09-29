import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	navbarNav: [
  		{page: '/auth', name: 'Вход и профиль'},
  	    {page: '/', name: 'Главная страница'},
  	    {page: 'card', name: 'Карта пунктов утилизации'},
  	    {page: 'company', name: 'Компаниям'},
  	    {page: 'callback', name: 'Обратная связь'},
  	    {page: 'policy', name: 'Политика конфидециальности'},
  	    {page: 'qr', name: 'QR-сканнер', auth: true},
  	    {page: 'soc', name: 'Что говорят в соц.сетях', auth: true},
  	],
  	typeOfGarbage: [
  	    {img: '', name: 'Пластик'},
  	    {img: '', name: 'Бумага'},
  	    {img: '', name: 'Бытовые отходы'},
  	    {img: '', name: 'Стекло'}
  	],
  	checked: [],
  	tags: [],
  	auth: {
  		user: {},
		api_token: localStorage.getItem('api_token')
	}
  },
  getters: {
  	navbarNav(state){
  		if (!state.auth) {
  			
  		}
  		return state.navbarNav;
  	},
  	typeOfGarbage(state){
  		return state.typeOfGarbage;
  	},
	checks(state){
		return state.checked;
	},
	tags(state){
		return state.tags;
	},
	  auth(state){
	  	return state.auth;
	  }
  },
  mutations: {
  	setTypeOfGarbage(state, data){
  		state.checked = data;
  		console.log(state.checked);
  	},
  	setTags(state, data){
        
        state.tags = data.data;
        console.log('tags', data.data);
    },
	  setAuth(state, data){
  		state.auth.user = data;
	  },
	  setApiToken(state, data){
	  	localStorage.setItem('api_token', data.api_token);
	  	state.auth.api_token = data.api_token;
	  }
  },
  actions: {
  	addTag(store){
  		fetch("https://trashbin.dev.sa-wd.ru/api/v1/tag")
  			.then(response => response.json())
  			.then(data => store.commit('setTags', data));
  	}
  }
})
