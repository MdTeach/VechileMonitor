let variance
let cnv = initCanvas()
document.body.appendChild(cnv)
let ctx = cnv.getContext("2d")



ctx.font = '50px ariel'
let gridData = getGridData()

let map = new Map(gridData, ctx)
let testArr = []

let vehicle1 = new Vehicle(cnv.width/2, cnv.height/2, cnv.width/50, ctx)

updateState()

let alpha = 0, beta = 0, gamma = 0
let ax = 0, ay = 0
let dqueue = []

let touching = false


function trail(){
    dqueue.push([vehicle1.x-cnv.width, vehicle1.y-cnv.height])
    if(dqueue.length == 41) dqueue.shift()
}

setInterval(()=>{
    vehicle1.az = 0.9*(-90-alpha) + ay/10
    testArr.push([beta, gamma])

    updateState()

    if(touching==true)
        vehicle1.move()
    trail()
    ctx.beginPath()

    if(testArr.length==2)
    {
        if(Math.abs(testArr[1][0]-testArr[0][0])>20 | Math.abs(testArr[1][1]-testArr[0][1])>20)
        {
            ctx.fillStyle = "red";
            map.addCrack(vehicle1.x, vehicle1.y)
        }
        testArr = []
    }
}, 50)

addEventListener("touchstart", ev=>{
    ev.preventDefault()
    touching = true
})
addEventListener("touchend", ev =>{
    ev.preventDefault()
    touching = false
})

cnv.addEventListener("mousedown", () =>{
    cnv.addEventListener("mousemove", onDrag)
    addEventListener("mouseup", onDrop)
})

function updateState() {
    map.drawCracks(ctx)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    map.renderGrid(cnv.width, cnv.height)
    vehicle1.drawMarker()
}