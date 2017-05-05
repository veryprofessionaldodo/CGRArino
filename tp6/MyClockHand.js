function MyClockHand(scene) {
 	CGFobject.call(this,scene);
 	this.quad = new MyUnitCubeQuad(this.scene);	
 };
 
MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyTable;

MyClockHand.prototype.display = function() {	
	this.scene.scale(1,0.1,0.1);
	this.quad.display();	
 };

MyClockHand.prototype.setAngle = function(angle) {
 	this.scene.rotate(-angle*degToRad,0,0,1);
 };
