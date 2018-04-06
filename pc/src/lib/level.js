
export function judgeLevel(num) {
    // console.log(num);
    if (num == 0) {
        return "LV1 自习萌新";
    } else if (num < 5) {
        return "Lv2 觉醒学渣";
    } else if (num < 10) {
        return "LV3 初成之秀";
    } else if (num < 15) {
        return "LV4 光辉驻长";
    } else if (num < 25) {
        return "LV5 永恒学神";
    } else {
        return "LV6 无敌王者";
    }
}