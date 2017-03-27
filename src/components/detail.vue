<template>
	<div class="detail" v-show="flag" @click = "flag=!flag">
		<div class="content" @click.stop="">
			<div class="title">
				<span class="car">购物车</span>
				<span class="clearout" @click = "clearout">清空</span>
			</div>
			<ul>
				<caritem  v-for="(item,index) of choosed" :foods="item" ></caritem>

			</ul>
		</div>
	</div>
</template>
<script>
import vm from '../../src/newvue.js'
import adddecrease from '../../src/components/adddecrease.vue'
import caritem from '../../src/components/caritem.vue'

export default{
		data(){
			return {
				flag:false,
				choosed:[],

			}
		},
		mounted(){
			vm.$on('flag',function(flag){
				this.flag = flag;
			}.bind(this));
			vm.$on('carDecrease',function(obj){
				for( var i = 0 ; i < this.choosed.length ; i++ )
				{
					if(this.choosed[i].name === obj.name)
					{
						this.choosed.splice(i,1);
					}
				}
			}.bind(this));

			vm.$on('carAdd',function(obj){
				for( var i = 0 ; i < this.choosed.length ; i++ )
				{
					if(this.choosed[i].name === obj.name)
					{
						break;
					}
				}
				if( i === this.choosed.length)
				{
					this.choosed.push(obj);
				}

			}.bind(this));
		},
		methods:{
			clearout(){
				vm.$emit("clearout");
			},		
		},
		components:{
			adddecrease:adddecrease,
			caritem:caritem,
		},
}
</script>
<style scoped>
ul,li{
	list-style: none;
}
.detail{
	width: 100%;
	height: 100%;
	position: absolute;
	top:0px;
	background-color: rgba(7,17,27,0.6);
	z-index:9;
}
.detail .content{
	position: absolute;
	bottom: 49px;
	max-height: 281.5px;
	width: 100%;
	overflow: scroll;
	background-color: white;
}
.detail .content .title{
	width: 100%;
	height: 40px;
	background-color: #f3f5f7;
	box-sizing:border-box;
	padding-left: 18px;
	padding-right: 18px;
	border-bottom: 1px rgba(7,17,27,0.1) solid;
}
.detail .content .title .car{
	font-size: 14px;
	font-weight: 100px;
	color: rgb(7,17,27);
	line-height: 40px;
}
.detail .content .title .clearout{
	font-size:12px;
	color: rgb(0,160,220); 
	line-height:40px;
	float: right;
}
.detail .content ul{
	width: 100%;
	box-sizing:border-box;
	padding-left: 18px;
	padding-right: 18px;
}
/* .detail .content ul li{
	position: relative;
	width: 100%;
	height: 48px;
	box-sizing:border-box;
	padding-top: 12px;
	padding-bottom: 12px;
	border-bottom: 1px rgba(7,17,27,0.1) solid;	
}
.detail .content ul li .name{
	font-size: 14px;
	color: rgb(7,17,27);
	line-height: 24px;
}
.detail .content ul li .right{
	display: inline-block;
	float: right;
}
.detail .content ul li .right .price{
	font-size: 14px;
	font-weight: normal;
	color: rgb(240,20,20);
	line-height: 24px;
	margin-right: 42px;
	vertical-align: top;

}
.detail .content ul li .adddecrease{
	position: relative;
} */
</style>