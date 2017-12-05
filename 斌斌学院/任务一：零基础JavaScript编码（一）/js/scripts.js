(function() {
  /*    
  在注释下方写下代码
  给按钮button绑定一个点击事件
  在事件处理函数中
  获取aqi-input输入的值，并显示在aqi-display中
  */
  var log = console.log.bind(console)

  var btn = document.querySelector("#button")

  btn.addEventListener("click", function(event) {
        var input = document.querySelector("#aqi-input")
        var span = document.querySelector("#aqi-display")
        span.innerHTML = input.value
  })

})();


















