import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	navbarNav: [
  		{page: '/auth', name: 'Вход'},
  	    {page: '/', name: 'Главная страница'},
  	    {page: 'card', name: 'Карта пунктов утилизации'},
  	    {page: 'ai', name: 'AI ИдМус'},
  	    {page: 'game', name: 'Игра "Smart Sorting"'},
  	    {page: 'company', name: 'Компаниям'},
  	    {page: 'sets', name: 'Настройки'},
  	    {page: 'callback', name: 'Обратная связь'},
  	    {page: 'policy', name: 'Политика конфидециальност'}
  	],
  	typeOfGarbage: [
  	    {img: '', name: 'Пластик'},
  	    {img: '', name: 'Бумага'},
  	    {img: '', name: 'Бытовые отходы'},
  	    {img: '', name: 'Стекло'}
  	],
  	checked: [],
  	tags: [],
  	auth: false
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
