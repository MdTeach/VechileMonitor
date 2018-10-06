let initCanvas = () =>{
    let bh = document.body.clientHeight
    let bw = document.body.clientWidth
    let canvas = document.createElement('canvas')
    canvas.style.position = "absolute"
    canvas.style.top = 0 + "px"
    canvas.style.left = 0 + "px"
    canvas.style.padding = 0 + "px"
    canvas.style.margin = 0 + "px"
    canvas.style.border = 0 + "px"
    canvas.height = (bh < bw) ? bh: bw
    canvas.width = canvas.height
    canvas.style.top = (bh/2 - canvas.width/2) + 'px'
    // canvas.style.left = (bw/2 - canvas.height/2) + 'px'
    canvas.style.left = 0
    return canvas
}

let resizeCanvas = () =>{
    let bh = window.innerHeight
    let bw = window.innerWidth
    // cnv.style.position = 'relative'
    cnv.height = (bh < bw) ? bh: bw
    cnv.width = cnv.height
    cnv.style.top = (bh/2 - cnv.width/2) + 'px'
    cnv.style.left = (bw/2 - cnv.height/2) + 'px'
}