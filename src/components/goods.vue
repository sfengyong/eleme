<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li class="menu-item"  v-for="(item,index) in goods" @click="change(item,index)" :class="{'choosed':(nowIndex === index )}">
					<img v-show="item.type!= -1" :src=src[index] class="supports">
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" @scroll="changemenu($event)">
		 	<ul v-for="(item,index) in  goods" >
		 		<span class="category">{{item.name}}</span>				
				<item v-for="(goodsitem,goodsindex) in foods[index]" :foods="goodsitem"></item>	
			</ul>
		 </div>	
	</div>
</template>
<script>
import adddecrease from '../../src/components/adddecrease.vue'

import vm from '../../src/newvue.js'
import item from '../../src/components/item.vue'

export default{
	data(){
		return {
			goods:[],
			nowIndex : 0,
			height:[],
			foods:[],

		}
	},
	created(){
	    var _this = this;
	    this.$http.get('./data.json').then(function(response){
	        _this.goods=response.body.goods;
	        for(var k = 0 ; k < _this.goods.length ; k++ ){
  				_this.foods[k] = new Array;
  				for(var j = 0 ; j < _this.goods[k].foods.length ; j++ ){
  					_this.foods[k][j] = _this.goods[k].foods[j];

  				}
        	}
	      },function(response){});
  	},
  	updated(){
  			var ul = document.getElementsByClassName('foods-wrapper')[0].getElementsByTagName('ul');
	        for(var i = 0 ; i < ul.length ; i++)
	        {
	        	if( i == 0)
	        	{
	        		this.height[0] = ul[0].clientHeight;
	        	}
	        	else
	        	{
	        		this.height[i] = ul[i].clientHeight+this.height[i-1];
	        	}
	        }
  	},
  	computed:{
  		src:function(){
  			var src = new Array;
  			for( var i = 0 ; i < this.goods.length ; i++ ){
  				switch(this.goods[i].type){
  					case -1:
  							src.push("");
  							break;
  					case 0:
							src.push("../src/assets/decrease_1@2x.png");
							break;
					case 1:
							src.push("../src/assets/discount_1@2x.png");
							break;
					case 2:
							src.push("../src/assets/guarantee_1@2x.png");
							break;
					case 3:
							src.push("../src/assets/invoice_1@2x.png");
							break;
					case 4:
							src.push("../src/assets/special_1@2x.png");
							break;
  				}
  			}
  			return src;
  		},

  	},
  	methods:{
  		change(item,index){
  			this.nowIndex = index;
  			var foodsWrapper = document.getElementsByClassName('foods-wrapper')[0];
  			foodsWrapper.scrollTop = this.height[index-1];
  		},
  		changemenu(e){	
  			for(var i = 0 ; i < this.height.length ;i++ )
  			{

  				if(e.target.scrollTop >= this.height[i] && e.target.scrollTop <this.height[i+1])
  				{
  					this.nowIndex = i+1;
  					break;
  				}
  				else if(e.target.scrollTop < this.height[0])
  					this.nowIndex = 0;
  			}
  		},
  	},
  	components:{
  		adddecrease:adddecrease,
  		item:item,
  	}

}
</script>
<style scoped>
ul,li{
	list-style: none;
	padding: 0px;
	margin: 0px;
}
.goods{
	display: flex;
	width: 100%;
	height:460px;
	overflow: scroll;
}
.goods .menu-wrapper{
	width: 80px;
	background-color: #f3f5f7;
	height: 100%;
	overflow: scroll;
}
.goods .menu-wrapper .choosed{
	font-size:12px;
	color:rgb(240,20,20);
	background-color:white;
}
.goods .menu-wrapper ul li{
	display: inline-block;
	width: 100%;
	padding: 20px 12px 20px 12px;
	box-sizing:border-box;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size:12px;
}

.goods .menu-wrapper ul li .supports{
	display: inline-block;
	width: 12px;
	height: 12px;
}
.goods .menu-wrapper ul li span{

	font-size: 12px;
	color: rgb(16,26,35);
	font-weight: 100;
	vertical-align: middle;

}
.goods .foods-wrapper{
	flex: 1;
	height: 100%;
	overflow: scroll;
}
.goods .foods-wrapper .category{
	display: inline-block;
	width: 100%;
	height:26px;
	border-left: 1px solid #d9dde1;
	background-color: #f3f5f7;
	font-size: 12px;
	color: rgb(147,153,159);
	line-height: 26px;
}
.goods .foods-wrapper ul{
	border-bottom: 1px solid rgba(7,17,27,0.1);
	padding-bottom: 18px;
}

.gooddetail{
	position: absolute;
	width: 100%;
	height: 93%;
	overflow: scroll;
	z-index: 2;
	top: 0px;
	left:0px;
	background-color: white;
}


</style>