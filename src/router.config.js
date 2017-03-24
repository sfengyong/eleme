import ratings from "./components/ratings.vue"
import goods from "./components/goods.vue"
import seller from "./components/seller.vue"

export default{
	routes:[
		{path:'/goods',component:goods},
		{path:'/ratings',component:ratings},
		{path:'/seller',component:seller},
		{path:'/',component:goods},
	]
}