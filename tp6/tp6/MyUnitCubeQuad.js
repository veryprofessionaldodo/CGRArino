function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad=new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function()
{
	this.quad.display();
//this.quad.rotate(180 * this.deg2rad);
	 //this.scene.translate(5,0,2);
	 this.scene.rotate(Math.PI,1,0,0);
	 this.quad.display();
	 this.scene.rotate(Math.PI/2,1,0,0);
	 this.quad.display();
	 this.scene.rotate(Math.PI,1,0,0);
	 this.quad.display();

	 this.scene.rotate(Math.PI/2,0,1,0);
	 this.quad.display();
	 	 this.scene.rotate(Math.PI,0,1,0);
	 this.quad.display();
}


