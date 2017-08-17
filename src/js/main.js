function $(ele) {
    if(document.querySelectorAll(ele).length === 1) {
        return document.querySelector(ele);
    } else {
        return document.querySelectorAll(ele);
    }
}

function ajax(conf) {
    var method = conf.method;
    var url = conf.url;
    var success = conf.success;
    var type = conf.type;
    var data = conf.data;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (method == 'GET' || method == 'get') {
        xhr.send(null);
    } else if (method == 'POST' || method == 'post') {
        if(type === 'json' || type === 'JSON') {
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else if (type === 'form' || type === 'FORM') {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            success(JSON.parse(xhr.responseText));
        }
    };
    
};
