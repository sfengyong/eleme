<template>
	<div class="detail" v-show="flag">
		<div class="content">
			<div class="title">
				<span class="car">购物车</span>
				<span class="clearout" @click = "clearout">清空</span>
			</div>
			<ul>
				<li v-for="(item,index) of choosed">
					<span class="name">{{item.goodsitemname}}</span>
					<div class="right">
						<span class="price">￥{{item.price}}</span>
						<adddecrease class="adddecrease" :price="choosed[index].price" :goodsitemname = "choosed[index].goodsitemname"
						 :choosedcount="choosed[index].count"></adddecrease>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import vm from '../../src/newvue.js'
import adddecrease from '../../src/components/adddecrease.vue'

export default{
		data(){
			return {
				flag:false,
				choosed:[],
				totalprice:0,
			}
		},
		mounted(){
				vm.$on('flag',function(flag){
					this.flag = flag;
				}.bind(this));

				vm.$on('choosed',function(choosed){
					if(choosed.goodsitemname === "-1")
						return ;
					var i;
					for(i = 0 ; i < this.choosed.length ; i++)
					{
						if(choosed.goodsitemname === this.choosed[i].goodsitemname)
						{
							if(choosed.count == 0 )
							{
								this.choosed.splice(i,1);			
							}
							else
							{
								this.choosed[i].count = choosed.count;
							}	
							break;
						}
					}
					if( i == this.choosed.length && choosed.count != 0)
					{
						if(choosed.goodsitemname)
						{							
							vm.$set(this.choosed,i,{'count':choosed.count,'goodsitemname':choosed.goodsitemname,'price':choosed.price})
						}
					}
				}.bind(this));
		},
		methods:{
			clearout(){
				vm.$emit('choosed',{'goodsitemname':-1});
				this.choosed.splice(0,this.choosed.length);

				
			}
		},
		components:{
			adddecrease:adddecrease,
		},
		computed:{
			totalprice:function(){
				var totalprice = 0;
				for( var i = 0 ; i < this.choosed.length ; i++ )
				{
					totalprice += this.choosed[i].price;
				}
				return totalprice;
			}
		}
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
.detail .content ul li{
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

}
</style>