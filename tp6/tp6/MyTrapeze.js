/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var minS, maxS, minT, maxT;

function MyTrapeze(scene) {
	CGFobject.call(this,scene);
	this.cube = new MyUnitCubeQuad(scene);
	this.triangle = new MyTriangle(scene);
	this.quad = new MyQuad(scene);

};

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor=MyTrapeze;

MyTrapeze.prototype.display = function() {
	this.scene.pushMatrix();
 		this.scene.translate(0, 1, 0);
 		this.triangle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI, 1,0,0);
 		this.scene.rotate(Math.PI/2, 0,1,0);
 		this.triangle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI/4,0,1,0);
 		this.scene.scale(Math.sqrt(2),1,1);

 		this.scene.translate(0,0.5,-0.5);
 		this.scene.translate(0,0,1);
 		this.scene.translate(0,0,-0.293);
 		this.quad.display();
 	this.scene.popMatrix();
 

 	this.scene.pushMatrix();
 		this.scene.translate(0,0.5,-0.5);
 		this.scene.translate(0.5,0,1);
	 	this.scene.pushMatrix();
			this.scene.rotate(-Math.PI,0,1,0);
  			this.quad.display();
  		this.scene.popMatrix();
  		this.scene.rotate(-Math.PI/2,0,1,0);
  		this.quad.display();
   	this.scene.popMatrix();
	
	

 	// back face
 	this.scene.pushMatrix();
 		this.scene.translate(-0.5,0.5,0.5);
		this.cube.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	//this.quad.display();
 	this.scene.popMatrix();
}
