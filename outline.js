var composer;
var renderPass;
var outlinePass;
var effectFXAA;

function OutLineInit() {
   composer = new THREE.EffectComposer(renderer);
   composer.setSize( useWidth, useHeight );
   renderPass = new THREE.RenderPass(scene, camera);
   composer.addPass(renderPass);
   outlinePass=new THREE.OutlinePass(new THREE.Vector2(useWidth,useHeight),scene,camera);
   //outlinePass.edgeStrength=3;
   //outlinePass.edgeThickness=1;
   effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / useWidth, 1 / useHeight );
	

   composer.addPass(outlinePass);
   composer.addPass( effectFXAA );
   composer.render();
}