var VA3C = {};
var structuralMeshList = [];
var meshObjectAllMaterial = new Object(); //存储所有object的初始材料
var geometryMerge;
function loadJS(modelName) {
    var loader = new THREE.ObjectLoader();
    loader.load(modelName, function (result) {
        VA3C.scene = result;
        geometryMerge = new THREE.Geometry();
        computeNormalsAndFaces();
        return;

        for(let i = 0;i<geometryMerge.faces.length;i++){
            let hex = Math.random() * 0xffffff;
            geometryMerge.faces[ i ].color.setHex( hex );
        }
        // let material = new THREE.MeshBasicMaterial( {
        //     vertexColors: THREE.FaceColors
        //     } );//projectionMatrix  modelViewMatrix
        let shaderMat=new THREE.ShaderMaterial({
            vertexShader:
            "varying vec4 vPosition;\n\
                void main() {\n\
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
                    vPosition = vec4( position, 1.0 );\n\
                }",
            fragmentShader:
            "varying vec4 vPosition;\
            void main() {\
                float dis=distance(vec3(0.0,vPosition.y,0.0),vec3(0.0,10.0,0.0)); \
                vec4 color1=vec4(1.0,0.0,0.0,1.0);\
                vec4 color2=vec4(0.0,1.0,0.0,1.0);\
                vec3 col=mix(color1.rgb,color2.rgb,dis*0.04);\
                gl_FragColor = vec4(col.x,col.y,col.z,1.0);\
            }"
        });
            // mesh=new THREE.Mesh(geometryMerge,new THREE.MeshPhongMaterial({
            //     color:0x111111,
            //     side:THREE.DoubleSide
            // }));
        mesh=new THREE.Mesh(geometryMerge,shaderMat);
        mesh.name="bridge";
        scene.add(mesh);
        console.log(mesh);
        mesh.geometry.computeBoundingBox();
        console.log("长："+(mesh.geometry.boundingBox.max.x-mesh.geometry.boundingBox.min.x));
        console.log("宽："+(mesh.geometry.boundingBox.max.z-mesh.geometry.boundingBox.min.z));
        console.log("高："+(mesh.geometry.boundingBox.max.y-mesh.geometry.boundingBox.min.y));
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
                    //console.log(VA3C.scene.children[i].children[k]);
                    VA3C.scene.children[i].children[k].updateMatrix();
                    //THREE.geometry.merge(mesh,VA3C.scene.children[i].children[k].geometry);
                    //geometryMerge.merge(VA3C.scene.children[i].children[k].geometry,VA3C.scene.children[i].children[k].matrix);
                    // VA3C.scene.children[i].children[k].material = new THREE.MeshPhongMaterial({
                    //     color:Math.random() * 0xffffff
                    // });
                    
                    console.log(VA3C.scene.children[i].children[k]);
                    scene.add(VA3C.scene.children[i].children[k]);
                }
            }
        }
    }
}