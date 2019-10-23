var cameraTarget; //目标物体
var cameraObject; //摄像机物体
var targetPosition = new THREE.Vector3(0, 0, 0); //目标位置
var targetRotation = new THREE.Euler(0, 0, 0); //目标旋转
var mouseRotationDistance = 0;
var mouseVerticalDistance = 0;
var mouseScrollDistance = 0;
var followDistance = 0;
var followTgtDistance = 0;
var oldMouseRotation = 0;
var camRotation = 0;
var camHeight = 0;
var orbitView = false; //操作视角
var reverseXAxis = false; //反转x轴
var reverseYAxis = false; //反转y轴
var camHeightClamp = 50; //限制摄像机y轴高度

function SetTarget(target, camera) {
    this.cameraTarget = target;
    this.cameraObject = camera;
    update();
}
//线性差值
function lerp(p0, p1, value) {
    return (1 - value) * p0 + value * p1;
}

function update() {
    requestAnimationFrame(update);

    orbitView = inputMouseKey0; //按下鼠标左键
    mouseRotationDistance = inputMouseX; //移动鼠标x轴
    mouseVerticalDistance = inputMouseY; //移动鼠标y轴
    mouseScrollDistance = inputMouseWheel; //滚轮
    if (reverseXAxis) mouseRotationDistance = -inputMouseX; //移动鼠标x轴反向
    if (reverseYAxis) mouseVerticalDistance = -inputMouseY; //移动鼠标Y轴反向

    targetPosition = cameraTarget.position;
    oldMouseRotation = mouseRotationDistance;

    followDistance -= mouseScrollDistance / 800;
    followDistance = THREE.Math.clamp(followDistance, 1, 100);
    followTgtDistance = lerp(followTgtDistance, followDistance, 0.1);

    if (orbitView) { //按下鼠标左键
        camRotation = lerp(oldMouseRotation, mouseRotationDistance, 0.2) / 10;
        camHeight = lerp(camHeight, camHeight + mouseVerticalDistance, 0.02);
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
        cameraTarget.position.x + (Math.cos(cameraObject.rotation.y) * followTgtDistance),
        lerp(camHeight, cameraTarget.position.y - Math.abs(Math.sin(cameraObject.rotation.x) * followTgtDistance), 0.02),
        cameraTarget.position.z + (Math.sin(cameraObject.rotation.y) * followTgtDistance)
    );
    cameraObject.lookAt(targetPosition);
}