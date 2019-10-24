var cameraTarget; //目标物体
var cameraObject; //摄像机物体
var targetPosition = new THREE.Vector3(0, 0, 0); //目标位置
var targetRotation = new THREE.Euler(0, 0, 0); //目标旋转
var mouseRotationDistance = 0;
var mouseVerticalDistance = 0;
var mouseScrollDistance = 0;
var followDistance = 100;
var followTgtDistance = 0;
var oldMouseRotation = 0;
var camRotation = 0;
var camHeight = 0;
var orbitView = false; //操作视角
var reverseXAxis = false; //反转x轴
var reverseYAxis = false; //反转y轴
var camHeightClamp = 50; //限制摄像机y轴高度
var originVector=new THREE.Vector3(0,0,0);

function SetTargetCamera(target, camera) {
    this.cameraTarget = target.position;
    this.cameraObject = camera;
    update();
}
function SetTarget(target){
    this.cameraTarget = target;
}
//线性差值
function lerp(p0, p1, value) {
    return (1 - value) * p0 + value * p1;
}

function Raycast() {
    let mouse = new THREE.Vector2(0, 0);
    mouse.x = (startX / 1280) * 2 - 1;
    mouse.y = -(startY / 768) * 2 + 1;
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraObject);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        //console.log(intersects[0].object);
        intersects[0].object.material=new THREE.MeshPhongMaterial({
            color:0xffffff*Math.random(),
            side:THREE.DoubleSide
        });
        SetTarget(intersects[0].point);
    }else{
        SetTarget(originVector);
    }
}

function update() {
    requestAnimationFrame(update);

    orbitView = inputMouseKey0; //按下鼠标左键
    mouseRotationDistance = inputMouseX; //移动鼠标x轴
    mouseVerticalDistance = inputMouseY; //移动鼠标y轴
    mouseScrollDistance = inputMouseWheel; //滚轮
    if (reverseXAxis) mouseRotationDistance = -inputMouseX; //移动鼠标x轴反向
    if (reverseYAxis) mouseVerticalDistance = -inputMouseY; //移动鼠标Y轴反向

    targetPosition = cameraTarget;
    oldMouseRotation = mouseRotationDistance;

    followDistance -= mouseScrollDistance/120;
    followDistance = THREE.Math.clamp(followDistance, 1, 100);
    followTgtDistance = lerp(followTgtDistance, followDistance, 0.08);

    if (orbitView) { //按下鼠标左键
        camRotation = lerp(oldMouseRotation, mouseRotationDistance, 0.2) / 10;
        camHeight = lerp(camHeight, camHeight + mouseVerticalDistance, 0.1);

    }
    camHeight = THREE.Math.clamp(camHeight, -camHeightClamp, camHeightClamp);

    targetRotation.set(
        targetRotation.x,
        targetRotation.y = (targetRotation.y + camRotation) % 360,
        targetRotation.z
    );
    cameraObject.rotation.set(
        targetRotation.x,
        targetRotation.y * Math.PI / 180,
        cameraObject.rotation.z
    );
    cameraObject.position.set(
        cameraTarget.x + (Math.cos(cameraObject.rotation.y) * followTgtDistance),
        lerp(camHeight, cameraTarget.y - Math.abs(Math.sin(cameraObject.rotation.x) * followTgtDistance), 0.02),
        cameraTarget.z + (Math.sin(cameraObject.rotation.y) * followTgtDistance)
    );
    cameraObject.lookAt(targetPosition);
}