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
let initCanvas3D = () =>{
    let bh = document.body.clientHeight
    let bw = document.body.clientWidth
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'  
    canvas.style.left = cnv.width + "px"
    canvas.style.top = 0 + "px"
    canvas.width =  bh/2
    canvas.height = bh/2
    return canvas
}

let initGraph = () =>{
    let bh = document.body.clientHeight
    let bw = document.body.clientWidth
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'  
    canvas.style.left = cnv.width + "px"
    canvas.style.top = bh/2 + "px"
    canvas.width =  bh/2
    canvas.height = bh/2
    return canvas
}

initThree = () =>{
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

    let renderer = new THREE.WebGLRenderer({canvas: canvas3d});
/*     renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement ); */

/*     let light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 0, 1, 0 ); 		
    light.castShadow = true;            
    scene.add( light ); */

    var geometry = new THREE.BoxGeometry( 1, .5, 3 );
    var material = new THREE.MeshBasicMaterial( { color: 0x666666 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;
    cube.rotation.x = Math.PI/2

    let animate = () => {
        requestAnimationFrame( animate );
        cube.rotation.z += .1
        renderer.render(scene, camera);
    };

    animate()
}