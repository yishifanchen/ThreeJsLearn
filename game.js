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
    camera.position.set(0, 0, -5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0xffffff
    }));

    scene.add(camera);
    scene.add(mesh);

    renderer.setSize(1280,768);
    
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
    
}
window.onload = init;