<style scoped lang="scss">
.list {
    height: 100%;
    // background: #fff;
    // padding-top: 16px;
    .ruleImg {
        position: fixed;
        width: 54px;
        // height: 62px;
        right: 14px;
        top: 0;
        z-index: 4;
    }
      &.mt30{
        margin-top: 30px;
    }
    .container {
        width: 100%;
        padding-bottom: 48px;
        .top {
            position: relative;
            padding-left: 10px;
            border-left: 3px solid #fff1b0;
            color: #fff1b0;
            font-size: 16px;
        }
        .empty-data{
                color: #fff;
                text-align: center;
                font-size: 16px;
                img{
                    width: 204px;
                    margin:110px auto 22px auto;
                }
            }
        .goods-list {
            padding: 12px 10px;
            // background-color: #fff;
            li {
                margin-top: 12px;
                display: flex;
                background: #fff;
                border-radius: 8px;
                align-items: center;
                height: 130px;
                &:first-child {
                    margin-top: 0;
                }
                .list-item-left {
                    flex: 0 0 120px;
                    height: 130px;
                    padding: 10px 0px 10px 10px;
                    position: relative;
                    .goods-status {
                        width: 48px;
                        height: 48px;
                        position: absolute;
                        top: -5px;
                        right: -5px;
                    }
                    .goods-img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right {
                    flex: 1;
                    padding: 10px 14px;
                    .goods-name {
                        margin-bottom: 14px;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 17px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .goods-middle {
                        margin-bottom: 20px;
                        font-size: 11px;
                        color: #ee0000;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        .time {
                            font-size: 12px;
                            color: #757575;
                            letter-spacing: 0;
                            line-height: 18px;
                            span {
                                color: #ff6632;
                            }
                            img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                        .tip {
                            font-size: 12px;
                            color: #ee0000;
                            line-height: 18px;
                            font-weight: bold;
                        }
                    }
                    .goods-bottom {
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        .goods-detail {
                            font-size: 14px;
                            color: #ff5a32;
                            border: 1px solid #ff5a32;
                            border-radius: 4px;
                            width: 60px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            margin-right: 10px;
                        }
                        .goods-btn {
                            width: 84px;
                            height: 32px;
                            background-image: linear-gradient(90deg, #FF7219 0%, #FF0D0D 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #fff;
                            text-align: center;
                            line-height: 32px;
                        }
                        .goods-share{
                            background-image: linear-gradient(-180deg, #92EA35 0%, #5CCF23 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            color: #fff;
                            height: 32px;
                            padding: 8px 13px;
                        }
                        .userIcon{
                            display: flex;
                            flex: 1;
                            img{
                                width: 20px;
                                height: 20px;
                                border-radius: 20px;
                                margin-left: -5px;
                            }
                        }
                    }
                }
            }
        }
    }
    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        display: flex;
        .active {
            background: #fde9d9;
        }
    }
}
.iPhoneX{
    .list{
        .container{
            padding-bottom: 68px;
        }
    }
}
</style>
<template>
    <div class="list"  :class='["list",$parent.danmuData.length > 0 ? "mt30" : ""]'>
        <img
            src="../assets/images/icon_strategy@2x.png"
            class="ruleImg"
            @click.stop="popRule"
        />
        <pullUpBox class="wrapper" :data="list" @loadMore="loadData">
            <div class="container">
                <!-- <div class="top">
                    送礼记录
                </div> -->
                <div v-show="list.length < 1" class="empty-data">
                    <!-- <img src="../assets/images/quesheng@2x.png"  /> -->
                    <div>抱歉～这里空空如也</div>
                </div>
                <ul class="goods-list">
                    <li v-for="(item, index) in list" :key="index" >
                        <div class="list-item-left">
                            <img :src="item.goods_img" class="goods-img"/>
                            <img src="../assets/images/fail@2x.png" class="goods-status" v-if="item.status=='3'" />
                            <img src="../assets/images/success@2x.png" class="goods-status"  v-if="item.status=='4'" />
                        </div>
                        <div class="list-item-right">
                            <div class="goods-name">{{item.goods_name}}</div>
                            <div class="goods-middle" v-if="item.status=='2'">
                                <div class="time"><span>{{item.group_time}}</span>后拼团失效</div>
                                <div class="tip">待成团</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='3'">
                                <div class="time"></div>
                                <div class="tip">免单失败</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='4'">
                                <div class="time">
                                     可前往我的订单查看物流详情
                                    <!-- <img :src="item.userIcon"  /> -->
                                </div>
                                <div class="tip">免单成功</div>
                            </div>
                            <div class="goods-middle" v-if="item.status=='1'">
                               <div class="time"><span>{{item.group_time}}</span>后取消订单</div>
                                <div class="tip">待支付</div>
                            </div>
                            
                            <div class="goods-bottom">
                                <div  v-if="item.status=='4'" class="userIcon">
                                     <img :src="item.user_icon" v-for="(i,count) in 3" :key="count" />
                                </div>
                                <div class="goods-detail" v-if="item.status!='1'" @click="toShareDetail(item.id)">
                                    详情
                                </div>
                                <div class="goods-share" @click.stop="share(item,0)"  v-if="item.status=='2'">邀请好友拼团</div>
                                <div class="goods-btn" @click.stop="pay(item)"  v-if="item.status=='1'">去支付</div>
                                <div class="goods-btn" @click.stop="buy(item)"  v-if="item.status=='3'">重新购买</div>
                                <div class="goods-btn" @click.stop="buy(item)"  v-if="item.status=='4'">再来一单</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </pullUpBox>
		<msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script >
import pullUpBox from "@/components/pullUpBox";
import msgBox from "@/components/msgBox";
import { shareToWx,getQueryString,getEnvironment,userAppPay} from "@/assets/js/common/utils.js";
import { myGoodsList,orderAdd } from "./../assets/js/api.js";
import { toGoodsDetail,toShare } from "./../assets/js/url.js";
import Wechat_api from "@/assets/js/common/wechat_api.js";
import H5Pay from "@/assets/js/common/H5pay";
export default {
    name: "myFree",
    props:{
        is_update:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            page: 1,
            hasData: false, //页面无数据不显示，只显示加载loading
            list: [], //店铺列表
            isLoadData: true, //是否加载数据
            msgTxt: "",
            goodsId:"",
            isEmpty: false,
            shareData:{},//分享确认框显示内容
            shareShow: false,//分享
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
        };
    },
    watch: {
        is_update(){
            this.getData();
        }
    },
    created() {
        this.getData();
    },
    methods: {
        loadData() {
            if (!this.isLoadData) {
				this.isLoadData = true;
				this.getData();
			}
        },

        getData() {
            if (this.page < 1) return;
            let params = {
                page: this.page
            };
            this.$http.get(myGoodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.list = this.list.concat(data.data);
                    this.transtotime()
                    this.page = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.msgTxt =
                        (res && res.data && res.data.message) ||
                        "商品列表请求失败";
                }
                this.isLoadData = false;
            });
        },

        getDataRequest(params){
            this.$http.get(myGoodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.list = data.data;
                    this.page = data.nextPage;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.msgTxt =
                        (res && res.data && res.data.message) ||
                        "商品列表请求失败";
                }
                this.isLoadData = false;
            });
        },
        // 去商品详情页
        toShareDetail(id){
            this.$router.push(
                `${toShare}/group_id/`+id,
            );
        },
        share(goods,type) {
			this.goodsId = goods.goodsId;
            this.mySpecId=goods.specId;
            
            if(type==0){

                let obj={
                    title:"我发起了免单购物，3人参团，全团免单！限时3小时，快来抢！",
                    content:goods["goods_name"] + "\n" + "免单特权，机不可失！",
                    shareUrl:location.origin + '/freeCharge/view/v1_0_0/index/group_id/' + goods["order_no"],
                    imgUrl:goods["goods_img"],
                };
                shareToWx(obj);
            }else {
                // 初始化分享
                new Wechat_api({
                    shareJson: {
                        title: "我发起了免单购物，3人参团，全团免单！限时3小时，快来抢！", // 分享标题
                        link:
                            location.origin +
                            "/clock/view/v1_0_0/index/s_user_id/"+self.user_info.user_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: data.goods_info.goods_img, // 分享图标
                        desc: `${
                            data.goods_info.goods_name
                        }\n 打卡${self.surplus_day +
                            self.clock_day}次，全额返现`
                    }
                });
                this.shareData={
                    title:"3人成团，全员免单，快来一起免单购物！",
                    content:"免单特权，机不可失！",
                };
                this.shareShow=true;
            }
        },
        toTwo(obj){
            if (obj < 10) {
                obj = '0' + obj;
            }
            return obj;     
        },
        transtotime(){
            let h = 0; //小时
            let m = 0; //分钟
            let s = 0; //秒数
            let self = this;
            let mycount = setInterval(()=>{
                let arr = self.list;
                let count = 0;
                // let temp = 0;
                for(let key in arr){
                    let time = arr[key]["times"];
                    if(time>0){
                        time = parseInt(time) - 1;
                        h = this.toTwo(Math.floor((time / 60 / 60) % 24));
                        m = this.toTwo(Math.floor((time / 60) % 60));
                        s = this.toTwo(Math.floor((time) % 60));
                        arr[key]["time"]=  h + ":" + m + ":" + s;
                        arr[key]["times"]=  time;
                        self.list = arr;
                    }else{
                        // if(temp!=count&&arr[key]['status']=='0'){
                            // self.getDataRequest({page:1});
                        // }
                        // temp=count++;
                    }
                }
                if(count==arr.length) clearInterval(mycount);
                self.$forceUpdate()
            },1000)
        },

        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            let params = {
                // activities:"signInCashBack",
                version:  getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                address_id: this.address_id,
                payment_id: this.payType,
                num: 1,
                os: os
            };
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                    pay(data.data);
                } else {
                    this.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        pay(item){
            let slef=this;
             if (this.platForm == 1) {
                userAppPay({
                    orderNo: item.orderNo,
                    goodsName: item.orderName,
                    payType: self.payType,
                    price: item.payAmount,
                    linkUrl:
                        `${location.origin}/freeCharge/view/${process.env.VERSION}/share/paid/1`,
                    webLinkUrl:
                        `${location.origin}/freeCharge/view/${process.env.VERSION}/share/paid/1`
                });
            } else if (this.platForm == 0) {
                //微信内置
                H5Pay.init("wxpayIn", {
                    order_no: item.orderNo,
                    goods_name: item.orderName,
                    payNo: item.payNo,
                    successFn: () => {
                        console.log('successFn')
                        window.location.href=`${location.origin}/freeCharge/view/${process.env.VERSION}/share/paid/1`
                    }
                });
            }
        }
    },
 
    components: {
        msgBox,
        pullUpBox
    }
};
</script>

