<style lang="scss" scoped>
    .singleBtnAlert{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        -webkit-transition: opacity .2s;
        transition: opacity .2s;
        opacity: 0;
        visibility: hidden;
        &.alert-show{
            opacity: 1;
            visibility: visible;
            .alertCont{
                -webkit-transform: translate(-50%, -50%) scale(1, 1);
                transform: translate(-50%, -50%) scale(1, 1);
            }
        }
        .alertCont{
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 0.3rem 0.04rem 0;
            -webkit-transform: translate(-50%, -50%) scale(0, 0);
            transform: translate(-50%, -50%) scale(0, 0);
            transform-origin: center center;
            -webkit-transition: transform .2s;
            transition: transform .2s;
            width: 3.1rem;
            background-color: #fff;
            border-radius: 0.1rem;
            font-size: 0.16rem;
            .alertTxt{
                width: 100%;
                padding: 0 0.2rem;
                margin-bottom: 0.3rem;
                line-height: 0.22rem;
                color: #333;
                text-align: center;
                font-weight: 400;
                &.noTitle{
                    margin: 0.31rem auto;
                }
            }
            .btns-box{
                width: 100%;
                height: 0.44rem;
                font-weight:500;
                text-align: center;
                display: flex;
                align-items: center;
                border-top: 0.01rem solid #E1E1E1;
                color: #333;
                .alertBtns{
                    flex: 1;
                    height: 0.32rem;
                    line-height: 0.32rem;
                    border-right: 0.01rem solid #E1E1E1;
                    &:last-child{
                        border-right: none;
                    }
                }
            }
        }
    }
</style>

<template>
    <div :class="['singleBtnAlert', pShow ? 'alert-show' : '']">
        <div class="alertCont">
            <div :class="['alertTxt']"  v-html="alertObj.message">
            </div>
            <div class="btns-box">
                <div class="alertBtns" v-for="(btn, index) in alertObj.btns" :key="index" @click.stop="cancel(),btn.callBack ? btn.callBack() : ''" :style="btn.fontColor ? `color:${btn.fontColor}` : ''">
                    {{btn.title && btn.title ? btn.title : '确定'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {_disScroll} from "@/assets/js/common/utils.js";
    export default{
        name: 'singleBtnAlert',
        data(){
            return {
                pShow: false
            }
        },
        props: {
            /* 
            btns [{
                title: '确定',
                fontColor: '#333',
                callBack: Function
            }]
             */
            alertObj: {
                type: Object,
                default: () => {
                    return {
                        show: false,
                        message: '',
                        btns: []
                    }
                }
            }
        },
        watch: {
            alertObj(){
                console.log(this.alertObj)
                _disScroll(this.alertObj.show);
                if(!this.alertObj.show){
                    this.pShow = this.alertObj.show;
                }
                this.$forceUpdate();
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.pShow = this.alertObj.show;
                    },0)
                })
            }
        },
        created(){
            // console.log(this.alertObj)
        },
        methods: {
            initPtm(){
                let _obj = Object.assign({}, this.alertObj);
                _obj.show = false;
                this.$parent.alertObj = _obj;
            },
            cancel(){
                console.log(55555)
                this.initPtm();
            }
        }
    }
</script>