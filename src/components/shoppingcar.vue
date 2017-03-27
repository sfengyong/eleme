<template> 
	<div>
		<footer>
			<div class="left">
				<div class="car" @click="showdetail">
					<div class="carBackground" :style="[carbgstyle[count>0?1:0]]">
						<div class="icon-shopping_cart"></div>
					</div>
					<div class="number" v-show="count!=0">{{count}}</div>			
				</div>
				<div class="price">
					<div class="payPrice" :class="{'white':(totalprice!=0)}">￥{{animatedNumber}}</div>
					<div class="deliveryPrice" >另需配送费￥{{deliveryPrice}}元</div>
				</div>
			</div>
			<div class="right" :class="{'green':(totalprice>=minPrice)}">{{confirm}}</div>
		</footer>
	</div>
</template>
<script>
import vm from '../../src/newvue.js'

export default{
	props:["deliveryPrice","minPrice"],
	data(){
		return {
			flag:'false',
			totalprice:0,
			confirm:"",
			animatedNumber:0,
			count:0,
			carbgstyle:[{'background-color': '#222B34',  'color': 'rgba(255,255,255,0.4)'},
						{'background-color':'rgb(0,160,220)','color':'white'}],
		}
	},
	watch:{
		
		minPrice:function(){
			this.confirm = "￥"+this.minPrice+"起送";
		},

		totalprice:function(newValue, oldValue){
				if(newValue == 0)
			     {
			     	this.confirm = "￥"+this.minPrice+"起送";
			     }
			     else if(newValue<this.minPrice)
			     {
			     	this.confirm = "还差"+(this.minPrice - newValue)+"元起送";
			     }
			     else{
			     	this.confirm = "去结算";
			     }

				var vm = this;
			    function animate (time) {
			        requestAnimationFrame(animate)
			        TWEEN.update(time)
			      }
			    new TWEEN.Tween({ tweeningNumber: oldValue })
			      .easing(TWEEN.Easing.Quadratic.Out)
			      .to({ tweeningNumber: newValue }, 500)
			      .onUpdate(function () {
			        vm.animatedNumber = this.tweeningNumber.toFixed(0)
			      })
			    .start()
			     animate()			     
		}
	},
	mounted(){
		vm.$on("countChange",function(obj){
			if(obj.msg === "add")
			{
				this.totalprice += obj.foods.price;
				this.count++;
			}
			else if( obj.msg === "decrease")
			{
				if(this.totalprice!=0)
				{
					this.totalprice -= obj.foods.price;
					this.count--;
				}
			}
		}.bind(this));
		vm.$on("clearout",function(){
			this.totalprice = 0;
		}.bind(this));
	},
	methods:{
		showdetail(){
			this.flag = !this.flag;
			vm.$emit('flag',this.flag);
		},
	}	
}
</script>
<style scoped>
footer{
	display: flex;
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 48px;
	background-color: #141d27;
	z-index: 10;

}
footer .left{
	flex: 1;
}
footer .left .car{
	display: inline-block;
	position: relative;
	width: 56px;
	height: 56px;
	top: -10px;
	padding: 6px;
	box-sizing:border-box;
	border-radius: 50%;
	margin:0px 0px 0px 18px;
	background-color: #141d27;
	/* background-color: #222B34; */

}
footer .left .car .number{
	position: absolute;
	text-align: center;
	left: 43px;
	top: 0px;
	font-size: 9px;
	font-weight: 350;
	color: white;
	line-height: 16px;
	width: 24px;
	height: 12px;
	border-radius: 6px;
	background-color:rgb(240,20,20);
	box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
}
footer .left .car .carBackground{
	
	width: 100%;
  	height: 100%;
  	border-radius: 50%;
  	box-sizing: border-box;
   /*  padding-left: 10px; */
    padding-top: 9px;
    text-align: center;
}

.icon-shopping_cart:before {
  content: "\e907";
  font-family: 'icomoon';
  font-size: 24px;
  text-align: center;
}
footer .left .price{
	display: inline-block;
	vertical-align: top;
}

footer .left .price .payPrice{
	display: inline-block;
	width: 45px;
	font-size: 16px;
	color: rgba(255,255,255,0.4);
	font-weight: 350px;
	line-height: 24px;
	margin-top: 12px;
	margin-right: 2px;
}

footer .left .price .white{
	color: rgb(255,255,255);
}

footer .left .price .deliveryPrice{
	font-size: 12px;
	color: rgba(255,255,255,0.4);
	font-weight: 350;
	line-height: 24px;
	border-left: 1px solid rgba(255,255,255,0.1);
	padding-left: 12px; 
	display: inline-block;
}
footer .right{
	width: 105px;
	height: 100%;
	box-sizing:border-box;
	padding-top: 13px;
	padding-left: 19px;
	background-color: #2B333B;
	font-size: 13px;
	color: rgba(255,255,255,0.4);
	font-weight: 350px;
	line-height: 24px;
}

footer .green{
	background-color: #14D212;
	color: white;
	padding-left: 30px;
    font-size: 14px;
}

</style>
