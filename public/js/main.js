let cnv = initCanvas()
document.body.appendChild(cnv)
let ctx = cnv.getContext("2d")

let canvas3d = initCanvas3D()
document.body.appendChild(canvas3d)
initThree()

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

let approxSin = (new Array(100)).fill(0).map((i, j) =>{
    return [j/10, Math.exp(j/10)]
})
let approx = regression.exponential(approxSin).equation
console.log(approx)

const coords = (new Array(10)).fill([10, 10]).map(e => e.map(_e => _e*[Math.random()]))
const result = regression.polynomial([[100, 105], [102, 109], [103, 119], [104, 100]], {order: 4})
console.log(coords)
console.log(result.equation)



function trail(){
    dqueue.push([vehicle1.x-cnv.width, vehicle1.y-cnv.height])
    if(dqueue.length == 40) dqueue.shift()
}

/* setInterval(()=>{
    ctx.fillStyle = "yellow"
    dqueue.forEach(el =>{
        ctx.beginPath()
        ctx.arc(el[0], el[1], 5, 0, 2*Math.PI, true)
        ctx.fill()
    })
    let record = regression.polynomial(dqueue, {order: 4}).equation
    console.log(record)
}, 2000)
 */
setInterval(()=>{
    vehicle1.az = 0.9*(-90-alpha) + ay/10
    testArr.push([beta, gamma])

    updateState()

    if(touching==true)
        vehicle1.move()
    trail()
    vehicle1.drawMarker()

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