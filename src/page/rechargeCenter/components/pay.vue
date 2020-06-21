


<style lang="scss" scoped>
 .pay_box{
     position: fixed;
     width: 100%;
     height: 100%;
     z-index: 9999;
     top: 0rem;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
    opacity: 0;
    
       visibility: hidden;
     background-color: rgba(0,0,0,.5);
     &.pay_show{
        opacity: 1;
        visibility: visible;
        }  
     .pay_way{
         width: 3.1rem;
         height: 1.76rem;
         background: #fff;
         margin: 1.53rem auto 0;
         border-radius: 0.1rem;
         padding: 0.24rem 0.2rem 0 0.2rem;
         .pay_title{
             font-size: 0.18rem;
             color: #333;
             font-weight: 600;
             text-align: center;
         }
         .pay_list>div {
                width: 100%;
                height: 0.52rem;
                border-bottom: 0.008rem solid #e5e5e5;
                font-size: 0.15rem;
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 0.52rem;
                position: relative;
                }
                .pay li:nth-of-type(1) {
                border-top: 0rem solid #e5e5e5;
                }
                .pay .icon {
                top: 0;
                position: absolute;
                bottom: 0;
                left: 0;
                margin: auto;
                }
                .ali {
                width: 0.2rem;
                height: 0.2rem;
                margin-right: 0.12rem;
                }
                .wx {
                width: 0.22rem;
                height: 0.2rem;
                margin-right: 0.11rem;
                }
            .pay_list>div:nth-last-of-type(1){
                border-bottom: 0rem solid #e5e5e5;
            }    
     }
     
 }
 
</style>

<template>
<div class="pay_box "  :class="[ state ? 'pay_show' : '']" >
    <div class="pay_way" >
        <div class="pay_title">选择支付方式</div>
        <div class="pay_list">
            <div @click="choose_pay(1)" >
                 <img  class="wx icon"  src="./../assets/images/ali1.png" />支付宝
           </div>
            <div  @click="choose_pay(3)">
                 <img class="wx icon" src="./../assets/images/wx1.png" />微信支付
           </div>
        </div>
    </div>    
</div>
</template>

<script>
/**    */
    //import {_disScroll} from "@/assets/js/common/utils.js";
    export default{
        name: 'pay',
        props: ['pay_show']
        ,
        data(){
            return {
                state:false
            }
        },
        created(){
            this.state = this.pay_show
            
        },
       watch: {
            pay_show(newVal, oldVal) {
                if(newVal){
                     this.state = this.pay_show    
                }
                console.log(newVal);
           }
        },
         methods: {
            choose_pay(val){
               if(this.state){
                    this.state=false;
                    this.$parent.pay_states=false;
                    this.$emit('pay',val)
               }
              
            }
         
        }
   
    }
</script>