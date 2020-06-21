<style lang="scss" scoped>
    .detail-list-box{
        padding: 0.1rem;
        .detail-item{
            padding: 0.15rem;
            margin-bottom: 0.1rem;
            background:rgba(255,255,255,1);
            border-radius:0.1rem;
            line-height:0.2rem;
            .item-title, .item-state{
                display: flex;
                justify-content: space-between;
            }
            .item-title{
                // overflow: hidden;
                margin-bottom: 0.08rem;
                font-size:0.16rem;
                font-weight:500;
                color:#444;
                .pay-price{
                    font-weight: 600;
                }
                .fail-price{
                    color: #FF620C;
                }
                .orderName{
                    font-weight: bolder;
                }
                .num{
                    font-weight: bolder;
                }
            }
            .item-txt{
                // overflow: hidden;
                max-width: 2.5rem;
                margin-bottom: 0.02rem;
                font-size:0.13rem;
                font-weight:400;
                color: #666;
                &::after{
                    content: '';
                    display: inline-block;
                    width: 0.11rem;
                    height: 0.11rem;
                    margin-left: 0.03rem;
                    transform: translateY(0.014rem);
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAALVBMVEVHcExmZmZmZmZmZmZoaGhlZWVmZmZmZmZmZmZmZmZmZmZnZ2doaGhmZmZqamqpmFN6AAAAD3RSTlMA8jx4FWCXrMvB2scl4h1AuYc2AAAAoElEQVQY02NgYGBwrRJcHsIABsySRmeUJxqAmHzdCkCSaccDIPk2ASzLdg9ItEFUMmQAVW9gYGBNC2Bg4DZgcASqnpgm4cDAJMIQCRQWYjgINGYqQzGQncDABTTAnGERWKMiUIMWgwyIySQOJA5C2A8LwGywGlsQoQXSy8BQDiLMQWZCwVSwXWBxoF0gNzCEMoDdgOw2FDcj+wXZjwi/AwCBMSL/bTNb1AAAAABJRU5ErkJggg==) center center;
                    background-size: cover;
                }
            }
            .item-state{
                // overflow: hidden;
                padding-top: 0.02rem;
                font-size:0.13rem;
                font-weight:400;
                color:#999;
                .state-txt{
                    color: #666;
                }
            }
        }
    }
    .empty{
        width: 100%;
        height: 100%;
        padding-top: 0.3rem;
        background-color: #fff;
        img{
            display: block;
            width: 2.27rem;
            height: 2.27rem;
            margin: 0 auto 0.3rem;
        }
        p{
            font-size:0.18rem;
            font-weight:bold;
            color:#757575;
            line-height: 0.18rem;
            text-align: center;
        }
       
    }
</style>

<template>
    <div class="detail-list">
        <div class="empty" v-if="emptyData">
            <img src="./../../assets/images/quesheng1@2x.png" alt="">
            <p>暂无记录，快去充值一笔吧~</p>
        </div>
        <pullUpBox class="detail-list-box" :data="listData" @loadMore="getList" :noData="noData" v-else>
            <div class="detail-item" v-for="(item,index) in listData" :key="index">
                <p class="item-title">
                    <span class="orderName" >{{item.orderName}}</span>
                    <span class="num" :class="['pay-price' , item.status > 2 ? 'fail-price' : '']">{{item.amountTxt}}</span>
                </p>
                <p v-if="item.status > 2" class="item-txt" @click.self="failDetail(item.failMsg)">{{item.desc}}</p>
                <p class="item-state">
                    <span>{{item.date  | de}}</span>
                    <span class="state-txt">{{item.statusTxt}}</span>
                </p>
            </div>
        </pullUpBox>
        <myAlert :alertObj="alertObj"></myAlert>
        <msgBox :msgTxt="msgTxt"></msgBox>
    </div>
</template>

