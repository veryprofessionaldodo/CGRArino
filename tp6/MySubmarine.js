/**
 * MySubmarine
 * @constructor
 */

var rotY, posX, currPosY, posY, currSpeed, currTurn;
var speed, turbRot, periscopeY , currPeriscopeY;
var rudderTurn, currRudderTurn, horizontalRudder, currHorizontalRudder;
var currTime, isChangingHeight, vertRot;


 function MySubmarine(scene) {
 	this.currTime = 0; this.rudderTurn = 0; this.currRudderTurn = 0;
 	this.periscopeY = 0; 
 	this.currHorizontalRudder = 0; this.horizontalRudder = 0;
 	this.currPeriscopeY = 0;
 	this.rotY = 0;
 	this.vertRot = 0;
 	this.turbRot = 0;
 	this.turbSpeed = 0;
 	this.currPosY = 0;
 	this.isChangingHeight = 0;
 	this.posY = 0;
 	this.currSpeed = 0; // CurrentSpeed
 	this.speed = 0; // Final Speed value
 	this.currTurn = 0;
 	this.posX = 0; 	this.currPosY = 0; 	this.posZ = 0;
 	this.cylinder = new MyCylinder(scene, 20,20);
	this.sphere = new MySphere(scene,20,20);
 	CGFobject.call(this,scene);
	this.triangle = new MyTriangle(scene);
	this.circle = new MyCircle(scene,20,20);
	this.innerCylinder = new MyInsideCylinder(scene,20,20);
	this.trapeze = new MyTrapeze(scene);
	this.quad = new MyQuad(scene);
	
	this.submarineAppearances = [];

	var steelAppearance = new CGFappearance(this.scene);
	steelAppearance.loadTexture("../resources/images/steel.jpg");
	this.submarineAppearances.push(steelAppearance);

	var monaLisaAppearance = new CGFappearance(this.scene);
	monaLisaAppearance.loadTexture("../resources/images/monalisa.jpg");
	this.submarineAppearances.push(monaLisaAppearance);

	var cageAppearance = new CGFappearance(this.scene);
	cageAppearance.loadTexture("../resources/images/cage.png");
	this.submarineAppearances.push(cageAppearance);
	
	var poolBallAppearance = new CGFappearance(this.scene);
	poolBallAppearance.loadTexture("../resources/images/poolball.jpg");
	this.submarineAppearances.push(poolBallAppearance);
	

};

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {
 	
 	this.submarineAppearances[this.scene.currSubmarineAppearance].apply();

 	// Body
 	this.scene.translate(0,0,-2);
	this.scene.rotate(this.currSpeed*this.vertRot * degToRad,1,0,0);


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
 		this.scene.rotate(Math.PI,0,0,1);
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
	//Left
		this.scene.pushMatrix();
			this.scene.rotate(this.currHorizontalRudder*degToRad, 1,0,0);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Right
		this.scene.pushMatrix();
			this.scene.rotate(this.currHorizontalRudder*degToRad, 1,0,0);
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Up
		this.scene.pushMatrix();
			this.scene.rotate(this.currRudderTurn * degToRad, 0,1,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.translate(.8,0,-0.3);
			this.scene.scale(.5,0.1,.3);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Down
		this.scene.pushMatrix();
			this.scene.rotate(this.currRudderTurn * degToRad, 0,1,0);
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

		//this.scene.rotate(Math.PI/2,0,0,1);

		this.scene.pushMatrix();
			this.scene.translate(-.579,-0.35,-0.14);
			this.scene.rotate(this.turbRot * degToRad,0,0,1);
			this.scene.scale(0.07,0.35,1);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.579,-0.35,-0.14);
			this.scene.rotate(this.turbRot * degToRad,0,0,1);
			this.scene.scale(0.07,0.35,1);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.579,-0.35,.85);
			this.scene.rotate(this.turbRot * degToRad,0,0,1);

			this.scene.scale(0.07,0.35,1);
			this.scene.rotate(Math.PI,1,0,0);
			this.quad.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.579,-0.35,.85);	
			this.scene.rotate(this.turbRot * degToRad,0,0,1);

			this.scene.scale(0.07,0.35,1);
			this.scene.rotate(Math.PI,1,0,0);
			this.quad.display();
		this.scene.popMatrix();
		
	this.scene.popMatrix();

	// Periscope

	this.scene.pushMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,0.9 + this.currPeriscopeY,2.65);
			this.scene.scale(0.05,.9,0.05);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.cylinder.display();
			this.innerCylinder.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,1.8 + this.currPeriscopeY,2.6);
			this.scene.scale(0.05,.05,0.3);
			this.cylinder.display();
			this.innerCylinder.display();
			this.scene.popMatrix();
	this.scene.popMatrix();

 };



MySubmarine.prototype.swim = function() {

	if(this.isChangingHeight != 0) {
		if (this.isChangingHeight > 0) {
			this.horizontalRudder = this.scene.speed * 10; 
			this.vertRot = this.vertRot + 1;
		}
		else if (this.isChangingHeight < 0) {
			this.horizontalRudder = -this.scene.speed * 10; 
			this.vertRot = this.vertRot -1;
		}
	}
	else
		this.horizontalRudder = 0;

	this.scene.rotate(this.currSpeed*this.vertRot * degToRad,1,0,0);

	
	
	this.currHorizontalRudder = this.currHorizontalRudder +
	 (this.horizontalRudder-this.currHorizontalRudder)/7;

	this.currPosY = this.currPosY + (this.posY- this.currPosY)/5;
	this.currSpeed = this.currSpeed + (this.speed - this.currSpeed)/5;
	this.posX = this.posX + (0.01*this.currSpeed)*Math.sin((this.rotY) * degToRad);//(swim/2 * Math.cos(this.rotY-90));
	this.posZ = this.posZ + (0.01*this.currSpeed)*Math.cos((this.rotY) * degToRad);//(swim/2 * Math.sin(this.rotY-90));
	this.posY = this.posY + (0.01*this.currSpeed)*Math.sin((this.rotY) * degToRad);//(swim/2 * Math.cos(this.rotY-90));

	this.turbRot = this.turbRot + this.turbSpeed;
	this.currRudderTurn = this.currRudderTurn + (this.rudderTurn- this.currRudderTurn)/7;
	this.rotY = this.rotY+(this.currTurn/5);


	this.currPeriscopeY = this.currPeriscopeY + (this.periscopeY - this.currPeriscopeY)/20;
}


MySubmarine.prototype.swimSub = function(swim) {
	this.speed = this.speed + swim;
	
}

MySubmarine.prototype.turbinesRotation = function(now) {
	var deltaTime = now - this.currTime;
	this.turbSpeed = (this.speed/3)*(360/60);
	this.currTime = now;
	
}

MySubmarine.prototype.turnSub = function() {
	this.rudderTurn = -this.scene.speed * 6;
	if (this.speed >=  0) 
		this.currTurn = + this.scene.speed;
	else 
		this.currTurn = -this.scene.speed;

}

MySubmarine.prototype.returnToNormal = function() {
	this.currTurn = 0;
	this.rudderTurn = 0;
}

MySubmarine.prototype.changePeriscope = function(height) {
	this.periscopeY = height/9;
}

