/**
 * MySubmarine
 * @constructor
 */

var rotY, posX, posY, currSpeed, currTurn, speed, updateSpeed;

 function MySubmarine(scene) {
 	this.rotY = 0;
 	this.currSpeed = 0; // CurrentSpeed
 	this.updateSpeed = 0; // Speed to increase when changeSpeed is invoked
 	this.speed = 0; // Final Speed value
 	this.currTurn = 0;
 	this.posX = 0;
 	this.posY = 0;
 	this.posZ = 0;
 	this.cylinder = new MyCylinder(scene, 20,20);
	this.sphere = new MySphere(scene,20,20);
 	CGFobject.call(this,scene);
	this.triangle = new MyTriangle(scene);
	this.circle = new MyCircle(scene,20,20);
	this.innerCylinder = new MyInsideCylinder(scene,20,20);
	this.trapeze = new MyTrapeze(scene);
	this.quad = new MyQuad(scene);
	
};

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {
 	
 	// Body

 	this.scene.pushMatrix();
 		this.scene.scale(0.9/2,1.2/2,4.08);
 		this.cylinder.display();
 	this.scene.popMatrix();
 	this.scene.pushMatrix();
 		this.scene.scale(0.3,1,.5);
 		this.scene.rotate(-Math.PI/2,1,0,0);
 		this.scene.translate(0,-5,0.25);
 		this.cylinder.display();
 		this.scene.translate(0,0,.8);
 		this.circle.display();
 	this.scene.popMatrix();
 	this.scene.pushMatrix();
 		this.scene.scale(0.9/2,1.2/2,0.6);
 		this.scene.translate(0,0,4.08/.6);
 		this.sphere.display();
 	this.scene.popMatrix();	
 	this.scene.pushMatrix();
 		this.scene.scale(0.9/2,1.2/2,0.6);
 		this.scene.rotate(Math.PI, 1,0,0);
 		this.sphere.display();
 	this.scene.popMatrix();	
 	

 	//Fins

	this.scene.pushMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);

			this.trapeze.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,1/20,.3);
			this.scene.translate(0,-0.5,0);
		this.trapeze.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.4,.9,2.6);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.scale(.4,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.4,.9,2.6);
			this.scene.rotate(-Math.PI,1,0,0);
			this.scene.rotate(-Math.PI,0,0,1);
			this.scene.scale(.4,0.1,.5);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	// Propellers
	
	this.scene.pushMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.579,-0.35,0.32);
			this.scene.scale(0.2,0.2, 0.1);
			this.cylinder.display();
			this.innerCylinder.display();
			this.scene.scale(0.2,0.2,.4);
			this.scene.translate(0,0,0.5);
			this.cylinder.display();
			this.innerCylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.579,-0.35,0.32);
			this.scene.scale(0.2,0.2, 0.1);
			this.cylinder.display();
			this.innerCylinder.display();
			this.scene.scale(0.2,0.2,.4);
			this.scene.translate(0,0,0.5);
			this.cylinder.display();
			this.innerCylinder.display();
		this.scene.popMatrix();
		//this.pushMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.579,-0.35,-0.14);
			this.scene.scale(0.07,0.35,1);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.579,-0.35,-0.14);
			this.scene.scale(0.07,0.35,1);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.579,-0.35,.85);
			this.scene.scale(0.07,0.35,1);
			this.scene.rotate(Math.PI,1,0,0);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.579,-0.35,.85);
			this.scene.scale(0.07,0.35,1);
			this.scene.rotate(Math.PI,1,0,0);
			this.quad.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();

	// Periscope

	this.scene.pushMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,1.2,2.65);
			this.scene.scale(0.05,.9,0.05);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.cylinder.display();
			this.innerCylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,2.1,2.6);
			this.scene.scale(0.05,.05,0.3);
			this.cylinder.display();
			this.innerCylinder.display();
			this.scene.popMatrix();
	this.scene.popMatrix();

 };

MySubmarine.prototype.turnSub = function(turn) {
	this.currTurn = turn;
	//this.rotY = this.rotY+turn;
	
};


MySubmarine.prototype.swim = function() {

	this.posX = this.posX + (0.01*this.speed)*Math.sin((this.rotY) * degToRad);//(swim/2 * Math.cos(this.rotY-90));
	this.posZ = this.posZ + (0.01*this.speed)*Math.cos((this.rotY) * degToRad);//(swim/2 * Math.sin(this.rotY-90));

	this.rotY = this.rotY+(this.currTurn/5);
}


MySubmarine.prototype.swimSub = function(swim) {
	this.speed = this.speed + swim;
	this.updateSpeed = 0.1;
}

MySubmarine.prototype.turnSub = function(turn) {
	this.currTurn = turn;
	//this.rotY = this.rotY + turn;
}

MySubmarine.prototype.returnToNormal = function() {
	this.currTurn = 0;
}