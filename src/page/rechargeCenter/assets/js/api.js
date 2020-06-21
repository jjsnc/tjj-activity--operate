// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiPhpHost = process.env.apiHost_apiPhp;
console.log(apiPhpHost)
let url = {
      // 话费面额列表`
      getRechargeList: `${apiPhpHost}/Wap/recharge/getRechargeList`,
      // 话费充值记录列表
      orderList: `${apiPhpHost}/Wap/recharge/orderList`,
      //创建话费订单
      createOrder: `${apiPhpHost}/Wap/recharge/createOrder`,
      //下单前核查面值是否可以以补贴价格购买
      rechargeCheck: `${apiPhpHost}/Wap/recharge/rechargeCheck`,
}
export default url;

