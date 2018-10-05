let gn = new GyroNorm()
let config = {
    frequency: 50,
    gravitynormalized: true,
    orientationbase: gn.game,
    decimalcount: 2,
    logger: null,
    screennadjusted: false
}

gn.init(config).then(() =>{
   gn.start(data =>{
        alpha = data.do.alpha
        beta = data.do.beta
        gamma = data.do.gamma
        ax = data.dm.x
        ay = data.dm.y
   })
}) 