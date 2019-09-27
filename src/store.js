import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	navbarNav: [
  	    'Главная страница',
  	    'Карта пунктов утилизации',
  	    'AI Распознать мой мусор',
  	    'Игра Smart Garbage',
  	    'Компаниям',
  	    'Настройки',
  	    'Обратная связь',
  	    'Политика конфидециальност'
  	],
  	typeOfGarbage: [
  	    'Пластик',
  	    'Бумага',
  	    'Бытовые отходы',
  	    'Стекло'
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
