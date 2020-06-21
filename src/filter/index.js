// 价格截取小数点
export function price_point_no_zero(value) {
    value = String(value);
    if (value.indexOf(".") > -1) {
        let num = value.split(".");
        let arr = num[1].split("");
        let price = null;
        if (arr[1] == 0) {
            price = num[0] + "." + arr[0];
            if (arr[0] == 0) {
                price = num[0];
            }
        } else {
            price = value;
        }
        return price;
    } else {
        return value;
    }
}
// 价格，保留一位小数点
export function price_point_keep_one(value) {
    return parseFloat(value).toFixed(1);
}