<template>
	<div class="adddescrease">
		<transition name="fade">
			<span class="icon-remove_circle_outline" v-show="count>0"  @click.stop="decrease"></span>
		</transition>
		<span class="count" v-show="count>0">{{count}}</span>
		<span class="icon-add_circle"  @click.stop="add"></span>
		<span class="point"  :style="jump">1</span>
	</div>
</template>
<script>
import vm from '../../src/newvue.js'


export default{

	props:['count','foods'],
	data(){
		return {
			jump:{'top':'','left':'','display':'none'},
		}
	},
	watch:{
		count:function(newvalue,oldvalue){
			if(newvalue > oldvalue)
			{
				var point = document.getElementsByTagName('span')[3];
				this.jump.top = document.documentElement.clientHeight - point.offsetTop - 48 +'px';
				this.jump.left = 49 - point.offsetLeft + 'px';
				this.jump.display = 'inline-block';
			}
		}
	},
	methods:{
		add(){
			vm.$emit('countChange',{'foods':this.foods,'msg':'add'});
		},
		decrease(){
			vm.$emit('countChange',{'foods':this.foods,'msg':'decrease'});
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
.point{
	transition: top 1s linear,left 1s linear;
	background-color: #00A0DC;
	box-sizing:border-box;
	padding-top: 2.5px;
    width: 21px;
    height: 21px;
    border-radius: 10.5px;
    display: inline-block;
    color: white;
    text-align: center;
    font-size: 5px;
    position: absolute;
    z-index: 0;
    top: 0px;
    left: 1px;
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