import { pinyin,interceptStr } from "./getPinyin";

//构造通讯录结构数据
function creatBookMenuData(data) {
    let initBookMenuData = {
        "A": [],"B": [],"C": [],"D": [],"E": [],"F": [],"G": [],"H": [],"I": [],"J": [],"K": [],
        "L": [],"M": [],"N": [],"O": [],"P": [],"Q": [],"R": [],"S": [],"T": [],"U": [],"V": [],
        "W": [],"X": [],"Y": [],"Z": []
    }
    data.forEach((item)=>{
        //截取首个中文字符
        let firstN = interceptStr(item.name) || '阿'
        //添加中文字符转拼音首字母的属性
        item.initials = pinyin.getCamelChars(firstN)
    })
    for(let keys in initBookMenuData){
        for(let item of data){
            if(item.initials == keys){
                initBookMenuData[keys].push(item)
            }
        }
    }
    return initBookMenuData
}

export { creatBookMenuData }