/**
 * getUrlKey 截取地址栏参数
 * 
 */
function tips(name){
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || [, ''])[1].replace(/\+/g, '%20')
    ) || null
  );
}

function eliminateTips(){

}

// 函数防抖的实现


export default {
  tips,
  eliminateTips
}