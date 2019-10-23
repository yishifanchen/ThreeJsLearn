
console.log("框架搭建");

var scene;
var camera;
var renderer;
var mesh;

function init() {
    scene = new THREE.Scene();

    ambientLight = new THREE.AmbientLight(0xfff33f, 2.6);
    scene.add(ambientLight);

    camera = new THREE.PerspectiveCamera(60, 1280 / 768, 0.1, 10000);
    camera.position.set(-1, 1, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    let geometry = new THREE.SphereGeometry(1, 13, 13);
    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0xffffff
    }));
    mesh.position.set(0,0,0);

    let geometry1 = new THREE.BoxGeometry(1, 1, 1);
    mesh1 = new THREE.Mesh(geometry1, new THREE.MeshPhongMaterial({
        color: 0xff77ff
    }));
    mesh1.position.set(-2,10,0);

    let meshFloor=new THREE.Mesh(
        new THREE.PlaneGeometry(7,7,7),
        new THREE.MeshBasicMaterial({
            color:0xffffff,
            side:THREE.DoubleSide
        })
    );
    meshFloor.position.set(0, 0, 0);
    meshFloor.rotation.x -= Math.PI / 2;
    scene.add(meshFloor);

    scene.add(camera);
    scene.add(mesh);
    scene.add(mesh1);

    SetTarget(mesh1,camera);

    renderer.setSize(1280,768);
    
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
    animate();
}
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
window.onload = init;