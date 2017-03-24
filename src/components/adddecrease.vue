<template>
	<div class="adddescrease">
		<transition name="fade">
			<span class="icon-remove_circle_outline" v-show="count>0"  @click.stop="decrease"></span>
		</transition>
		<span class="count" v-show="count>0">{{count}}</span>
		<span class="icon-add_circle"  @click.stop="add"></span>
	</div>
</template>
<script>
import vm from '../../src/newvue.js'


export default{
	props:['goodsitemname','itemname','choosedcount','price'],
	data(){
		return {
			count:0,
		}
	},
	watch:{
		choosedcount:function(){
			this.count = this.choosedcount;
		}
	},
	created(){
			if(this.choosedcount)
			{
				this.count = this.choosedcount;
			}
			/*vm.$on('choosed',function(choosed){
  				if(choosed.goodsitemname === this.goodsitemname)
  				{  					
  					this.count = choosed.count;
  				}
  				else if(choosed.goodsitemname == -1)
  				{
  					this.count = 0;
  				}	
  			}.bind(this));*/		
	},
	mounted(){
		vm.$on('choosed',function(choosed){
  				if(choosed.goodsitemname === this.goodsitemname)
  				{  					
  					this.count = choosed.count;
  				}
  				else if(choosed.goodsitemname == -1)
  				{
  					this.count = 0;
  				}	
  			}.bind(this));
	},
	methods:{
		add(){
			vm.$emit('choosed',{'goodsitemname':this.goodsitemname,'price':this.price,'count':this.count+1});
			vm.$emit('totalprice',this.price);
		},
		decrease(){
			vm.$emit('choosed',{'goodsitemname':this.goodsitemname,'price':this.price,'count':this.count-1});
			vm.$emit('totalprice',this.price-2*this.price);
		},
	},

}
</script>
<style scoped>
.distance{
	margin-left:40px;
}
.adddescrease{
	display: inline-block;
	position: relative;

}
.icon-remove_circle_outline{
	position: absolute;
	width:24px;
	height: 22.289524987529px;
	left: -28px;
	transition: .6s all ease;
}
.icon-remove_circle_outline:before {
	font-family: 'icomoon';
	content: "\e906";
	font-size: 24px;
	color: rgb(0,160,220);
	line-height: 24px;
}
.icon-add_circle:before {
	font-family: 'icomoon';
	content: "\e900";
	font-size: 24px;
	color: rgb(0,160,220);
	line-height: 24px;


}
.count{
	font-size: 10px;
	width:8px;
	color: rgb(147,153,159);
	line-height: 24px;
	vertical-align: top;
}

.fade-enter,.fade-leave-active{
    left:0px !important;
    transform: rotate(720deg);
}
</style>