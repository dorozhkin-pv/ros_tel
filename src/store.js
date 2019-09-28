import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	navbarNav: [
  	    {page: '/', name: 'Главная страница'},
  	    {page: 'card', name: 'Карта пунктов утилизации'},
  	    {page: 'ai', name: 'AI Распознать мой мусор'},
  	    {page: 'game', name: 'Игра Smart Garbage'},
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
  	checked: []
  },
  getters: {
  	navbarNav(state){
  		return state.navbarNav;
  	},
  	typeOfGarbage(state){
  		return state.typeOfGarbage;
  	}
  },
  mutations: {
  	setTypeOfGarbage(state, data){
  		state.checked = data;
  		console.log(state.checked);
  	}
  },
  actions: {

  }
})
