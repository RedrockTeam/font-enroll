function $(ele) {
    const eles = document.querySelectorAll(ele);
    return eles.length === 1 ? eles[0] : eles;
}

const department = ['redrock', 'kelian', 'qingxie', 'shelian', 'tuanwei', 'xueshenghui', 'yishutuan']
const H5url = [
    'https://wx.idsbllp.cn/joinus2017/',
    'http://www.cqupt-sstu.cn/',
    'http://u5084437.viewer.maka.im/pcviewer/FW8FHQK0',
    'http://u5073382.viewer.maka.im/pcviewer/UCLQV5O9',
    'http://u4956478.viewer.maka.im/k/TZIIQ653',
    'https://s.wcd.im/v/2bpk8Z36/',
    'http://u5193531.viewer.maka.im/pcviewer/G5J532W2'
]

const departmentNumber = department.length
let departmentIndex = Math.floor(Math.random()*departmentNumber)
const carousel = $('.carousel')

showDetail(departmentIndex, 'right');

$('.arrow-right').addEventListener('click', e => {
    departmentIndex++
    if (departmentIndex >= departmentNumber) {
        departmentIndex = 0
    }
    showDetail(departmentIndex, 'right')
})
$('.arrow-left').addEventListener('click', e => {
    departmentIndex--
    if (departmentIndex < 0) {
        departmentIndex = departmentNumber-1
    }
    showDetail(departmentIndex, 'left')
})

function showDetail(index = departmentNumber, direction) {
    if (index < 0 || index >= departmentNumber) {
        return
    }

    const bannerImg = $('.carousel-bannerimg');
    const bannerImgCopy = bannerImg.cloneNode(true)

    const frame = $('.carousel-frame');
    const frameCopy = frame.cloneNode(true)
    
    bannerImg.remove()
    frame.remove()

    bannerImgCopy.src = `../imgs/banner_${department[departmentIndex]}.png`
    $('.carousel-banner').insertBefore(bannerImgCopy, $('.arrow-right'))

    frameCopy.className = `carousel-frame asdasd rotate-${direction}`
    console.log(frameCopy)
    frameCopy.firstElementChild.src = `../imgs/pic_${department[departmentIndex]}.png`
    carousel.insertBefore(frameCopy, $('.msg'))

    $('.carousel-frameimg').addEventListener('click', e => {
        location.href = H5url[departmentIndex]
    })
}
