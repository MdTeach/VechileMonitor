function Map(gridData, ctx)
{
    this.gridData = gridData
    this.ctx = ctx
    this.cracks = []
    this.road = new Image()
    this.road.src = "assets/road.JPG"
    
    this.sidewalk = new Image()
    this.sidewalk.src = "assets/sidewalk.JPG"

    this.draw = (width, height) =>
    {
        let w = width, h = height
        
        this.ctx.fillStyle = '#222'
        this.ctx.fillRect(0, (h/2 -h/25 - h/5), w, 2*h/25 + 2*h/5)

        this.ctx.fillStyle = '#444'
        this.ctx.fillRect(0, (h/2 - h/5), w, 2*h/5)
    }
    this.renderGrid = function(width, height)
    {
        let w = width/20
        let h = height/20
        
        this.strokeWidth = 1
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        this.ctx.strokeStyle = "blue"//'#555'

        ctx.drawImage(this.road, cnv.width/2-cnv.width/3, 0, cnv.width*2/3, cnv.height/2)
        ctx.drawImage(this.road, cnv.width/2-cnv.width/3, cnv.height/2, cnv.width*2/3, cnv.height/2)

        for(i=0; i<5; i++){
            ctx.drawImage(this.sidewalk, 0, i*cnv.height/5, cnv.width/6, cnv.height/5)
            ctx.drawImage(this.sidewalk, cnv.width - cnv.width/6, i*cnv.height/5, cnv.width/6, cnv.height/5)
        }

        for(let i = 0; i<20; i++){
            for(let j=0; j<20; j++){
                this.ctx.strokeRect(i*w, j*h, w, h)
                this.ctx.fillRect(i*w, j*h, w, h)
            }
        }
        this.ctx.fillStyle = 'white'
        if(this.cracks.length){
            let coord = this.cracks[this.cracks.length-1]
            coord = coord.map(e => Math.floor(e))
            this.ctx.fillText(`Crack last detected at (${coord[0]}, ${coord[1]})`, cnv.width/6, cnv.height/10)
        }
    }
    this.drawCracks = () =>{
            this.ctx.fillStyle = 'red'
            this.ctx.save()
            if(this.cracks.length){
                this.cracks.forEach(el =>{
                this.ctx.beginPath()
                this.ctx.arc(el[0], el[1], 25, 2*Math.PI, false)
                this.ctx.fill()
            })
        }
    }
    this.addCrack = (x, y) =>{
        this.cracks.push([x, y])
    }
}
function getGridData(){
    let gridData = new Array(50, 50)
    gridData.fill(0)
    for(let i=0; i<50; i++){
        for(let j=0; j<50; j++){
            gridData[i, j] = [i, j]
        }
    }
    return gridData
}
//merobato@gmail.com