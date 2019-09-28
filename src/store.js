import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	navbarNav: [
  		{page: '/auth', name: 'Вход и профиль'},
  	    {page: '/', name: 'Главная страница'},
  	    {page: 'card', name: 'Карта пунктов утилизации'},
  	    {page: 'ai', name: 'AI ИдМус'},
  	    {page: 'game', name: 'Игра "Smart Sorting"'},
  	    {page: 'company', name: 'Компаниям'},
  	    {page: 'sets', name: 'Настройки'},
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
	  auth(state){
	  	return state.auth;
	  }
  },
  mutations: {
  	setTypeOfGarbage(state, data){
  		state.checked = data;
  		console.log(state.checked);
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

  }
})
