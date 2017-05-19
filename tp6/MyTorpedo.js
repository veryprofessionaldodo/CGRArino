/**
 * MyTorpedo
 * @constructor
 */

 function MyTorpedo(scene, x, y, z, angle) {
 	this.cylinder = new MyCylinder(scene, 20,20);
	this.sphere = new MySphere(scene,20,20);
 	CGFobject.call(this,scene);
	this.triangle = new MyTriangle(scene);
	this.circle = new MyCircle(scene,20,20);
	this.innerCylinder = new MyInsideCylinder(scene,20,20);
	this.trapeze = new MyTrapeze(scene);
	this.quad = new MyQuad(scene);
	
	this.steelAppearance = new CGFappearance(this.scene);
	this.steelAppearance.loadTexture("../resources/images/steel.jpg");
	
	this.x = x;
	this.y = y;
	this.z = z;

	this.angle1 = angle;
	this.angle2 = 0;
	this.orientation = 0;

	this.P2;
	this.P3;	
	this.P4;
	this.t = 0;
	
	//this.submarineStopped = false;

	//this.rotation = false;
	this.launch = false;
	this.timePassed;

	this.firingTime;

};

 MyTorpedo.prototype = Object.create(CGFobject.prototype);
 MyTorpedo.prototype.constructor = MyTorpedo;

 MyTorpedo.prototype.display = function() {
 	
	this.steelAppearance.apply();
 	// Body
 	//this.scene.rotate(this.currVertRot * degToRad,1,0,0);
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
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.trapeze.display();
		this.scene.popMatrix();
	//Right
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Up
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			
			//this.scene.translate(0,0,0);
			this.trapeze.display();
		this.scene.popMatrix();
	//Down
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.scene.translate(.3,0,0);
			this.scene.scale(.5,0.05,.15);
			this.scene.translate(0,-0.5,0);
			this.trapeze.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	

 };
	
 
 MyTorpedo.prototype.updatePosition = function(posX, posY, posZ){

    if (this.scene.submarine.speed != 0){
        this.x = y;
        this.y = y - 1.1;
        this.z = z;
    }
 };


 MyTorpedo.prototype.getVector = function(){

 	this.P4 = [
		this.scene.targets[0].x,
		this.scene.targets[0].y,
		this.scene.targets[0].z,
 	];

 	var vector = [
		this.P4[0]-this.x,
		this.P4[1]-this.y,
		this.P4[2]-this.z,	
 	];

 	return vector;
 };


 MyTorpedo.prototype.getTargetDistance = function(){
 	var vector = this.getVector();

 	return Math.sqrt(Math.pow(vector[0],2)+ Math.pow(vector[1],2) + Math.pow(vector[2],2));
 };
/*
 MyTorpedo.prototype.getRotationAngle = function(){

 	var vector = this.getVector();
 	var distance = this.getTargetDistance();
 	var angle = Math.acos(vector[2]/distance);

 	if(vector[0] >= 0)
 		return angle;
 	else
 		return 2*Math.PI-angle;
 };
*/
 MyTorpedo.prototype.readyToFire = function(){
 	
 	if(this.scene.targets.length == 0){
 		return "All targets eliminated.";
 	}
	
	//this.submarineStopped = true;

 	//this.rotation= true;
 	this.launch = true;
 	this.timePassed = 0;


 	var vector = this.getVector();
 	var distance = this.getTargetDistance();
 	this.firingTime = parseInt(distance);

 	this.P2 = [
		6/7 * vector[0] + this.x,
		vector[1] + this.y,
		6/7 * vector[2] + this.z,
 	]

 	this.P3 = [
		vector[0] + this.x,
		6/7 * vector[1]+this.y,
		vector[2] + this.z,
 	]


 };

 MyTorpedo.prototype.update = function(currTime){
 	
 	var dt = currTime - this.timePassed;
	/*
 	if(this.rotation){
		var totalRotation = this.getRotationAngle();

 		while(this.angle1 > totalRotation){
 			this.angle1 += totalRotation/10;
 		}

 		this.rotation = false;
 		this.bezier = true;
 		this.timePassed = 0;
 	}
	*/
 	if(this.launch){
		while(this.t <= 1){

			var t = this.t;

			this.x = Math.pow((1-t), 3)*this.x + 3*t*Math.pow(1-t,2)*this.P2[0] + 3*Math.pow(t,2)*(1-t)*this.P3[0] + Math.pow(t,3)*this.P4[0];
			
			this.y = Math.pow((1-t), 3)*this.y + 3*t*Math.pow(1-t,2)*this.P2[1] + 3*Math.pow(t,2)*(1-t)*this.P3[1] + Math.pow(t,3)*this.P4[1];
			
			this.z = Math.pow((1-t), 3)*this.z + 3*t*Math.pow(1-t,2)*this.P2[2] + 3*Math.pow(t,2)*(1-t)*this.P3[2] + Math.pow(t,3)*this.P4[2];                             
		
			this.t += 1/(this.firingTime*100);
		}

		this.bezier = false;
 	}

 	this.timePassed = currTime;
 };






