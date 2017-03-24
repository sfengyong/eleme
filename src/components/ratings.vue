<template>
	<div class="ratings">
		<div class="evaluation">
			<div class="left">
				<div class="score">{{(seller.score+seller.serviceScore+seller.foodScore)/3}}</div>
				<div class="title">综合评分</div>
				<div class="detail">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="star">
				<div class="item">
					<span class="name">服务评分</span>
					<star :score="seller.serviceScore" style="display: inline-block;"></star>
					<span class="number">{{seller.serviceScore}}</span>
				</div>
				<div class="item">
					<span class="name">食物评分</span>
					<star :score="seller.foodScore" style="display: inline-block;"></star>
					<span class="number">{{seller.foodScore}}</span>
				</div>
				<div class="item">
					<div class="time">送达时间<span class="deliveryTime">{{seller.deliveryTime}}分钟</span></div>
				</div> 
			</div>
		</div>
		<div class="division"></div>
		<div class="middle">
			<div class="button">
					<div class="all">全部</div>
					<div class="recommend">满意</div>
					<div class="ridicule">不满意</div>
			</div>
			<div class="filtrate">
					<div class="icon-check_circle" @click="screen()" :style="blue"></div>
					<div class="content">只看有内容的评价</div>
			</div>
		</div>		
		<ul>
			<li v-for="(item,index) in ratings">
				<div class="left"><img src=""></div>
				<div class="right">
					<div class="name">{{item.username}}</div>
					<div class="star"><star></star><span class="time"></span></div>
					<div class="content"></div>
					<div class="evaluation">
						<ul>
							<li v-for="(item,index) in ratings[index].recommend"></li>
						</ul>
					</div>

				</div>
			</li>
		</ul>
	</div>		
</template>
<script>
	import star from "./star.vue"
	export default{
		data(){
			return {
				seller:{},
				ratings:[],
			}
		},
		components:{
			star:star,
		},
		mounted(){
			this.$http.get('./data.json').then(function(response){
				this.seller = response.body.seller;
				this.ratings = response.body.ratings;		
			}.bind(this),function(response){});
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.ratings{
	width: 100%;
	height: 460px;
	overflow: scroll;
	.evaluation{
		width: 100%;
		height: 106px;
		box-sizing:border-box;
		padding-top: 18px;
		padding-bottom: 18px;
		.left{
			width: 137.5px;
			height: 100%;
			display: inline-block;
			box-sizing:border-box;
			padding-right: 7px;
			padding-left: 17px;
			border-right: 1px solid #e6e7e8;
			vertical-align: top;
			text-align: center;
			.score{
				margin:auto;
				font-size: 24px;
				color: rgb(255,153,0);
				line-height: 28px;
			}
			.title{
				font-size: 12px;
				color: rgb(12,22,31);
				line-height: 12px;
				margin-top: 6px;
			}
			.detail{
				font-size: 10px;
				color: rgb(7,17,27);
				line-height: 10px;
				margin-top: 8px;
			}

		}
		.star{
			display: inline-block;
			box-sizing:border-box;
			width: 232px;
			height: 100%;
			padding-right: 4px;
			padding-left: 5px;
			.item{
				margin-bottom: 8px;
				font-size: 12px;
				color: rgb(7,17,27);
				.name{
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 18px;	
					vertical-align: top;			
				}
				.deliveryTime{
					font-size: 12px;
					color: rgb(147,153,159);
					line-height: 18px;
					margin-left: 10px;
				}				
				.number{
					font-size: 12px;
					color: rgb(255,153,0);
					line-height: 18px;
					vertical-align: top;
				}
			}
		}
	}
	.division{
		width: 100%;
		height: 16px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		border-top: 1px solid rgba(7,17,27,0.1);
		background-color: #f3f5f7;
	}
	.middle{
		width: 100%;
		box-sizing:border-box;
		padding: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-size: 10px;
		.button{
			width: 100%;
			padding-bottom: 18px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
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
			margin-top: 12px;
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
	}
}
</style>