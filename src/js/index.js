$('.button').addEventListener('touchstart',() => {
    if($('.input-content').value.length !== 11) {
        window.alert('请输入正确的手机号')
    } else {
        window.location.href = './choose.html?phone='+$('.input-content').value;
    }
})