let initCanvas = () =>{
    let bh = document.body.clientHeight
    let bw = document.body.clientWidth
    let canvas = document.createElement('canvas')
    canvas.style.position = 'relative'
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
    canvas.style.position = 'relative'  
    canvas.style.left = 0 + "px"
    canvas.style.top = 0 + "px"
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

    let loader = new THREE.CubeTextureLoader();
    loader.setPath( '/pisa/' );

    let textureCube = loader.load( [
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
    ] );

    let material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, wireframe: true } );

    let geometry = new THREE.BoxGeometry( 2, .125, 1 );
    let cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    let animate = () => {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    animate()
}