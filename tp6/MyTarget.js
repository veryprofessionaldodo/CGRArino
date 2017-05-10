/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var minS, maxS, minT, maxT;

function MyTarget(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyUnitCubeQuad(scene);
	
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;


MyTarget.prototype.display = function() {
	this.quad.display();
}
