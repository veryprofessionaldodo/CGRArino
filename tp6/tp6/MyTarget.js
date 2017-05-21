/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



function MyTarget(scene, x, y, z) {
	CGFobject.call(this,scene);
	this.quad = new MyUnitCubeQuad(scene);
	this.x = x;
	this.y = y;
	this.z = z;

	this.targetAppearance = new CGFappearance(scene);
	this.targetAppearance.setAmbient(0.3,0.3,0.3,1);
	this.targetAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.targetAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.targetAppearance.setShininess(120);
	this.targetAppearance.loadTexture("../resources/images/target.jpg");
	this.targetAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;


MyTarget.prototype.display = function() {
		
	this.scene.pushMatrix();
		this.targetAppearance.apply();
		this.scene.translate(this.x,this.y,this.z);
		//this.scene.rotate(Math.PI/5,0,1,0);
		//this.scene.scale(1,1,0.1);
		this.quad.display();
	this.scene.popMatrix();
}
