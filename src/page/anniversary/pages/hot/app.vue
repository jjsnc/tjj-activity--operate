<template>
	<div id="xbct">
		<div class="banner" @click="bb()"><img v-lazy="banner" /></div>
		<div class="img-show" v-for="(img,$i) in imgs" :key="'A-'+$i" @click="jumpRouter($i)"><img v-lazy="img" /></div>
	  	<div class="shares" @click="shareMini('share/hot.jpg','最强榜单来袭，好货不贵0.1元起')">
	  		<img src="./../../assets/images/icon/share.png">
	  	</div>
	  	<div style="width: 100%;" v-if="hefs"><input v-model="ttt" /><div style="width: 100%;height: 1rem;" @click="aa"></div></div>
	</div>
</template>
<script>
	let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
	var that = null;
	export default {
		name: "xbct",
		created() {
			that = this
			that.initPv()
		},
		mounted() {
			if (xcx_user) {
				that.is_wx = true
		    } else {
		        that.is_wx = false
		    }
		},
		data(){
			return {
				banner:require('./../../assets/images/hot/hot_01.jpg'),
				imgs:[
					require('./../../assets/images/hot/hot_02.jpg'),
					require('./../../assets/images/hot/hot_03.jpg'),
					require('./../../assets/images/hot/hot_04.jpg'),
					require('./../../assets/images/hot/hot_05.jpg'),
					require('./../../assets/images/hot/hot_06.jpg'),
					require('./../../assets/images/hot/hot_07.jpg'),
					require('./../../assets/images/hot/hot_08.jpg'),
					require('./../../assets/images/hot/hot_09.jpg'),
					require('./../../assets/images/hot/hot_10.jpg'),
					require('./../../assets/images/hot/hot_11.jpg')
				],
				rtr:[
					'https://modeup.taojiji.com/taojiji/pages/2019/07/114bcefc6878830d84-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/15af92db7e87f3ddd2-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/15ce940f84ebf4984a-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/15f7ebe3785148b242-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/19efdc09b64aa129df-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/19627f8437898de07f-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/17e8da7bfbb92b80e5-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/1607ca360284cf83f9-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/18ae9a25a0cc6b5749-html5.html',
					'https://modeup.taojiji.com/taojiji/pages/2019/07/18801c8cc5134340cb-html5.html',
				],
				is_wx:false,
				hefs:false,
				ttt:"",
				sss:0
			};
		},
		methods: {
		    jumpRouter(num){
		    	that.eventdass()
    			window.location.href = this.rtr[num]
		    },
		    aa(){

		    },
		    bb(){

		    },
		    //埋点
		    eventdass() {
		      this.$.eventData({
		        pageName: "zhounian_22",
		        elementId: "btn"
		      });
		    },
	        // 进入页面发起埋点pv
		    initPv() {
		      this.$.initPv({
		        pageName: "zhounian_22"
		      });
		    }
		}
	};
</script>
<style scoped>
	#xbct {
		background: #080205;
	}
	img {
		width: 100%;
	}
	.banner{
		width: 12rem;
		height: 8.08rem;
	}
	.img-show{
		height: 7.6rem;
	}
	.shares {
  position: absolute;
  right: 0.22rem;
  top: 0.27rem;
  width: 1.92rem;
  height: 0.67rem;
	}
</style>