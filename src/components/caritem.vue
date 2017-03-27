<template>
	<div class="wrapper">
		<span class="name">{{foods.name}}</span>
		<div class="right">
			<span class="price">￥{{foods.price}}</span>
			<adddecrease :count="count" :foods="foods"></adddecrease>
		</div>
		<span class="point"></span>
	</div>
</template>

<script>
import vm from '../../src/newvue.js'
import adddecrease from '../../src/components/adddecrease.vue'

export default {  
	props:['foods'],
	data () {
	  return {
	  		count:1,
	  	};
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
	},
	components:{
		adddecrease:adddecrease,
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper{
	position: relative;
	width: 100%;
	height: 48px;
	box-sizing:border-box;
	padding-top: 12px;
	padding-bottom: 12px;
	border-bottom: 1px rgba(7,17,27,0.1) solid;	
	.name{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 24px;
	}
	.right{
		display: inline-block;
		float: right;
		.price{
			font-size: 14px;
			font-weight: normal;
			color: rgb(240,20,20);
			line-height: 24px;
			margin-right: 42px;
			vertical-align: top;
		}
	}
	.adddecrease{
		position: relative;
	}
}
</style>