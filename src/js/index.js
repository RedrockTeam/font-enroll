// let serverUrl = '/html/department.html';
let serverUrl = '/activity/wx/department';
// './choose.html'
$('.button').addEventListener('touchstart',() => {
    if($('.input-content').value.length !== 11) {
        window.alert('请输入正确的手机号')
    } else {
        window.location.href = serverUrl + '?phone='+$('.input-content').value;
    }
})