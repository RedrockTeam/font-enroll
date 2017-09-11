let closeHeight = '1.06666667rem',
    oneRank = 2,
    twoRank = 102,
    phone = window.location.search.split('=')[1],
    department = [],
    beforeOpen,
    nowData = [],
    postInfo = true,
    data = {};
    //console.log(window.getComputedStyle($('.select-sure')[0]).height)
    //data = [[[{id: 1024,name:'web'},{id:111,name:'移动'},{id:2323,name:'视觉'}],[{id:123,name:'香梨'},{id:23,name:'红富士'}]]];
ajax({
    method: 'get',
    url: 'http://hongyan.cqupt.edu.cn/activity/wx/userInfo',
    success: function(res) {
        data = res.data.act_info;
        //console.log(res.data.act_info)
    }
})
$('.content-choose').addEventListener('touchend',(e) => {
    let target = e.target;
    if(target.classList.contains('select-sure') || target.classList.contains('select-icon')) {
        target = target.parentElement.classList.contains('select') ? target : target.parentElement;
        if(beforeOpen != undefined) {
            beforeOpen.style.height = closeHeight;
            console.log(target)
            target.style.backgroundColor = '#fffcf0';
            beforeOpen.classList.remove('add-height');
            if(beforeOpen.getAttribute('rank') === target.parentElement.getAttribute('rank')) {
                target.querySelector('i').classList.remove('icon-xiala-copy');
                target.querySelector('i').classList.add('icon-xiala');
                beforeOpen = undefined;
            } else {
                changeIcon(target.querySelector('i'),beforeOpen.querySelector('i'));
                target.parentElement.style.height = parseFloat(closeHeight) * (target.nextElementSibling.children.length + 1) + 'rem';
                target.style.backgroundColor = '#faf60';
                target.parentElement.classList.add('add-height');
                beforeOpen = target.parentElement;
            }
        } else {
            target.parentElement.style.height = parseFloat(closeHeight) * (target.nextElementSibling.children.length + 1) + 'rem';
            console.log(target.nextElementSibling.children.length + 1)
            target.style.backgroundColor = '#ffbb77';
            target.parentElement.classList.add('add-height');
            target.querySelector('i').classList.remove('icon-xiala');
            target.querySelector('i').classList.add('icon-xiala-copy');
            beforeOpen = target.parentElement;
        }       
    } 
    
    if(target.classList.contains('select-part') && target.parentElement.parentElement.classList.contains('select-one')) {
        beforeOpen.querySelector('em').innerText = target.innerText;
        beforeOpen.classList.remove('add-height');
        beforeOpen.style.height = closeHeight;
        beforeOpen.children[0].style.backgroundColor = '#fffcf0';
        beforeOpen.nextElementSibling.querySelector('em').innerText = '综合';
        beforeOpen.querySelector('i').classList.remove('icon-xiala-copy');
        beforeOpen.querySelector('i').classList.add('icon-xiala');
        nowData =  data[target.innerText];
        beforeOpen.nextElementSibling.children[1].innerHTML = createSelectTwo(nowData);
        beforeOpen = undefined;
    } else if (target.classList.contains('select-part') && target.parentElement.parentElement.classList.contains('select-two')) {
        beforeOpen.querySelector('em').innerText = target.innerText;
        if(target.getAttribute('activity_id') !== null) {
            department.push(parseInt(target.getAttribute('activity_id')));
        }
        console.log(department)
        beforeOpen.classList.remove('add-height');
        beforeOpen.style.height = closeHeight;
        beforeOpen.children[0].style.backgroundColor = '#fffcf0';
        beforeOpen.querySelector('i').classList.remove('icon-xiala-copy');
        beforeOpen.querySelector('i').classList.add('icon-xiala');
        beforeOpen = undefined;
    }

})

function createSelectTwo(data) {
    let ele = '';
    data.forEach(function(element) {
        ele += `<p class="select-part" activity_id="${element.activity_id}">${element.activity_name}</p>`
    }, this);
    return ele;
}

function changeIcon(nowEle,beforeEle) {
    nowEle.classList.remove('icon-xiala');
    nowEle.classList.add('icon-xiala-copy');
    beforeEle.classList.remove('icon-xiala-copy');
    beforeEle.classList.add('icon-xiala');
}
$('.more').addEventListener('touchstart',() => {
    if(oneRank > 8) return;
    let div = document.createElement('div');
    div.setAttribute('class','choose');
    div.innerHTML = `<div class="select select-one" rank="${oneRank}">
                        <div class="select-sure"><em>综合</em><i class="select-icon iconfont icon-xiala"></i></div>
                        <div class="select-more">
                            <p class="select-part">红岩网校工作站</p>
                            <p class="select-part">校学生会</p>
                            <p class="select-part">科技联合会</p>
                            <p class="select-part">校团委各部室</p>
                            <p class="select-part">青年志愿者协会</p>
                            <p class="select-part">社团联合会</p>
                            <p class="select-part">大学生艺术团</p>
                        </div>
                    </div>
                    <div class="select select-two" rank="${twoRank}">
                        <div class="select-sure"><em>综合</em><i class="select-icon iconfont icon-xiala"></i></div>
                        <div class="select-more">
                            <p class="select-part">综合</p>
                        </div>
                    </div> `
    $('.content-choose').appendChild(div);
    oneRank++;
    twoRank++;
})
$('.sure').addEventListener('touchstart',() => {
    if(postInfo) {
        postInfo = false;
        ajax({
            method: 'post',
            url: 'http://hongyan.cqupt.edu.cn/activity/wx/enroll',
            type: 'form',
            data: 'act_key='+ department + '&contact=' + phone,
            success: function(res) {
                window.alert(res.message);
                postInfo = true;
            }
        })
    } else {
        window.alert('你点的太快了');
    }

    // console.log(phone,department);
})