// var socket = io.connect('http://localhost:80');
var socket = io.connect('http://192.168.1.109:80');

let gn = new GyroNorm()
let config = {
    frequency: 20,
    gravitynormalized: true,
    orientationbase: gn.game,
    decimalcount: 2,
    logger: null,
    screennadjusted: false
}

gn.init(config).then(() =>{
   gn.start(data =>{
        socket.emit("data",data ={
            alpha:data.do.alpha,
            beta:data.do.beta,
            gamma:data.do.gamma,
            ax:data.dm.x,
            ay:data.dm.y,
            touch: touching
        });

        // socket.on("server_data", (data)=>{
        //     alpha = data.alpha;
        //     beta = data.beta;
        //     gamma = data.gamma;
        //     ax = data.ax;
        //     ay = data.ay;
        //     az = data.az;
        //     touching = data.touch;
        //     //console.log(data);
        // });
   })
}) 
