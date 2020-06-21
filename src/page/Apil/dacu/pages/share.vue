<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
.share-page {
    box-sizing: border-box;
    padding: 15px 10px;
    background-image: linear-gradient(-270deg, #ff7219 0%, #ff0d0d 100%);
    height: fit-content;
    .status-main {
        background: #ffffff;
        border-radius: 6px;
        width: 354px;
        margin: 0 auto 10px;
        .header {
            height: 62px;
            .type {
                height: 62px;
                line-height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .info-details {
                height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 10px;
                .info {
                    padding-left: 12px;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-height: 17px;
                    -webkit-box-orient: vertical;
                }
                .my-img {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                }
            }
            .icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("../assets/images/WAITE@2x.png");
                background-size: 20px 20px;

                &.success {
                    background: url("../assets/images/success-pt@2x.png");
                    background-size: 20px 20px;
                }
                &.fail {
                    background: url("../assets/images/fail-pt@2x.png");
                    background-size: 20px 20px;
                }
            }
            .text {
                display: inline-block;
                margin-left: 6px;
                font-size: 20px;
                color: #333333;
                letter-spacing: 0;
            }
        }
        .goods {
            width: 336px;
            height: 110px;
            margin: 0 auto;
            background: #f9f9f9;
            border-radius: 8px;
            .details {
                box-sizing: border-box;
                padding: 10px 6px;
                display: flex;
                .left {
                    width: 90px;
                    height: 90px;
                    flex: 0 0 90px;
                    .my-img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    width: 236px;
                    flex: 1;
                    padding-left: 12px;
                    .text {
                        height: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .price {
                        font-size: 0;
                        padding: 12px 0 11px;
                        .icon {
                            font-size: 12px;
                            color: #ff0e0d;
                            letter-spacing: 0;
                            transform: scale(0.95);
                        }
                        .number {
                            font-size: 18px;
                            color: #ff0e0d;
                            letter-spacing: 0;
                        }
                    }
                    .info {
                        width: 224px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .status-detalis {
            .title-3 {
                font-size: 0;
                width: 312px;
                margin: 0 auto;
                padding: 12px 0 14px;
                text-align: center;
                line-height: 17px;
                &.status-2 {
                    padding-top: 0;
                }
                .red-color {
                    font-size: 14px;
                    color: #ff0f0e;
                }
                .icon {
                    font-size: 12px;
                    color: #ff0e0d;
                    letter-spacing: 0;
                    transform: scale(0.95);
                }
                .text {
                    font-size: 14px;
                    color: #151515;
                    font-weight: 300;
                }
            }
        }
        .count-down-sec {
            text-align: center;
            .data-area {
                .num {
                    display: inline-block;
                    width: 24px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    // background-image: url(./../assets/images/icon_bac_djs@2x.png);
                    background-color: rgb(51, 51, 51);
                    border-radius: 3px;
                    font-size: 16px;
                    color: #ffffff;
                    background-size: contain;
                    font-weight: bold;
                }
                .text {
                    display: inline-block;
                    width: 16px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #333333;
                    vertical-align: top;
                }
            }
            .tips {
                font-size: 13px;
                color: #333333;
                text-align: center;
                line-height: 13px;
                padding: 8px 0 20px;
            }
        }
        .num-count-sec {
            .title-3 {
                padding-bottom: 12px;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                line-height: 22px;
                .red-color {
                    color: #ff0f0e;
                }
            }
            .list {
                display: flex;
                padding-bottom: 24px;
                justify-content: center;
                .item {
                    margin-right: 18px;
                    .my-img {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                    }
                    .name {
                        padding-top: 6px;
                        font-size: 13px;
                        color: #333333;
                        letter-spacing: 0;
                        text-align: center;
                        &.color-red {
                            color: #ff6632;
                        }
                    }
                }
                .item:last-child {
                    margin-right: 0;
                }
            }
            .btn {
                display: block;
                width: 290px;
                height: 48px;
                line-height: 48px;
                margin: 0 auto;
                text-align: center;
                font-size: 18px;
                border-radius: 22.5px;
                color: #ffffff;
                letter-spacing: 0;
                &.invite-btn {
                    background-image: linear-gradient(
                        -180deg,
                        #92ea35 0%,
                        #5ccf23 100%
                    );
                }
                &.is-grou-btn {
                    background-image: linear-gradient(
                        -90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
                &.success-btn {
                    background-image: linear-gradient(
                        -90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
                &.fail-btn {
                    background-image: linear-gradient(
                        -90deg,
                        #ff6632 2%,
                        #ed1400 100%
                    );
                }
            }
            .hack {
                height: 22px;
            }

            .tips {
                padding: 22px 0 12px;
                text-align: center;
                font-size: 13px;
                color: #666666;
                letter-spacing: 0;
                .color-red {
                    color: #ff0e0d;
                }
            }
        }
    }
}
</style>
<template>
    <div class="share-page">
        <section class="status-main">
            <header class="header">
                <div v-if="groupStatus==0">
                    <div class="type" v-if="isGroup==1">
                        <span class="icon"></span>
                        <span class="text" v-if="isGroup==1">待成团</span>
                    </div>
                    <div v-else class="info-details">
                        <div class="my-img-box">
                            <img class="my-img" width="34" height="34" src="../assets/images/2.png">
                        </div>
                        <div class="info">我发起了免单购物，3人成团即可全员免单限时3小时，速抢!</div>
                    </div>
                </div>
                <div v-else-if="groupStatus==1" class="type">
                    <span class="icon success"></span>
                    <span class="text">拼团成功，全员免单</span>
                </div>
                <div v-else-if="groupStatus==2" class="type">
                    <span class="icon fail"></span>
                    <span class="text">拼团失败，订单取消</span>
                </div>
            </header>
            <!-- 成团商品 -->
            <section class="goods">
                <div class="details">
                    <div class="left">
                        <img class="my-img" :src="goodsInfo.goodsImg">
                    </div>
                    <div class="right">
                        <p class="text">
                           {{goodsInfo.goodsName}} 
                        </p>
                        <p class="price">
                            <span class="icon">¥</span>
                            <span class="number">{{goodsInfo.goodsPrice}}</span>
                        </p>
                        <p class="info">{{goodsInfo.number}}人已成功免单</p>
                    </div>
                </div>
            </section>
            <section class="status-detalis">
                <h3 class="title-3" v-if="groupStatus==0">
                    <div v-if="isGroup==1">
                        <span class="red-color">2名</span>
                        <span class="text">新用户参团任意商品,</span>
                        <span class="icon">¥</span>
                        <span class="number red-color">{{goodsInfo.goodsPrice}}</span>
                        <span class="text">全额返现至现金账户</span>
                    </div>
                    <div v-else>
                        <span class="red-color">3人成团</span>
                        <span class="text">，拼团成功订单金额全额返现至现金账户</span>
                    </div>
                </h3>
                <h3 class="title-3" v-else-if="groupStatus==1">
                    <div v-if="isGroup==1">
                        <span class="icon">¥</span>
                        <span class="number red-color">19.9</span>
                        <span class="text">全额返现至现金账户</span>
                    </div>
                    <div v-else>
                        <span class="icon">¥</span>
                        <span class="number red-color">19.9</span>
                        <span class="text">将在订单发货后全额返现至现金账户</span>
                    </div>
                </h3>
                <h3 class="title-3 status-2" v-else-if="groupStatus==2"></h3>
            </section>
            <section class="section count-down-sec" v-if="groupStatus==0 || groupStatus==2">
                <div class="data-area">
                    <span class="num">0{{time.d[0]}}</span>
                    <span class="text">:</span>
                    <span class="num">{{time.h[0]}}{{time.h[1]}}</span>
                    <span class="text">:</span>
                    <span class="num">{{time.m[0]}}{{time.m[1]}}</span>
                    <span class="text">:</span>
                    <span class="num">{{time.s[0]}}{{time.s[1]}}</span>
                </div>
                <div class="tips">后免单特权过期</div>
            </section>
            <section class="section num-count-sec">
                <h3 class="title-3" v-if="groupStatus==0">
                    <span class="text">已有{{joinNum}}人参与，还差</span>
                    <span class="red-color">{{lackNum}}</span>
                    <span class="text">人</span>
                </h3>
                <ul class="list clearfix">

                    <li class="item" >
                        <div>
                            <img class="my-img" src="../assets/images/2.png">
                        </div>
                        <h6 class="name">张瑶</h6>
                    </li>
                    <li class="item">
                        <div>
                            <img class="my-img" src="../assets/images/ICON-DCT@2x.png">
                        </div>
                        <h6 class="name color-red">待参团</h6>
                    </li>
                </ul>
                <div v-if="groupStatus==0">
                    <a href="javaScript:;" class="btn invite-btn" v-if="isGroup==1">邀新用户参团享免单</a>
                    <a href="javaScript:;" class="btn is-grou-btn" v-if="isGroup==0">更多免单购物好货</a>
                    <div class="hack" v-if="isGroup==0"></div>
                </div>
                <div v-else-if="groupStatus==1">
                    <a href="javaScript:;" class="btn success-btn">更多免单商品</a>
                </div>
                <div v-else>
                    <a href="javaScript:;" class="btn fail-btn">更多免单商品</a>
                </div>

                <div class="tips" v-if="groupStatus==0 && isGroup==1">你邀请的好友参团成功也会获得全额返现哦</div>
                <div class="tips" v-if="groupStatus==1">
                    <div v-if="isGroup==1">可前往我的订单查看物流详情</div>
                    <div v-else>
                        可前往
                        <span class="color-red">淘集集App</span>我的订单查看物流详情
                    </div>
                </div>
                <div class="tips" v-if="groupStatus==2">拼团失败，付款金额原路退回</div>
            </section>
        </section>
        <section v-if="isGroup==1 && groupStatus==1">
            <scrollNotice :noticeList="noticeList"></scrollNotice>
        </section>
        <section v-else class="guessLike">
            <guessLike></guessLike>
        </section>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
import scrollNotice from "../components/scrollNotice";
import msgBox from '@/components/msgBox'
import guessLike from "../components/guessLike";
import Wechat_api from '@/assets/js/common/wechat_api.js?v=1'
import {checkToken, is_weixin, getQueryString} from '@/assets/js/common/utils.js'
import { shareDetail, shareDanmuList} from "./../assets/js/api.js";
import { countDown } from "./../assets/js/utils.js";
export default {
    name: "share",
    data() {
        return {
            annual_id: getQueryString('annual_id'),
            msgTxt: '',
            isGroup: 1, // 是否是团主（0：否 1：是）
            groupStatus: 0, //拼团状态（0：拼团中 1：拼团成功 2：拼团失败）
            group_id: getQueryString("group_id"), //	拼团ID
            s_user_id: getQueryString("s_user_id"), //发起分享人ID
            goodsInfo: {},
            joinNum: 0,
            lackNum:0,
            userInfo: {},
            groupUserInfo: {},
            countDown: 0, //倒计时时间
            time: {
                d: ["0", "0"], // 日
                h: ["0", "0"], // 小时
                m: ["0", "0"], // 分
                s: ["0", "0"] // 秒
            },
            // 往期中奖晒单
            noticeList: [
                {
                    src: "../assets/images/3.png",
                    text:
                        "[拼团成功]树尾等1人免单返现128元单返现128元单返现128元"
                },
                {
                    src: "../assets/images/3.png",
                    text: "[拼团成功]树尾等2人免单返现128元"
                },
                {
                    src: "../assets/images/3.png",
                    text: "[拼团成功]树尾等3人免单返现128元"
                },
                {
                    src: "../assets/images/3.png",
                    text: "[拼团成功]树尾等4人免单返现128元"
                },

                {
                    src: "../assets/images/3.png",
                    text: "[拼团成功]树尾等4人免单返现128元"
                }
            ]
        };
    },
    created() {
        if(is_weixin() && !getQueryString('session_id')){
            console.log(11)
            // 验证token是否失效
            checkToken({
                loginParams: `/annual_id/${this.annual_id}`,
                success: () => {
                    // this.getData();
                    this.getShareDetail();
                    this.getDanmuList()
                },
                error: obj => {
                    this.msgTxt = obj.errTxt;
                }
            })
        }
    },
    mounted() {},
    methods: {
        // 获取分享详情
        getShareDetail() {
            let self = this;
            const params = {
                group_id: this.group_id,
                s_user_id: this.s_user_id
            };
            this.$http
                .get(
                    "https://result.eolinker.com/m4TL8mB4f7082763233c300406bf48e629fed57808c2771?uri=Free/shareDetail",
                    { params }
                )
                .then(res => {
                    let data = {
                        result: 1,
                        message: "请求成功！",
                        data: {
                            groupId: 1,
                            isGroup: 1,
                            joinNum: 3,
                            countDown: 86584,
                            groupStatus: 0,
                            userInfo: [
                                {
                                    nickname: "测试小号杨",
                                    avatar: "",
                                    userId: "3268982165926232",
                                    username: "173xxxx5626",
                                    isGroup: 0
                                },
                                {
                                    nickname: "闻雨",
                                    avatar:
                                        "http://thirdwx.qlogo.cn/mmopen/vi_32/jQ1B0g76Rh0kbrMuNPBNnavogDNOorRPGLcict1lEUVWrswkEreL7ibt2U9H3WcduCQKB2FNiceCLickaMRQJw1iaTA/132",
                                    userId: "8731765405841096",
                                    username: "",
                                    isGroup: 1
                                },
                                {
                                    nickname: "136xxxx3549",
                                    avatar: "",
                                    userId: "89870677934797767",
                                    username: "136xxxx3549",
                                    isGroup: 0
                                }
                            ],
                            goodsInfo: {
                                goodsId: 112,
                                goodsName: "ceshi",
                                goodsPrice: "22.22",
                                number: 2002,
                                goodsImg:
                                    "http://img.sdjjia.com/fdc/20181010/img/3defbc67f4e66f005350089515a4524b_480_480.jpg"
                            }
                        }
                    };
                    if (data && data.result == 1) {
                        // let data = res.data
                         data = data.data;
                        self.countDown = parseInt(data.countDown);
                        self.goodsInfo = data.goodsInfo;
                        self.isGroup = data.isGroup;
                        self.groupStatus = data.groupStatus;
                        self.userInfo = data.userInfo;
                        self.joinNum = data.joinNum;
                        self.lackNum  = 3 - self.joinNum; 
                        console.log(self.userInfo);
                        self.groupUserInfo = self.userInfo.filter(item => { return item.isGroup == 1;})[0];
                        if (self.countDown > 0) {
                            self._contDown(self.countDown);
                        }

                        // // 初始化分享
                        // new Wechat_api({
                        //     shareJson: {
                        //         title: '3人成团，全员免单，快来一起免单购物！', // 分享标题
                        //         link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        //         imgUrl: this.luckyData.goodsImg, // 分享图标
                        //         desc: "免单特权，机不可失",
                        //     }
                        // })
                    } else {
                        this.msgTxt =
                            data && data.message ? data.message : "网络失败";
                    }
                });
        },
        // 获取面单购物进行中用户
        getDanmuList() {
            let self = this;
            this.$http
                .get(
                    "https://result.eolinker.com/m4TL8mB4f7082763233c300406bf48e629fed57808c2771?uri=Goods/user_stock_info"
                )
                .then(res => {
                    let data = res.data;
                    if (data && data.result == 1) {
                    } else {
                        this.msgTxt =
                            data && data.message ? data.message : "网络失败";
                    }
                });
        },
        _contDown(time) {
            let self = this;
            var time = parseInt(time); // 得到的数据是毫秒
            // var time = parseInt(0); // 得到的数据是毫秒
            if (time > 0) {
                countDown(time, time => {
                    self.time.d = Array.from(String(time.day));
                    self.time.h = Array.from(String(time.hour));
                    self.time.m = Array.from(String(time.minute));
                    self.time.s = Array.from(String(time.second));
                });
            }
        }
    },
    components: {
        scrollNotice,
        msgBox,
        guessLike
    }
};
</script>