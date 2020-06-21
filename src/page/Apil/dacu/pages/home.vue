<style scoped lang="scss">
.main {
    min-height: 100%;
    background: #f9f9f9;
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: flex;
        background: #f9f9f9;
        color: #757575;
        z-index: 2;
        box-sizing: content-box;
        font-size: 15px;
        box-shadow: 0 -1px 0 0 rgba(234,234,234,0.26);
        div{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            img{
                width: 20px;
                height: 20px;
                margin-right: 6px;
            }
             background: #fff;
        }
        .active {
            background: #FFF7ED;
            color: #FF6632;
        }
    }
    
}
.iPhoneX{
    footer {
        padding-bottom: 20px;
    }
}
</style>

<template>
    <div :class="['main',platForm==0?'wxMin':'']" >
        <topDanmu :dataObj="danmuData" v-if="danmuData.length > 0"></topDanmu>
        <div @click.capture.stop="showPop" v-if="platForm==0">
            <transition>
                <!-- <keep-alive> -->
                    <router-view :key="key"  :is_update="is_update"></router-view>
                <!-- </keep-alive> -->
            </transition>
            <footer>
                <router-link :to="main_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')<0}">
                    <img src="../assets/images/icon_1goods1@2x.png" v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <img src="../assets/images/icon_1goodsgray@2x.png" v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <span>今日免单团</span>
                </router-link>
                <router-link :to="my_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')>-1}">
                    <img src="../assets/images/toux@2x.png"  v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <img src="../assets/images/icon_mygoods1@2x.png"  v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <span>我的免单团</span>
                </router-link>
            </footer>
        </div>
        <div  v-if="platForm!=0">
            <transition>
                <!-- <keep-alive> -->
                    <router-view :key="key"  :is_update="is_update"></router-view>
                <!-- </keep-alive> -->
            </transition>
            <footer>
                <router-link :to="main_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')<0}">
                    <img src="../assets/images/icon_1goods1@2x.png" v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <img src="../assets/images/icon_1goodsgray@2x.png" v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <span>今日免单团</span>
                </router-link>
                <router-link :to="my_url" tag="div" :class="{'active':$route.path.indexOf('/home/myFree')>-1}">
                    <img src="../assets/images/toux@2x.png"  v-if="$route.path.indexOf('/home/myFree')>-1"/>
                    <img src="../assets/images/icon_mygoods1@2x.png"  v-if="$route.path.indexOf('/home/myFree')<0"/>
                    <span>我的免单团</span>
                </router-link>
            </footer>
        </div>
        <msgBox :msgTxt="msgTxt"></msgBox>
        <downLoad :popShow="downloadPopShow"></downLoad>
        <oldUserPop :oldUserPopShow="oldUserPopShow"></oldUserPop>
    </div>
</template>

<script >
import downLoad from "../components/downLoad";
import oldUserPop from "../components/oldUserPop";
import msgBox from "@/components/msgBox";
import topDanmu from "../components/topDanmu";
import {getEnvironment,jump2Login,_getUserInfo} from "@/assets/js/common/utils";
import {danmuList} from "./../assets/js/api.js";
import {toMainFree,toMyFree} from './../assets/js/url.js'

export default {
    name: "freeCharge",
    components: {
        topDanmu,
        downLoad,
        oldUserPop,
        msgBox
    },
    data() {
        return {
            danmuData: [], //弹幕数据 
            is_update:false,//强制刷新
            downloadPopShow:false,//下载弹框
            oldUserPopShow:true,//老用户提示
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            user_info: _getUserInfo(),
            msgTxt: "",
        };
    },
    created() {
        if(this.platForm==0){
            this.
            this.getDanmuData();
        }
    },
    directives: {
        trigger:{
            inserted(el,binding){
                el.click();
            }
        }
    },
    methods: {
        showPop(){
            this.downloadPopShow=this.isWx
        },
        //获取弹幕信息
        getDanmuData(){
            this.$http.get(danmuList).then(res=>{
                if(res.data.result==1){
                    this.danmuData=res.data.items;
                }
            },err=>{})
        },
        //更新组件
        my_update(){
            this.is_update=!this.is_update;
        },
    },
    //  watch: {
    //     $route(to,from){
    //         if(from.name=="goodsDetail"){
    //             alert(from.name+"21341234");
    //             this.$forceUpdate();
    //         }
    //     }
    // },
    computed: {
        key(){
            return this.$route.name
        },
        main_url(){
            return toMainFree
        },
        my_url(){
            return toMyFree
        }
    },
    
};
</script>