<script>
import pullUpBox from './../../components/pullUpBox'
import myAlert from '@/components/myAlert'
import listData from './list'
import {getEnvironment} from '@/assets/js/common/utils.js'
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
    name: 'detailList',
    components: {
        myAlert,
        pullUpBox
    },
    data(){
        return {
            alertObj: {},
            listData: [],
            page: 1,
            noData: false,
            msgTxt: '',
            emptyData: false,
            user_id: '',
            token: '',
            uuid: '',
        }
    },
    created(){
        this.user_id = this.getQueryString('user_id');
        this.token = this.getQueryString('token');
        this.uuid = this.getQueryString('uuid');
        if(!this.uuid){
            this.$.errorLogUpload(3, 21, {}, '', location.href, {}, 'get', '链接缺少uuid', 200);
            return;
        }
        if(!this.user_id || !this.token){
            console.log('wechat', this.uuid == 'wechat')
            this.uuid == 'wechat' ? this.$wx.jump2login() : this.$.login();
        }else{
            this.getList();
        }
    },
    filters:{
        de:function(data){
                    let time = new Date(data*1000);
                    let mon =(time.getMonth()+1)>9?time.getMonth()+1:"0"+(time.getMonth()+1);
                    let day =(time.getDate())>9?time.getDate():"0"+(time.getDate());
                    let hour =(time.getHours())>9?time.getHours():"0"+(time.getHours());
                    let min =(time.getMinutes())>9?time.getMinutes():"0"+(time.getMinutes());
                    let sec =(time.getSeconds())>9?time.getSeconds():"0"+(time.getSeconds());
                    let date = mon+'-'+day+" "+hour+":"+min+":"+sec
                    return date
        }
    },
    methods: {
        getList(){
            if(this.page < 1) return;
            let params = {
                user_id: this.user_id,
                token: this.token,
                os: this.getQueryString('os'),
                uuid: this.getQueryString('uuid'),
                page: this.page,
            }
            this.$http.get(this.$api.orderList,{params}).then(data => {
                let res = data.data;
                console.log(data)
                if(res && res.result == 1){
                    let _list = res.data;
                    // // 测试数据
                    // _list = listData.data;
                    // 返回字段类型错误并上报
                    if(Array.isArray && !Array.isArray(_list)){
                        this.$.errorLogUpload(3, 21, params, '', data.request.responseURL, res, 'get', 'data.data返回字段格式不是数组', data.status);
                        return;
                    }
                    // 无充值记录
                    if(_list.length < 1 && this.page == 1){
                        this.emptyData = true;
                    }else{
                        // 正常数据处理展示 有充值记录
                        _list = _list.map(item => {
                            item.amountTxt = `${item.status > 2 ? '+' : '-'}${item.amount}`;
                            item.statusTxt = item.status == 1 ? '充值中' : item.status == 2 ? '充值成功' : '充值失败';
                            return item
                        })
                        this.listData = this.listData.concat(_list);
                        this.page = res.nextPage;
                        this.noData = res.nextPage < 1;
                    }
                }else{
                    this.msgTxt = (res && res.message) || "请求错误"
                    this.$.errorLogUpload(3, 21, params, '', data.request.responseURL, res, 'get', (res && res.message) || "请求错误(接口无返回message)", data.status);
                }
            })
            // if(listData.result == 1){
            //     listData.data = listData.data.map(item => {
            //         item.amountTxt = `${item.status > 2 ? '+' : '-'}${item.amount}`;
            //         item.statusTxt = item.status == 1 ? '充值中' : item.status == 2 ? '充值完成' : '充值失败';
            //         return item
            //     })
            //     this.listData = this.listData.concat(listData.data);
            //     this.page = listData.nextPage;
            //     this.noData = listData.nextPage < 1;
            // }else{
                
            // }
        },
        failDetail(txt){
            console.log(123)
            this.alertObj = {
                show: true,
                message: txt,
                btns: [{
                    title: '确定',
                }],
            }
        }
    }
}
</script>