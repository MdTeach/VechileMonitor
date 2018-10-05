let Vehicle = function(x, y, rad, ctx)
{
    // this.refAngle = 0
    this.ctx = ctx
    this.x = x
    this.y = y
    this.v = 5
    this.az = 0

    // this.angle = 0
    this.rad = rad
    this.move = () =>{
 /*this.vAbs = Math.sqrt(this.vx*this.vx + this.vy*this.vy)
        this.x += this.vAbs*Math.cos(Math.PI*this.az/180)/5
        this.y -= this.vAbs*Math.sin(Math.PI*this.az/180)/5*/
        this.x += this.v*Math.sin(Math.PI*this.az/180)
        this.y -= this.v*Math.cos(Math.PI*this.az/180)
        if(this.x<50)
            this.x = 50
        else if (this.x>cnv.width-50)
            this.y = cnv.width-50
        if(this.y<cnv.width/2-cnv.width/5)
            this.y = cnv.width/2-cnv.width/5
        else if (this.y>cnv.width/2+cnv.width/5)
            this.y = cnv.width/2+cnv.height/5
    }
    this.drawMarker = () =>{
        //core marker
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.rad, Math.PI*2, false)
        this.ctx.fillStyle = 'red'
        this.ctx.closePath()
        this.ctx.fill()

        this.drawTriangle(this.generateArray())
 
        //halo marker
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.rad*2, Math.PI*2, false)
        this.ctx.fillStyle = "rgba(.5, .5, .5, .35)"
        this.ctx.closePath()
        this.ctx.fill()
    }
    this.scale = (cnv) =>{
        this.rad = cnv.width/50
        this.drawMarker()
    }
    this.drawTriangle = function(shape){
        let lastPoint = shape.length - 1
        this.ctx.beginPath()
        this.ctx.moveTo(
            shape[lastPoint][0],
            shape[lastPoint][1]
        )
        shape.forEach( point =>{
            this.ctx.lineTo(point[0], point[1])
        })
        this.ctx.fill()
    }
    this.generateArray = function(){
        const PI = Math.PI
        let a = this.az
        let x = this.x, y = this.y
        let r = this.rad
        return[
            [x+r*Math.cos(PI*a/180), y+r*Math.sin(PI*a/180)],
            [x-r*Math.cos(PI*a/180), y-r*Math.sin(PI*a/180)],
            [x+2*r*Math.sin(PI*a/180), y-2*r*Math.cos(PI*a/180)]
        ]
    }
}