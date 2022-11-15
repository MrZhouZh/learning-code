Function.prototype.after = function(fn) {
    const self = this
    return function() {
        let ret = self.apply(this, arguments)
        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments)
        }

        return ret
    }
}

const append = function(container, text) {
    if (typeof text === 'object') {
        container.appendChild(text)
        return
    }

    let box = document.createElement('div'),
        frag = document.createDocumentFragment()
    box.innerHTML = text
    while(box.firstElementChild) {
        frag.appendChild(box.firstElementChild)
    }
    container.appendChild(frag)
}

const appendToBody = function(tpl) {
    const element = document.createRange().createContextualFragment(tpl)
    document.querySelector('body').appendChild(element)
}

const supportFlash = function() {
    let swf
    if (window && typeof window.ActiveXObject !== 'undefined') {
        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
    } else {
        swf = navigator.plugins['Shockwave Flash']
    }
    return swf ? true : false
}

const getActiveUploadObj = function() {
    try {
        return new ActiveXObject('TXFTNActiveX.FTNUpload'); // IE 上传控件
    } catch (error) {
        return 'nextSuccessor'
    }
    
}

const getFlashUploadObj = function() {
    if (supportFlash()) {
        const str = `<object type="application/x-shockwave-flash"></object>`
        return append(document.querySelector('body'), str)
        // return appendToBody(str)
    }
    return 'nextSuccessor'/
}

const getFormUploadObj = function() {
    return appendToBody(document.querySelector('body'), `<form><input name="file" type="file" /></form>`)
}

const getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj)

console.log(getUploadObj());
