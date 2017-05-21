/**
 * MyTorpedo
 * @constructor
 */

 function MyTorpedo(scene, x, y, z, hAngle, vAngle) {
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
	
	this.hasExploded = false;

	//this.angle1 = angle;
	//this.angle2 = 0;
	this.orientation = 0;
	this.hRot = hAngle;
	this.vRot = vAngle;

	this.initialHRot = hAngle;
	this.initialVRot = vAngle;
	

	var tmp2 = Math.sin(this.initialHRot * degToRad)* Math.sin(this.initialVRot * degToRad);
	this.x = x -  tmp2;

	//CERTO
	var tmp3 =Math.sin(-this.initialVRot * degToRad);
	this.y = y- 0.9*Math.cos(-this.initialVRot * degToRad) - tmp3;

	//CERTO
	var tmp = Math.cos(this.initialHRot * degToRad)* Math.cos(this.initialVRot * degToRad);
	this.z = z - 1*Math.cos(this.initialHRot * degToRad)* Math.sin(this.initialVRot * degToRad) - tmp;

	console.log(this.x + " " + this.y + " " +this.z);
	console.log(x + " " + y + " " + z);

	//this.P2;
	//this.P3;	
	this.P4;
	this.t = 0;
	
	//this.submarineStopped = false;

	//this.rotation = false;
	this.launch = false;
	this.timePassed;

	this.firingTime;

	this.y_offset = -1.6;
	this.z_offset = 1.5;
	
	
	

};

 MyTorpedo.prototype = Object.create(CGFobject.prototype);
 MyTorpedo.prototype.constructor = MyTorpedo;

 MyTorpedo.prototype.display = function() {
 	this.scene.pushMatrix();
 	this.steelAppearance.apply();
 	// Body
 	//this.scene.rotate(this.currVertRot * degToRad,1,0,0);
 //	this.scene.translate(0,0,1);
 	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.hRot,0,1,0);
	this.scene.rotate(-this.vRot, 1, 0, 0);
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

	this.scene.popMatrix();

 };
	
 
 MyTorpedo.prototype.updatePosition = function(x, y, z){
/*
        this.x = this.scene.submarine.x;
        this.y = this.scene.submarine.y - 0.8;
        this.z = this.scene.submarine.z;
        */
       
 };


 MyTorpedo.prototype.getVector = function(){

 	this.P4 = [
		this.scene.targets[0].x,
		this.scene.targets[0].y,
		this.scene.targets[0].z,
 	];

 	//console.log(this.P4[0] + " " + this.P4[1]+ "  " + this.P4[2]);

 	var vector = [
		this.P4[0]-this.x,
		this.P4[1]-this.y,
		this.P4[2]-this.z,	
 	];

 	return vector;


 };

 MyTorpedo.prototype.getTargetDistance = function(){
 	var vector = this.getVector();
 	var x =Math.sqrt(Math.pow(vector[0],2)+ Math.pow(vector[1],2) + Math.pow(vector[2],2)) 
 	if (x < 1 && !this.hasExploded) {
 		this.hasExploded = true;
 		this.scene.explode(this.scene.targets[0].x,
 		  this.scene.targets[0].y, this.scene.targets[0].z);
		this.scene.isExpanding = true;
		
 	}
 	return x;
 };

 MyTorpedo.prototype.getRotationAngle = function(){

 	var vector = this.getVector();
 	var normals = Math.sqrt(vector[0]*vector[0]+vector[2]*vector[2])
 	var angle = Math.acos(vector[2]/normals);
	
 	if(vector[0] >= 0)
 		return angle;
 	else
 		return 2*Math.PI-angle;
 };

 MyTorpedo.prototype.getDirection = function(){
	
	var hVect = [Math.sin(this.hRot), 0, Math.cos(this.hRot)];
	var vVect = [0, Math.sin(-this.vRot), Math.cos(this.vRot)];

	var total = [hVect[0]+vVect[0], hVect[1]+vVect[1], hVect[2]+vVect[2]];

	var angle = Math.PI/2+this.vRot;
	var direction = [
		Math.sin(angle) * Math.sin(this.hRot),
		Math.cos(angle),
		Math.sin(angle) * Math.cos(this.hRot),
	];

	return direction;

 };

 MyTorpedo.prototype.readyToFire = function(){
 	
 	if(this.scene.targets.length == 0){
 		return "All targets eliminated.";
 	}
	
	
 	this.launch = true;
 	this.timePassed = 0;

	
	
 	var vector = this.getVector();
 	var distance = this.getTargetDistance();
 	this.firingTime = distance;
 	//var direction = this.getDirection();
	
	this.P2 = [
		this.x + Math.sin(this.initialHRot * degToRad) * Math.cos(this.initialVRot * degToRad),
		this.y + Math.sin(-this.initialVRot * degToRad),
 		this.z + Math.cos(this.initialHRot * degToRad)* Math.cos(this.initialVRot * degToRad),
 	]

	
	/*this.P2 = [
	this.x + Math.sin(this.initialHRot * degToRad)/
	  (Math.sqrt(1 + Math.pow(Math.sin(this.initialHRot * degToRad),2))), 
	this.y + Math.sin(this.initialVRot * degToRad)/
	  (Math.sqrt(1 + Math.pow(Math.sin(this.initialVRot * degToRad),2))), 
	this.z + Math.cos(this.initialHRot * degToRad)/
	   (Math.sqrt(1 + Math.pow(Math.sin(this.initialHRot* degToRad),2))), 
	]*/

	
 	this.P3 = [
		this.scene.targets[0].x,
		this.scene.targets[0].y +0.5,
		this.scene.targets[0].z,
 	]


 };

 MyTorpedo.prototype.update = function(currTime){
 	
 	/*
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	
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
 
	var totalRotation = this.getRotationAngle();

 	if(this.launch){
		if(this.t <= 1.0){
			
			//this.orientation = (Math.PI/2-this.vRot)/(this.getTargetDistance*100);

			var t = this.t;

			var x1 = Math.pow((1-t), 3)*this.x + 3*t*Math.pow(1-t,2)*this.P2[0] + 3*Math.pow(t,2)*(1-t)*this.P3[0] + Math.pow(t,3)*this.P4[0];
			
			var y1 = Math.pow((1-t), 3)*this.y + 3*t*Math.pow(1-t,2)*this.P2[1] + 3*Math.pow(t,2)*(1-t)*this.P3[1] + Math.pow(t,3)*this.P4[1];
			
			var z1 = Math.pow((1-t), 3)*this.z + 3*t*Math.pow(1-t,2)*this.P2[2] + 3*Math.pow(t,2)*(1-t)*this.P3[2] + Math.pow(t,3)*this.P4[2];                             
			
			//this.hRot += totalRotation/11;
			var dx = x1-this.x;
			var dy = y1-this.y;
			var dz = z1-this.z;

			this.x = x1;
			this.y = y1;
			this.z = z1;

			this.hRot = Math.atan(dx / dz) + (dz < 0 ? 180.0*degToRad : 0);
			this.vRot = Math.atan(dy / Math.sqrt(dx*dx + dy*dy + dz*dz));


			this.t += 1.0/(this.getTargetDistance() * 100);

			this.y_offset = (1 - this.t) * -1.6;
			if(this.y_offset > 0) this.y_offset = 0;
			this.z_offset = (1 - this.t) * 1.5;
			if(this.z_offset < 0) this.z_offset = 0;
		
		}
		else{
			this.scene.hit = true;
			this.scene.launch = false;
		}
		
 	}

 	this.timePassed = currTime;
 };



