<template>
	<div class="head">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64px" height="64px" >
			</div>
			<div class="content">
				<div class="title">
					<img src="../assets/brand@2x.png">
					<span>{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<img :src="src">
					<span>{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-content">
                <span class="count">{{ seller.supports.length }}个　></span>
            </div>
		</div>
		<div class="bulletin-wrapper">
            <img src="../assets/bulletin@2x.png">
            <span class="bulletin-text">{{ seller.bulletin }}</span>
        </div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<div v-show="detailShow" class="detail">
			<div class="detail-wrapper">
				<div class="detail-main">
					<h1 class="name">{{ seller.name }}</h1>
					<div class="star-wrapper">
						<star :score="seller.score"></star>
					</div>
					<div class="Title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                   <ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item, index) in seller.supports">
	                       	<img :src="src">
	                        <span>{{ seller.supports[index].description }}</span>
                        </li>
                    </ul>
                    <div class="Title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                         <p class="content">{{ seller.bulletin }}</p>
                    </div>
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">X
            </div>
		</div>
	</div>
</template>
<script>
import star from "../../src/components/star.vue"
export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			detailShow: false,
		}
	},
	methods:{
		hideDetail(){
			this.detailShow = false;
		}
	},
	computed:{
		src:function(){
			switch(this.seller.supports[0].type)
			{
				case 0:
						return "../src/assets/decrease_1@2x.png";
						break;
				case 1:
						return "../src/assets/discount_1@2x.png";
						break;
				case 2:
						return "../src/assets/guarantee_1@2x.png";
						break;
				case 3:
						return "../src/assets/invoice_1@2x.png";
						break;
				case 4:
						return "../src/assets/special_1@2x.png";
						break;
			}
			
		}
	},
	components:{
		star
	}
};
</script>
<style scoped>
.head{
	position: relative;
	background: rgba(7,17,27,0.5);
	overflow: hidden;
}
.content-wrapper{
	margin:24px 12px 18px 24px;
	display:inline-block;
}
.content-wrapper .avatar{
	display:inline-block;
	width:64px;
	height:64px;
}
.content-wrapper .avatar img{
		border-radius:2px;
}
.content{
	display:inline-block;
	margin-left:16px;
	margin-top:2px;
	vertical-align:top;
}
.title{
	margin-bottom:8px;
}
.title img{
	display:inline-block;
	width:30px;
	height:18px;
}
.title span{
	font-size:16px;
	color:rgb(255,255,255);
	font-weight:bold;
	line-height:18px;
	vertical-align:top;
}
.description{
	margin-bottom:10px;
	font-size:12px;
	color:rgb(255,255,255);
	font-weight:100;
	line-height:7px;
}
.support{
	margin-top:-4px;
}
.support img{
	display: inline-block;
	width: 12px;
	height: 12px;
}
.support span{
	font-size:10px;
	color:rgb(255,255,255);
	font-weight:100;
}
.support-content{
	font-size: 10px;
	color: rgb(255,255,255);
	font-weight: 100;
	line-height: 12px;
	background-color: rgba(0,0,0,0.2);
	padding: 7px 8px 7px 8px;
	display: inline-block;
	border-radius: 7px;
}

.bulletin-wrapper{
	display: inline-block;
	width: 100%;
	height: 28px;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: rgba(7,17,21,0.2);
	font-size: 10px;
	color: white;
	font-weight: 100;
	line-height: 28px;
	position: relative;
	white-space: nowrap;
	margin-bottom: -4px;
}
.bulletin-wrapper img{
	display: inline-block;
	margin-left: 12px;
	margin-right: 4px;
	width: 22px;
	height: 12px;
}
.bulletin-wrapper .bulletin-text{
	vertical-align: top;
}
.background{
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	filter:blur(10px);
}
.detail{
	position: fixed;
	z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
	width: 100%;
	background-color: rgba(7,17,27,0.8);
	top: 0px;
	left: 0px;
}
.detail-wrapper{
	margin-top:64px;
	width: 100%;
	min-height: 100%;
	padding-bottom: 50px;
}
.detail-wrapper .detail-main .name{
	font-size: 16px;
	font-weight: 350;
	color:rgb(255,255,255);
	line-height: 16px;
	text-align: center;
}

.detail-wrapper .detail-main .star-wrapper{
	display: inline-block;
	margin-top: 18px;
	margin-left: 28%;
}

.detail-close {
	position: relative;
	margin-top: -50px;
	clear: both;
} 
.detail-wrapper .detail-main .star-wrapper{
	display: inline-block;
	margin-top: 16px;
}
.detail-wrapper .detail-main .Title{
	display: flex;
	width: 80%;
	margin: 28px auto 24px;
}
.detail-wrapper .detail-main .line{
	flex: 1;
	position: relative;
	top: -6px;
	border-bottom: 1px solid rgba(255, 255, 255, .2);
}
.detail-wrapper .detail-main .text {
	padding: 0 12px;
	font-weight: 700;
	font-size: 14px;
	color: white;
}
.detail-wrapper .detail-main ul li{
	list-style: none;
}
.detail-wrapper .detail-main ul{
	list-style: none;
	margin-left: 24%;
}
.detail-wrapper .detail-main ul li img{
	display: inline-block;
	width: 12px;
	height: 12px;
}
.detail-wrapper .detail-main ul li span{
	font-size:10px;
	color:rgb(255,255,255);
	font-weight:100;
}
.detail-wrapper .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
}
.detail-wrapper .detail-main .content{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(255,255,255);
}

</style>