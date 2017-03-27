<template>
	<div class="wrapper">
		<div class="header">
			<div class="top">
				<div class="left">
					<div class="title">{{seller.name}}</div>
					<star class="star" :score="seller.score"></star>
					<span class="ratingcount">({{seller.ratingCount}})</span>
					<span class="sellcount">月售{{seller.sellCount}}单</span>
				</div>
				<div class="right">
					<span class="icon-favorite"></span>
					<div class="status">已收藏</div>
				</div>				
			</div>
			<div class="bottom">
				<div class="banner">
					<div class="title">起送价</div>
					<div class="price">
						<div class="number">{{seller.minPrice}}</div>
						<div class="unit">元</div>
					</div>
				</div>
				<div class="banner" style="border-left: 1px solid rgba(7,17,27,0.1);border-right: 1px solid rgba(7,17,27,0.1);">
					<div class="title">商家配送</div>
					<div class="price">
						<div class="number">{{seller.deliveryPrice}}</div>
						<div class="unit">元</div>
					</div>
				</div>
				<div class="banner">
					<div class="title">平均配送时间</div>
					<div class="price">
						<div class="number">{{seller.deliveryTime}}</div>
						<div class="unit">分钟</div>
					</div>
				</div>
			</div>
		</div>
		<div class="division"></div>
		<div class="content">
			<div class="announcement">
				<div>公告与活动</div>
				<p>{{seller.bulletin}}</p>
			</div>
			<ul>
				<li v-for="(item,index) in seller.supports">
					<img :src="src[item.type]">
					<span>{{item.description}}</span>
				</li>
			</ul>
		</div>
		<div class="division"></div>
		<div class="picture">
			<div>商家实景</div>
			<div class="picturewrap">
				<ul  :style="{width: (seller.pics.length*130)+'px'}" >
					<li v-for="(item,index) in seller.pics">
						<img :src="item" alt="">
					</li>
				</ul>
			</div>			
		</div>
		<div class="division"></div>
		<div class="information">
			<div>商家信息</div>
			<ul>
				<li v-for="(item,index) in seller.infos">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import star from "./star.vue"
	export default{
		data(){
			return {
				seller:{},
				src:["../src/assets/decrease_3@2x.png",
				"../src/assets/discount_3@2x.png",
				"../src/assets/special_3@2x.png",
				"../src/assets/invoice_3@2x.png",
				"../src/assets/guarantee_3@2x.png"],
			}
		},	
		created(){
		    var _this = this;
		    this.$http.get('./data.json').then(function(response){
		        _this.seller=response.body.seller;
		      },function(response){});
		},
		components:{
			star:star,
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper{
	height: 460px;
	overflow: scroll;
	.header{
		padding: 18px;
		.top{
			border-bottom: 1px solid rgba(7,17,27,0.1);
			padding-bottom: 18px;
			.left{
				display: inline-block;
				.title{
					font-size: 14px;
					color: rgb(7,17,27);
					line-height: 14px;
					margin-bottom: 8px;
				}
				.star{
					display: inline-block;
					margin-right: 8px;
				}
				.ratingcount{
					margin-right: 12px;
					font-size: 10px;
					color: rgb(77,85,93);
					line-height: 18px;
					vertical-align: top;
				}
				.sellcount{
					vertical-align: top;
					margin-right: 12px;
					font-size: 10px;
					color: rgb(77,85,93);
					line-height: 18px;
				}
			}
			.right{
				display: inline-block;
				text-align: center;
				float: right;
				.icon-favorite{
					margin-bottom: 4px;
				}
				.status{
					font-size: 10px;
					color: rgb(77,85,93);
					line-height: 10px;
				}
				.icon-favorite:before {
					content: "\e904";
					font-family: 'icomoon';
					font-size: 24px;
					color: rgb(240,20,20);
					line-height: 24px;
				}
			}
		}
		.bottom{
			padding-top: 18px;
			.banner{
				display: inline-block;
				width: 32%;			
				.title{
					
					font-size: 10px;
					color: rgb(147,153,159);
					line-height: 10px;
					text-align: center;
					margin-bottom: 4px;
				}
				.price{
					text-align: center;
					font-weight: 100;
					color: rgb(7,17,27);
					line-height: 24px;
					.number{
						display: inline-block;
						font-size: 24px;										
					}	
					.unit{
						font-size: 10px;
						display: inline-block;
					}
				}
			}
		}
	}
	.division{
		height: 16px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		background-color: #f3f5f7;
	}
	.content{
		padding: 18px 18px 0px 18px;
		.announcement{
			padding-bottom: 16px;
			div{
				font-size: 14px;
				color: rgb(7,17,27);
				line-height: 14px;
			}
			p{
				padding:8px 12px 0px 12px;
				font-size: 12px;
				font-weight: 100;
				color: rgb(240,20,20);
				line-height: 24px;
			}
		}
		ul,li{
			list-style: none;
		}
		ul{
			li{
				padding: 16px;
				border-top: 1px solid rgba(7,17,27,0.1);
				img{
					width: 16px;
					height: 16px;
					margin-right: 6px;
					vertical-align: middle;
				}
				span{
					font-size: 12px;
					font-weight: 100;
					color: rgb(7,17,27);
				}
			}
		}
	}
	.picture{
		padding: 18px 18px 0px 18px;
		
		div{
			font-size: 14px;
			color: rgb(7,17,27);
			line-height: 14px;
			margin-bottom: 12px;
		}
		.picturewrap{
			overflow-x:scroll;
			ul{
				li{
					display: inline-block;
					margin-right: 6px;
					img{
						width: 120px;
						height: 90px;

					}

				}
			}	
		}
		
	}
	.information{
		padding: 18px;
		div{
			font-size: 14px;
			color: rgb(7,17,27);
			line-height: 14px;
			margin-bottom: 12px;
		}
		ul{
			list-style: none;
			li{
				list-style: none;
				padding: 16px 12px;
				border-top: 1px solid rgba(7,17,27,0.1);
				font-size: 12px;
				font-weight: 100;
				color: rgb(7,17,27);
				line-height: 16px;


			}
		}
	}
}

</style>