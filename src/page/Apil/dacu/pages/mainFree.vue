<style scoped lang="scss">
.wrapper{
    // background: #f9f9f9;
}
.list {
    height: 100%;
    background: #f9f9f9;
    .ruleImg {
        position: fixed;
        width: 54px;
        // height: 62px;
        right: 14px;
        top: 0;
        z-index: 4;
    }
    &.pt30{
        padding-top: 30px;
    }
    .container {
        width: 100%;
        padding-bottom: 48px;
        .top {
            width: 100%;
            position: relative;
            img {
                width: 100%;
                
            }
            .rule_txt{
                position: absolute;
                width: 3.375rem;
                right: 14px;
                top: 0;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                color: #DB2331;
            }
        }
        .goods_container{
            height: 320px;
            overflow: hidden;
            opacity: 0;
            transition: all .2s;
            &.swiper-slide-active{
                height: auto;
                opacity: 1;
            }
            .empty-data{
                color: #fff;
                text-align: center;
                font-size: 16px;
            }
        }
        .goods-list{
            padding: 12px 8px;
            li{
                background-color: #fff;
                margin-top: 12px;
                display: flex;
                background: #fff;
                border-radius: 8px;
                align-items: center;
                height: 130px;
                &:first-child{
                    margin-top: 0;
                }
                .list-item-left{
                    flex: 0 0 117px;
                    height: 127px;
                    padding: 10px 0 10px 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-right{
                    flex: 1;
                    padding: 5px 10px 0;
                    .goods-name{
                        // margin-bottom: 13px;
                        height: 34px;
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
                    .goods-middle{
                        margin-top: 3px;
                        margin-bottom: 13px;
                        font-size: 11px;
                        color: #EE0000;
                        letter-spacing: 0;
                        line-height: 11px;
                        display: flex;
                        justify-content: space-between;
                        font-weight: 500;
                        .goods-price{
                            font-size: 18px;
                            color: #EE0000;
                            letter-spacing: 0;
                            line-height: 18px;
                            font-weight: bold;
                            span{
                                font-size: 13px;
                            }
                        }
                        .goods-orgin-price{
                            font-size: 11px;
                            color: #FF5A32;
                            line-height: 18px;
                        }
                    }
                    .goods-bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        .goods-tip{
                            background: #FDE9D9;
                            border-radius: 2px;
                            font-size: 11px;
                            color: #FF6632;
                            padding: 6px;
                            max-width: 135px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .goods-btn{
                            width: 100%;
                            height: 32px;
                            background-image: linear-gradient(90deg, #FF7219 0%, #FF0D0D 100%);
                            border-radius: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #fff;
                            text-align: center;
                            line-height: 32px;
                            span{
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
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
    <div :class='["list",$parent.danmuData.length > 0 ? "pt30" : ""]'>
        <img
            src="../assets/images/icon_strategy@2x.png"
            class="ruleImg"
            @click.stop="popRule"
        /> 
        <pullUpBox class="wrapper" :data="list" @loadMore="loadData">
            <div class="container">
                <div class="top">
                    <img
                        src="../assets/images/banner@2x.png"
                        class="bg"
                    />
                </div>
                <scrollNav :fixedTop="fixedTop" :navData="navData" :scrollShow="scrollShow" @navChange="navChange" ref="nav"></scrollNav>
                <swiperList :datas="datas" :slideIndex="slideIndex" @changeIndex='changeIndex'>
                    <swiper-slide v-for="(typelist,i) in datas" :key="i" class="goods_container">
                        <ul class="goods-list">
                            <li v-for="(item, index) in typelist" :key="index" @click="toGoods(item.goodsId, item.goodsName,item.userNum)">
                                <div class="list-item-left">
                                    <img :src="item.img640Url" alt="">
                                </div>
                                <div class="list-item-right">
                                    <div class="goods-name">{{item.goodsName}}</div>
                                    <div class="goods-middle">
                                        <div class="goods-price"><span>¥</span>{{item['minGroupPrice']}}</div>
                                        <div class="goods-orgin-price">{{item.userNum}}人成功免单</div>
                                    </div>
                                    <div class="goods-bottom">
                                        <!-- <div class="goods-tip">
                                            {{item.lotteryNum}}人参与必有1人中奖
                                        </div> -->
                                        <div class="goods-btn" @click.stop="popSku(item)">免费送礼<span>（3人成团 全员免单）</span></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="typelist.length < 1" class="empty-data">暂无商品</div>
                    </swiper-slide>
                </swiperList>
            </div>
        </pullUpBox>
        <rule :ruleShow="ruleShow"></rule>
        <buySystem :goodsData="goodsData" @buySubmit="buySubmit" :buyStart="buyStart"></buySystem>
    </div>
</template>

<script >
import { getQueryString, check_login,shareToWx,_getUserInfo,userAppPay} from "@/assets/js/common/utils.js";
import skuCheck from "@/components/skuCheck";
import pullUpBox from "@/components/pullUpBox";
import buySystem from "@/components/buySystem";
import { swiperSlide } from "vue-awesome-swiper";
import swiperList from '@/components/swiper.list.vue';
import H5Pay from "@/assets/js/common/H5pay";
import { goodsList,tagsList,goodsDetail,orderAdd} from "./../assets/js/api.js";
import { toGoodsDetail } from "./../assets/js/url.js";
import scrollNav from "../components/scrollNav";
import rule from "./rule";
export default {
    name: "todayFree",
    data() {
        return {
            page: [],
            hasData: false, //页面无数据不显示，只显示加载loading
            ruleShow: false, //规则
            list: [], //店铺列表
            buyStart: false,
            scrollShow: false, //导航是否请求完成
			goodsData: {}, //所选商品数据(含sku)
            datas:[],//
            danmuData: [], //弹幕数据
            isLoadData: true, //是否加载数据
            mySpecId: '', // 我的规格id
            sort_type: 1, //排序类型
            user_info: _getUserInfo(),
            goodsId:"",
            slideIndex:0,
            fixedTop: {
                flag: true,
                top: "0"
            },
            navData: {},
            cate: "",
            isEmpty: false
        };
    },
    created() {
        this.getTages();
    },
    methods: {
        popRule() {
            this.ruleShow = true;
        },
        loadData() {
            if (!this.isLoadData) {
				this.isLoadData = true;
				this.getData(this.slideIndex, this.sort_type);
			}
        },
        navChange(obj) {
            this.cate = obj.id;
            let temp = this.navData.data.find(item => item.id == obj.id);
            this.slideIndex = this.navData.data.indexOf(temp);
            this.list = this.datas[this.slideIndex];
            if (
                this.datas[this.slideIndex].length == 0 ||
                obj.sort != this.sort_type
            ) {
                this.getData(this.slideIndex, obj.sort);
            }
        },
        getTages() {
            let params = {};
            this.$http.get(tagsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    this.navData = {
                        data: data.data,
                        type: 3
                    };
                    for(let i=0;i<data.data.length;i++){
                        this.datas.push([])
                        this.page.push(1)
                    }
                    if(data.data.length > 0){
                        this.scrollShow = true;
                        this.cate=data.data[0]["id"]
                    }
                } else {
                    this.$parent.msgTxt =
                        (res && res.data && res.data.message) ||
                        "商品列表请求失败";
                }
                this.getData(0,1);
            });
        },
        getData(index, sort_type) {
            let params = {};
            if (this.page[index] < 1 && sort_type == this.sort_type) return;
            if (sort_type != this.sort_type) {
                params.page = 1;
            } else {
                params.page = this.page[index];
            }
            if (this.cate == 0 || this.cate) {
                params.cate_id = this.cate;
                params.sort_type = sort_type;
            }
            this.$http.get(goodsList, { params }).then(res => {
                let data = res.data;
                if (data && data.result == 1) {
                    if (this.sort_type != sort_type) {
                        this.sort_type = sort_type;
                        this.list = data.data;
                        this.datas[this.slideIndex] = data.data;
                    } else {
                        this.datas[this.slideIndex].push(...data.data);
                        this.list = this.datas[this.slideIndex];
                    }
                    this.page[this.slideIndex] = data.next_page;
                    if (this.list.length < 1) {
                        this.isEmpty = true;
                    } else {
                        this.isEmpty = false;
                    }
                } else {
                    this.$parent.msgTxt =
                        (res && res.data && res.data.message) ||
                        "商品列表请求失败";
                }
                this.isLoadData = false;
            });
        },
        //规格弹框
        popSku(goods) {
            if (!check_login()) return;
            if (getQueryString("is_first")) {
                this.$parent.downloadPopShow=true;
                return;
            }
            this.goodsId = goods.goodsId;

            this.goodsData = goods;
            if (!goods["totalStock"]) {
                this.$parent.msgTxt = "该商品没有库存或已下架";
                return;
            }

            this.buyStart = true;
        },

        // 确认送礼页面分享给微信好友
        sendShare(obj){
            //分享成功回调
            this.createOrder(obj);
        },
        buySubmit(buyObj){
            console.log(buyObj)
            this.createOrder(buyObj);
        },
        createOrder(obj) {
            let self = this;
            let os = getQueryString("os");
            let params = {
                version:  getQueryString("version"),
                user_id: this.user_info["user_id"],
                goods_id: this.goodsId,
                spec_id: this.mySpecId,
                address_id: this.address_id,
                payment_id: this.payType,
                num: 1,
                os: os
            };
            if(this.$parent.platForm==0){
                params["platForm"]="wechat";
            }
            this.$http.post(orderAdd, params).then(res => {
                let data = res.data;
                if (data["status"] == 1) {
                   if (this.platForm == 1) {
                        userAppPay({
                            orderNo: data.data.orderNo,
                            goodsName: data.data.orderName,
                            payType: self.payType,
                            price: data.data.payAmount,
                            linkUrl:
                                `${location.origin}/freeCharge/view/${process.env.VERSION}/share/paid/1`,
                            webLinkUrl:
                                `${location.origin}/freeCharge/view/${process.env.VERSION}/share/paid/1`
                        });
                    } else if (this.platForm == 0) {
                        //微信内置
                        H5Pay.init("wxpayIn", {
                            order_no: data.data.orderNo,
                            goods_name: data.data.orderName,
                            payNo: data.data.payNo,
                            successFn: () => {
                                console.log('successFn')
                            }
                        });
                    }

                } else {
                    this.$parent.msgTxt =
                        data && data.message ? data.message : "网络失败";
                }
            });
        },
        changeIndex(index){
            // this.navChange(this.navData.data[index]["id"]);
            this.$refs.nav.navClisk(this.navData.data[index]["id"])
        },
        // 去商品详情页
        toGoods(id, title, num) {
            this.$router.push(
                `${toGoodsDetail}/goods_id/${id}/goods_name/${title}/group_number/${num}`
            );
        },
    },
    components: {
        rule,
        pullUpBox,
        scrollNav,
        swiperSlide,
        swiperList,
        skuCheck,
        buySystem
    },
};
</script>

