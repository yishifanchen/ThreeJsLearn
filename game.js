
console.log("框架搭建");

var scene;
var camera;
var renderer;
var mesh;
var pointLight;

function init() {
    scene = new THREE.Scene();

    ambientLight = new THREE.AmbientLight(0xfff33f, 0.2);
    scene.add(ambientLight);

    let pointLColor = "#FFF33F";
    pointLight=new THREE.DirectionalLight(pointLColor);
    pointLight.distance=100;
    pointLight.intensity=1;
    pointLight.visible=true;
    pointLight.castShadow=true;
    pointLight.position.set(5,5,0);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(60, 1280 / 768, 0.1, 10000);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    let geometry = new THREE.SphereGeometry(1, 13, 13);
    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0xffffff
    }));
    mesh.position.set(3,0,0);
    mesh.name="sphere";
    mesh.castShadow=true;
    mesh.receiveShadow=true;

    let geometry1 = new THREE.BoxGeometry(1, 1, 1);
    mesh1 = new THREE.Mesh(geometry1, new THREE.MeshPhongMaterial({
        color: 0xff77ff
    }));
    mesh1.position.set(0,0,0);
    mesh1.name="box";
    mesh1.castShadow=true;
    mesh1.receiveShadow=true;

    let meshFloor=new THREE.Mesh(
        new THREE.PlaneGeometry(7,7,7),
        new THREE.MeshPhongMaterial({
            color:0xffffff,
            side:THREE.DoubleSide
        })
    );
    meshFloor.position.set(0, 0, 0);
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.name="plane";
    meshFloor.castShadow=true;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    scene.add(camera);
    scene.add(mesh);
    scene.add(mesh1);

    SetTargetCamera(mesh1,camera);

    loadJS("model/丁堡河大桥2.rvt.js");

    renderer.setSize(1280,768);
    renderer.setClearColor(0x2E9AFE,0.5);
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
    animate();
}
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
window.onload = init;