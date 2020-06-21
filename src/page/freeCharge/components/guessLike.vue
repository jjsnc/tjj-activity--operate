<style lang="scss" scoped>
.guess-page {
    width: 354px;
    background: #fff;
    border-radius: 6px;
    margin: 0 auto;
    padding: 0 8px 0;
    .title-3 {
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        color: #ff6632;
        text-align: center;
        align-items: center;
        .text {
            padding: 0 6px;
        }
        &::before {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/left@2x.png");
            background-size: 87px 12px;
        }
        &::after {
            content: "";
            display: inline-block;
            width: 87px;
            height: 12px;
            background: url("../assets/images/right@2x.png");
            background-size: 87px 12px;
            background-repeat: no-repeat;
            vertical-align: middle;
        }
    }
    .list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item {
            background: #fff;
            width: 165px;
            margin-bottom: 15px;
            height: 246px;

            .my-img {
                width: 165px;
                height: 165px;
            }
            .info {
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 16px;
                padding: 10px 0 10px;
            }
            .bottom-area {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                height: 62px;
                font-size: 0;
                .icon {
                    color: #ee0000;
                    font-size: 12px;
                    transform: scale(0.85);
                }
                .price {
                    font-size: 16px;
                    color: #ee0000;
                    letter-spacing: 0;
                }
                .submit-btn {
                    display: block;
                    width: 62px;
                    height: 26px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 13px;
                    color: #ffffff;
                    background-image: linear-gradient(
                        -270deg,
                        #f53917 0%,
                        #ff8232 100% x
                    );
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="guess-page">
        <h3 class="title-3">猜你喜欢</h3>
        <ul class="list">
            <li class="item">
                <img class="my-img" src="../assets/images/5.png">
                <p class="info">青年韩版修身短袖衬衫男休闲白衬衣</p>
                <div class="bottom-area">
                    <div>
                        <span class="icon">￥</span>
                        <span class="price">9.9</span>
                    </div>
                    <div>
                        <a href="javascript:;" class="btn submit-btn" @click="startShopping">立即购买</a>
                    </div>
                </div>
            </li>
            <li class="item">
                <img class="my-img" src="../assets/images/5.png">
                <p class="info">青年韩版修身短袖衬衫男休闲白衬衣</p>
                <div class="bottom-area">
                    <div>
                        <span class="icon">￥</span>
                        <span class="price">9.9</span>
                    </div>
                    <div>
                        <a href="javascript:;" class="btn submit-btn" @click="startShopping">立即购买</a>
                    </div>
                </div>
            </li>
            <li class="item">
                <img class="my-img" src="../assets/images/5.png">
                <p class="info">青年韩版修身短袖衬衫男休闲白衬衣</p>
                <div class="bottom-area">
                    <div>
                        <span class="icon">￥</span>
                        <span class="price">9.9</span>
                    </div>
                    <div>
                        <a href="javascript:;" class="btn submit-btn" @click="startShopping">立即购买</a>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 这里时信息提示区域 -->
        <msgBox :msgTxt="msgTxt"></msgBox>
        <!--  下载 -->
        <downLoad :downloadPopShow="downloadPopShow"></downLoad>
    </div>
</template>

<script>
import msgBox from "@/components/msgBox";
import { jump2goods, getEnvironment } from "@/assets/js/common/utils.js";
import downLoad from "../components/downLoad";
import { freeGoodsList, GoodsGoods_list } from "./../assets/js/api.js";
export default {
    data() {
        return {
            msgTxt: "",
            platForm: getEnvironment(), //平台判断 1、app 2、小程序 0、h5
            downloadPopShow: false
        };
    },
    created() {

    },
    methods: {
        // 获取猜你喜欢
        getFreeGoodsList() {
            let self = this;

            this.$http
                .get(
                    "https://result.eolinker.com/m4TL8mB4f7082763233c300406bf48e629fed57808c2771?uri=Goods/goods_list",
                    { params }
                )
                .then(res => {
                    let data = res.data;
                    console.log(typeof data);
                    if (data && data.result == 1) {
                    } else {
                        this.msgTxt =
                            data && data.message ? data.message : "网络失败";
                    }
                });
        },
        // 免单好货推荐
        getGoodGoodsList() {
            let self = this;
            this.$http
                .get(
                    "https://result.eolinker.com/m4TL8mB4f7082763233c300406bf48e629fed57808c2771?uri=Goods/goods_list",
                    { params }
                )
                .then(res => {
                    let data = res.data;
                    console.log(typeof data);
                    if (data && data.result == 1) {
                    } else {
                        this.msgTxt =
                            data && data.message ? data.message : "网络失败";
                    }
                });
        },
        startShopping() {
            if (this.platForm == 1) {
                this.toShopInfo(id);
            } else {
                this.downloadPopShow = true;
            }
        },
        //进入商品详情（APP）
        toShopInfo(id) {
            jump2goods(id);
        }
    },
    components: {
        msgBox,
        downLoad
    }
};
</script>