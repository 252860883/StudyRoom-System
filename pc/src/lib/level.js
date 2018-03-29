
export function judgeLevel(num) {
    console.log(num);
    if (num == 0) {
        return "自习萌新";
    } else if (num < 5) {
        return "觉醒学渣";
    } else if (num < 10) {
        return "初成之秀";
    } else if (num < 15) {
        return "光辉驻长";
    } else if (num < 25) {
        return "永恒学神";
    } else {
        return "无敌王者";
    }
}