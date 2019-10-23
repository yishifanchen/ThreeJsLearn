var VA3C={};
function loadJS(modelName) {
    var loader = new THREE.ObjectLoader();
    loader.load(modelName, function (result) {
        VA3C.scene=result;
        computeNormalsAndFaces();

        console.log(VA3C.scene);
    });
}
function computeNormalsAndFaces(){
    for(var i=0;i<VA3C.scene.children.length;i++){
        if(VA3C.scene.children[i].hasOwnProperty("geometry")){
            VA3C.scene.children[i].geometry.mergeVertices();
            VA3C.scene.children[i].castShadow=true;
            VA3C.scene.children[i].geometry.computeFaceNormals();
        }
    }
    scene.add(VA3C.scene);
}