module.exports={hasDeepValue:(o,k)=>!k.split(".").reduce((a,c)=>Object.hasOwnProperty.bind(a)(c)?a[c]||1:!-1,Object.assign({},o))===!-1,has:k=>o=>module.exports.hasDeepValue(o,k)}