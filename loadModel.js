var VA3C = {};
var structuralMeshList = [];
var meshObjectAllMaterial = new Object(); //存储所有object的初始材料
function loadJS(modelName) {
    var loader = new THREE.ObjectLoader();
    loader.load(modelName, function (result) {
        VA3C.scene = result;
        computeNormalsAndFaces();
    });
}

function computeNormalsAndFaces() {
    for (var i = 0; i < VA3C.scene.children.length; i++) {
        if (VA3C.scene.children[i].children.length > 0) {
            for (var k = 0; k < VA3C.scene.children[i].children.length; k++) {
                if (VA3C.scene.children[i].children[k].hasOwnProperty("geometry")) {
                    VA3C.scene.children[i].children[k].castShadow = true;
                    structuralMeshList.push(VA3C.scene.children[i].children[k]);
                    meshObjectAllMaterial[VA3C.scene.children[i].children[k].id] = VA3C.scene.children[i].children[k].material;
                    VA3C.scene.children[i].children[k].scale.set(0.001, 0.001, 0.001);
                    scene.add(VA3C.scene.children[i].children[k]);
                }
            }
        }
    }
}