<template>
	<div class="wrapper" >
		<div class="image" @click="opendetail"><img :src="foods.image" alt=""></div>
		<div class="details" @click="opendetail">
		 	<div class="title">{{foods.name}}</div>
		 	<div class="descriptions">{{foods.description}}</div>
		 	<div class="sales">月售{{foods.sellCount}}份 <span class="evaluation">好评率{{foods.rating}}%</span></div>
		 	<div class="price">￥{{foods.price}}<s class="oldprice" style="display:inline-block;margin-left:8px " v-show="foods.oldPrice!=''">{{foods.oldPrice}}</s></div>	
		 	<adddecrease class="button" :count="count" :foods="foods"></adddecrease>
		 </div>
		 <gooddetail  :foods="foods" :count="count" v-show="show"></gooddetail>
	</div>
</template>
	
<script>
import adddecrease from '../../src/components/adddecrease.vue'
import gooddetail from '../../src/components/gooddetail.vue'
import vm from '../../src/newvue.js'

export default {
	props:["foods"],
	data () {
	  return {
	  		count:0,
	  		show:false,
	  };
	},
	watch:{
		count:function(newvalue,oldvalue){
			if(oldvalue == 0)
			{
				vm.$emit("carAdd",this.foods);
			}
			else if(newvalue == 0)
			{
				vm.$emit("carDecrease",this.foods);
			}					
			
		}
	},
	mounted(){
		vm.$on("countChange",function(obj){
			if(obj.foods.name === this.foods.name)
			{
				if(obj.msg === 'add')
				{
					this.count++;
				}
				else if(obj.msg === 'decrease')
				{
					if(this.count!=0)
						this.count--;
				}
			}
		}.bind(this));
		vm.$on("close",function(){
			this.show = false;
		}.bind(this))
		vm.$on("clearout",function(){
				this.count = 0;
			}.bind(this));
	},
	components:{
		adddecrease:adddecrease,
		gooddetail:gooddetail,
	},
	methods:{
		opendetail(){
			this.show = !this.show;
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper{
	margin: 18px;
	height: 65px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	padding-bottom: 18px;
	.image{
		display: inline-block;
		width: 55px;
		height: 55px;
		vertical-align: top;
		img{
			display: inline-block;
			width: 55px;
			height: 55px;
		}
	}
	.details{
		position: relative;
		display: inline-block;
		margin-left: 10px;
		margin-top: 2px;
		width: 189px;
		.title{
			font-size: 14px;
			color: rgb(7,17,27);
			line-height: 14px;
		}
		.descriptions{
			margin-top: 2px;
			font-size: 10px;
			color: rgb(147,153,159);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.sales{
			margin-top: 2px;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.price{
			font-size: 14px;
			color: rgb(240,20,20);
			font-weight: normal;
			.oldprice{
				font-size: 10px;
				color: rgb(147,153,159);
				font-weight: normal;
			}
		}
	}
	.button{
		position: absolute;
		top:46px;
		right:0px;
	}
	/* .gooddetail{
		position: absolute;
		width: 100%;
		height: 93%;
		overflow: scroll;
		z-index: 2;
		top: 0px;
		left:0px;
		background-color: white;
	} */
}
</style>