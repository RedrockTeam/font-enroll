'use strict';

var serverUrl = '/html/department.html';
// let serverUrl = '/activity/wx/choose';
// './choose.html'
$('.button').addEventListener('touchstart', function () {
    if ($('.input-content').value.length !== 11) {
        window.alert('请输入正确的手机号');
    } else {
        window.location.href = serverUrl + '?phone=' + $('.input-content').value;
    }
});