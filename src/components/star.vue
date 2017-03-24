<template>
	<div>
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	export default{
		props: {
            score: {
                type: Number
            }
        },
        data() {
            return {

            }
        },
        computed:{
        	itemClasses(){
        		var result=[];
        		var score = Math.floor(this.score*2)/2;
        		var half = this.score%1!=0?true:false;
        		for(var i = 0 ; i < Math.floor(score); i++ )
        		{
        			result.push("on");
        		}
        		if(half)
        		{
        			result.push("half");
        		}
        		while(result.length<5)
        		{
        			result.push("off");
        		}
        		return result;

        	}
        }
	}
</script>
<style scoped>
/* div{
    margin-left:20px;
} */
.star-item{
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-right: 10px;
	background-size: 20px 20px;
}
.on{
	background:url(../../src/assets/star24_on@2x.png);
}
.half{
	background:url(../../src/assets/star24_half@2x.png); 
}
.off{
	background:url(../../src/assets/star24_off@2x.png); 
}
</style>