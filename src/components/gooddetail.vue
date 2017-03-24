<template>
	<div class="gooddetail" v-show="show">
		<div class="icon-close" @click="close()"></div>
		<img :src="checkfood.image">
		<div class="header">
			<div class="content">
				<div class="title">{{checkfood.name}}</div>
				<div class="sales">月售{{checkfood.sellCount}}份<span class="evaluation">好评率{{checkfood.rating}}%</span></div>
				<div class="price">￥{{checkfood.price}}
						<span class="olprice">{{checkfood.oldPrice}}</span>
						<div class="button">
							<span v-show="count==0" @click="addToCar">加入购物车</span>
							<adddecrease  v-show="count>0" :goodsitemname="checkfood.name" :price="checkfood.price" :choosedcount="count"></adddecrease>
						</div>
				</div>
			</div>
		</div>
		<div class="division" v-show="(checkfood.info)"></div>
		<div class="introduce" v-show="(checkfood.info)">
			<div class="title" >商品介绍</div>
			<p>{{checkfood.info}}</p>
		</div>
		<div class="division"></div>
		<div class="evaluation">
			<div class="title">商品评价</div>
			<div class="choice">
				<div class="all" @click="showAll">全部<span>{{checkfood.ratings.length}}</span></div>
				<div class="recommend" @click="recommend">推荐{{recommendNum}}</div>
				<div class="ridicule" @click="ridicule">吐槽{{ridiculeNum}}</div>
			</div>
			<div class="filtrate">
				<div class="icon-check_circle" @click="screen()" :style="blue"></div>
				<div class="content">只看有内容的评价</div>
			</div>
			<ul>
				<li v-for="(item,index) in checkfood.ratings" v-show="!checkfood.ratings[index].flag">
					<div class="information">
						<span class="time">{{time[index]}}</span>
						<span class="username">{{checkfood.ratings[index].username}}</span>
						<img :src="checkfood.ratings[index].avatar" alt="">
					</div>
					<div class="content">
						<span :class="[downAndUp[checkfood.ratings[index].rateType]]"></span>
						<div>{{checkfood.ratings[index].text}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import vm from '../../src/newvue.js'
import adddecrease from '../../src/components/adddecrease.vue'

export default {
  props:['checkfood',"show","count"],
  data () {
 	   return {
    	downAndUp:["icon-thumb_up","icon-thumb_down"],
    	blue:{color:" rgb(147,153,159)"},
    	addcomponent:"",
    };
  },
  computed:{
	  	time(){
	  		var time = new Array();
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			time.push(this.checkfood.ratings[i].rateTime);
	  		}
	  		return time;
	  	},
	  	recommendNum(){
	  		var temp = 0 ;
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			if(this.checkfood.ratings[i].rateType == 0 )
	  			{
	  				temp++;
	  			}
	  		}
	  		return temp;
	  	},
	  	ridiculeNum(){
	  		var temp = 0 ;
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			if(this.checkfood.ratings[i].rateType == 1 )
	  			{
	  				temp++;
	  			}
	  		}
	  		return temp;
	  	}
  },
  mounted(){
  		
  		if(this.content)
  			this.show = !this.show;	
  },
  methods:{
	  	close(){
	  		this.show = !this.show;
	  	},
	  	screen(){
	  		if(this.blue.color == "rgb(147,153,159)")
	  		{
	  			this.blue.color = "rgb(0,160,220)"
		  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
		  		{
		  			if( this.checkfood.ratings[i].text ==="")
		  			{
		  				vm.$set(this.checkfood.ratings[i],'flag',true);
		  			}
		  			else
		  			{
		  				vm.$set(this.checkfood.ratings[i],'flag',false);
		  			}
		  		}
	  		}
	  		else
	  		{
	  			this.blue.color = "rgb(147,153,159)";
	  			for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
		  		{
		  			
		  			vm.$set(this.checkfood.ratings[i],'flag',false);
		  	
		  		}
	  		}	  		
	  	},
	  	ridicule(){  	
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			if( this.checkfood.ratings[i].rateType == 1 )
	  			{
	  				vm.$set(this.checkfood.ratings[i],'flag',false);
	  			}
	  			else
	  			{
	  				vm.$set(this.checkfood.ratings[i],'flag',true);
	  			}
	  		}	
	  	},
	  	recommend(){
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			if( this.checkfood.ratings[i].rateType == 0 )
	  			{
	  				vm.$set(this.checkfood.ratings[i],'flag',false);
	  			}
	  			else
	  			{
	  				vm.$set(this.checkfood.ratings[i],'flag',true);
	  			}
	  		}
	  	},
	  	showAll(){
	  		for( var i = 0 ; i < this.checkfood.ratings.length ; i++ )
	  		{
	  			vm.$set(this.checkfood.ratings[i],'flag',false);

	  		}
	  	},
	  	addToCar(){
	  		this.count++;
	  		vm.$emit('choosed',{'goodsitemname':this.checkfood.name,'price':this.checkfood.price,'count':this.count});
			vm.$emit('totalprice',this.checkfood.price);
	  	}
  },
  components:{
  		adddecrease:adddecrease,
  }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.gooddetail{
	ul,li{
		list-style: none;
	}
	.icon-close{
		display: inline-block;
		position: absolute;
		top: 5px;
		left:5px;
	}
	.icon-close:before{
		font-size: 25px;
		content: "\e903";
		font-family: 'icomoon';
		color: white;
	}
	img{
		width: 100%;
		height: 375px;
	}
	.header{
		padding: 18px;
		.content{
			display: inline-block;
			width: 100%;
			.title{
				font-size: 14px;
				font-weight: 350;
				color: rgb(7,17,27);
				line-height: 14px;
				margin-bottom: 8px;
			}
			.sales{
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 10px;
				margin-bottom: 18px;
				.evaluation{
					display: inline-block;
					margin-left: 12px;
				}
			}
			.price{
				font-size: 14px;
				font-weight: 350;
				color: rgb(240,20,20);
				line-height: 24px;
				.oldprice{
					display: inline-block;
					font-size: 10px;
					font-weight: 350;
					color: rgb(147,153,159);
					line-height: 24px;
					margin-left: 12px;

				}
				.button{
					float: right;
					display: inline-block;
					span{
						box-sizing:border-box;
						display: inline-block;
						width: 88px;
						height: 32px;
						border-radius: 16px;
						padding-top: 8.5px;
						padding-left: 12px;
						background-color: rgb(0,160,220);
						font-size: 10px;
						color: rgb(255,255,255);
						line-height: 12px;
					}
				}
			}
		}		
	}
	.division{
		width: 100%;
		height: 16px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		background-color: #f3f5f7;
	}
	.introduce{
		box-sizing:border-box;
		width: 100%;
		padding: 18px; 
		.title{
			color: rgb(7,17,27);
			font-size: 14px;
			line-height: 24px;
			margin-bottom: 6px; 
		}
		p{
			font-size: 12px;
			font-weight: 100;
			color: rgb(77,85,93);
			line-height: 23px; 

		}
	}
	.evaluation{
		.title{
			color: rgb(7,17,27);
			font-size: 14px;
			line-height: 24px;
			margin-top: 18px;
			margin-left: 18px;
		}
		.choice{
			margin-left: 18px;
			margin-top: 12px;
			margin-right: 18px;
			box-sizing:border-box;
			padding-bottom: 18px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			font-size: 12px;
			.all{
				display: inline-block;
				box-sizing:border-box;
				padding: 8px 18px 8px 18px;
				border-radius: 4px;
				margin-right: 8px;	
				color: white;
				line-height: 16px;
				background-color: rgb(0,160,220);				
			}
			.recommend{
				display: inline-block;
				box-sizing:border-box;
				line-height: 16px;
				padding: 8px 18px 8px 18px;
				border-radius: 4px;
				margin-right: 8px;
				background-color: rgba(0,160,220,0.2);
				color: rgb(77,85,93);
			}
			.ridicule{
				display: inline-block;
				box-sizing:border-box;
				line-height: 16px;
				padding: 8px 18px 8px 18px;
				border-radius: 4px;
				background-color: rgba(77,85,93,0.2);
				color: rgb(77,85,93);
			}
		}
		.filtrate{
			margin-left: 18px;
			margin-top: 12px;
			margin-bottom: 12px;
			.icon-check_circle{
				display: inline-block;
				
			}
			.icon-check_circle:before{
				 content: "\e902";
				 font-family: 'icomoon';
				 font-size: 24px;
				
				 line-height: 24px;
				 margin-right: 4px;
			}
			.content{
				display: inline-block;
				font-size: 12px;
				color: rgb(147,153,159);
				line-height: 24px;
				vertical-align: top;
			}
		}
		ul{
			padding: 0px 18px 16px 18px;
			box-sizing:border-box;
			border-top: 1px solid rgba(7,17,27,0.1);
			li{
				box-sizing:border-box;
				border-bottom: 1px rgba(7,17,27,0.1) solid;
				padding-bottom: 16px;
				padding-top: 16px;
				.information{
					position: relative;
					width: 100%;
					.time{
						display: inline-block;
						font-size: 10px;
						color: rgb(147,153,159);
						line-height: 12px;
					}
					.username{
						display: inline-block;
						font-size: 10px;
						color: rgb(147,153,159);
						line-height: 12px;
						position: absolute;
						right: 20px;
					}
					img{
						display: inline-block;
						width: 12px;
						height: 12px;
						position: absolute;
						right: 0px;
					}
				}
				.content{
					margin-top: 6px;
					.icon-thumb_down:before {
						  content: "\e908";
						   font-family: 'icomoon';
						   font-size: 12px;
						   color: rgb(147,153,159);
						   line-height: 24px;

					}
					.icon-thumb_up:before {
						  content: "\e909";
						   font-family: 'icomoon';
						   font-size: 12px;
						   color: rgb(0,160,220);
						   line-height: 24px;
					}
					div{
						margin-left: 4px;
						display: inline-block;
						font-size: 12px;
						color: rgb(7,17,27);
						line-height: 16px;
					}		
				}
			}			
		}

	}
}
</style>