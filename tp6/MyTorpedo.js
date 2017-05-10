/**
 * MyTorpedo
 * @constructor
 */

var rotY, posX, posY, currSpeed, currTurn;
var speed, turbRot, periscopeY , currPeriscopeY;
var rudderTurn, currRudderTurn, horizontalRudder, currHorizontalRudder;
var currTime, isChangingHeight, vertRot, currVertRot;


 function MyTorpedo(scene) {
 	this.currTime = 0; this.rudderTurn = 0; this.currRudderTurn = 0;
 	this.periscopeY = 0; 
 	this.currHorizontalRudder = 0; this.horizontalRudder = 0;
 	this.currPeriscopeY = 0;
 	this.rotY = 0;
 	this.currVertRot = 0;
 	this.vertRot = 0;
 	this.turbRot = 0;
 	this.turbSpeed = 0;
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

 MyTorpedo.prototype = Object.create(CGFobject.prototype);
 MyTorpedo.prototype.constructor = MyTorpedo;

 MyTorpedo.prototype.display = function() {
 	this.submarineAppearances[this.scene.currSubmarineAppearance].apply();

 	// Body
 	this.scene.rotate(this.currVertRot * degToRad,1,0,0);
 	this.scene.translate(0,0,-2);


 	this.scene.pushMatrix();
 		this.scene.scale(.2,.2,2);
 		this.cylinder.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 		this.scene.scale(.2,.2,.2);
 		this.scene.rotate(Math.PI,0,0,1);
 		this.scene.translate(0,0,10);
 		this.sphere.display();
 	this.scene.popMatrix();	
 	this.scene.pushMatrix();
 		this.scene.scale(.2,.2,.2);
 		this.scene.rotate(Math.PI, 1,0,0);
 		this.sphere.display();
 	this.scene.popMatrix();	
 	

 	//Fins

	this.scene.pushMatrix();
	//Left
		this.scene.pushMatrix();
			this.scene.rotate(this.currHorizontalRudder*degToRad, 1,0,0);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.trapeze.display();
		this.scene.popMatrix();
	//Right
		this.scene.pushMatrix();
			this.scene.rotate(this.currHorizontalRudder*degToRad, 1,0,0);
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Up
		this.scene.pushMatrix();
			this.scene.rotate(this.currRudderTurn * degToRad, 0,1,0);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			
			//this.scene.translate(0,0,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Down
		this.scene.pushMatrix();
			this.scene.rotate(this.currRudderTurn * degToRad, 0,1,0);
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	

 };



MyTorpedo.prototype.swim = function() {

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

	this.currVertRot = this.currVertRot + (this.vertRot - this.currVertRot)/13;

	this.rotY = this.rotY+(this.currTurn/5);

	this.currHorizontalRudder = this.currHorizontalRudder +
	 (this.horizontalRudder-this.currHorizontalRudder)/7;

	this.currSpeed = this.currSpeed + (this.speed - this.currSpeed)/13;
	this.posX = this.posX + (0.01*this.currSpeed)*Math.cos(this.vertRot * degToRad)
	*Math.sin(this.rotY * degToRad);//(swim/2 * Math.cos(this.rotY-90));
	this.posZ = this.posZ + (0.01*this.currSpeed)*Math.cos(this.vertRot * degToRad)
	*Math.cos((this.rotY) * degToRad);//(swim/2 * Math.sin(this.rotY-90));
	this.posY = this.posY + (0.01*this.currSpeed)*-Math.sin(this.vertRot * degToRad);//(swim/2 * Math.cos(this.rotY-90));
	


	this.turbRot = this.turbRot + this.turbSpeed;
	this.currRudderTurn = this.currRudderTurn + (this.rudderTurn- this.currRudderTurn)/7;

	this.currPeriscopeY = this.currPeriscopeY + (this.periscopeY - this.currPeriscopeY)/20;
}



MyTorpedo.prototype.turnSub = function(speed) {
	this.rudderTurn = -this.scene.speed * 6;
	if (this.speed >=  0) 
		this.currTurn = + speed;
	else 
		this.currTurn = -speed;
}

MyTorpedo.prototype.returnToNormal = function() {
	this.currTurn = 0;
	this.rudderTurn = 0;
}



