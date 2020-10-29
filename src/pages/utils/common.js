//对象、一维数组去重(返回一个新数组)
export const singleArr = (arr, val) => {
    let newArr = arr.concat()
   let len = newArr.length;
    if (val){
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (newArr[i][val] == newArr[j][val]) {
                    newArr.splice(j, 1);
                    len--;
                    j--;
                }
            }
        }
    } else {
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (newArr[i] == newArr[j]) {
                    newArr.splice(j, 1);
                    len--;
                    j--;
                }
            }
        }
    }

    return newArr;
}

//判断对象values是否为空 并返回不为空对象
export const isEmptyParams = (obj) => {
    let obje = {}
    Object.assign(obje, obj)
    for ( let key in obje ){
        if ( obje[key] === '' || typeof obje[key] === 'undefined'){
            delete obje[key]
        }
    }
    return obje
}

//数组转为树形结构
  // toTree(数组，父id,父id属性key, id当前节点id key)
export const toTree = (list,parId,pId,id) => {
    let len = list.length
    function loop(parId){
        let res = [];
        for(let i = 0; i < len; i++){
            let item = list[i]
            if(item[pId] == parId){
                item.children = loop(item[id])
                res.push(item)
            }
        }
        return res
    }
    return loop(parId)
}

//树形数据转数组
 export const treeToArray = (source) => {
     let res = []
     const fn = (source)=>{
         source.forEach(el=>{
             res.push(el)
             el.children && el.children.length>0 ? fn(el.children) : ""
         })
     }
     return res
 }

 //删除树状结构数据中空children
export const removeEmptyChildren  = (data) => {
    data.forEach(item => {
        if (item.children === null || item.children.length === 0) {
            delete item.children
        }  else {
            removeEmptyChildren(item.children)
        }
    })
    return data
}
/**
 * 非空判断 已挂载到原型上$isNot
 * 解决Vue Template模板中无法使用可选链的问题
 * eg:
 * let ces = {
                    data: {
                        data1: {
                            name: '测试'
                        }
                    }
                }
 let b = this.$isNot(ces, 'data', 'data1', 'name') //测试
 {{$isNot(ces, 'data', 'data1', 'name')}} //测试
 */
export const optionalChaining = (obj, ...rest) => {
    let tmp = obj;
    for (let key in rest) {
        let name = rest[key];
        tmp = tmp?.[name]; //es11可选链
    }
    return tmp ?? "未知";
};

// 防抖(当前事件只调用最后一次)
export  function debounce(fn, time) {
    var _arguments = arguments
    var timeout = null
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.call(this, _arguments)
        }, time);
    }
}
//调用示例
/*methods: {
    debounceInput(E){
        debounce(() => {
            console.log(E.target.value)
        }, 1000)
    }
}*/

// 节流（当前事件在规定时间内只调一次）
export function throttle(fn, time) {
    var _arguments = arguments
    var canRun = true
    return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.call(this, _arguments)
            canRun = true
        }, time);
    }
}
