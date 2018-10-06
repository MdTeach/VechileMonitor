let variance
let cnv = initCanvas()
document.body.appendChild(cnv)
let ctx = cnv.getContext("2d")

let stateCount = 0

let canvas3d = initCanvas3D()
document.body.appendChild(canvas3d)
initThree()

let graph = initGraph()
document.body.appendChild(graph)
let ctx_ = graph.getContext("2d")
ctx_.fillStyle = "#555"
ctx_.fillRect(0, 0, graph.width, graph.height)
ctx_.strokeStyle = "black"
ctx_.strokWidth = 4
function renderGraph(){
    let w = graph.width
    let h = graph.height

    for(let i = 0; i<20; i++){
        for(let j=0; j<20; j++){
            ctx_.strokeRect(i*w/20, j*h/20, w/20, h/20)
        }
    }
    ctx_.beginPath()
    ctx_.moveTo(w/2, 0)
    ctx_.lineTo(w/2, h/2)
    ctx.stroke( )
    requestAnimationFrame(renderGraph)
}
renderGraph()

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

const coords = (new Array(10)).fill([10, 10]).map(e => e.map(_e => _e*[Math.random()]))
const result = regression.polynomial([[100, 105], [102, 109], [103, 119], [104, 100]], {order: 4})
console.log(coords)
console.log(result.equation)

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

function onDrop(){
    let tangent = []
    let diff = []
    for(i=0; i<dqueue.length-1; i++){
        let [x1, y1] = dqueue[i]
        let [x2, y2] = dqueue[i+1]
        let slope = (y2-y1)/(x2-x1)
        if(y2-y1!=0&x2-x1!=0){
            tangent.push(Math.atan(slope))
            diff.push(Math.abs(y2-y1))
        }
    }
    if(tangent.length){
        let mean = tangent.reduce((a, x)=> a+x) / tangent.length
        console.log(mean)
        console.log(tangent)
        let raw = tangent.map(el => Math.pow(el-mean, 2))
        console.log(raw)
        variance = Math.sqrt(raw.reduce((a, x)=> a+x)/raw.length)
        console.log("Variance:", variance)
    }
    cnv.removeEventListener("mousemove", onDrag)
    removeEventListener("mouseup", onDrop)
}

function onDrag(evt){
    vehicle1.x = evt.clientX
    vehicle1.y = evt.clientY
}

function updateState() {
    map.drawCracks(ctx)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    map.renderGrid(cnv.width, cnv.height)
    vehicle1.drawMarker()
}