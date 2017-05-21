var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 100;
var BOARD_B_DIVISIONS = 100;

var speed;
var currTime, deltaTime;
var light0, light1, run;

function LightingScene() {
	CGFscene.call(this);
	currentTime = Date.now();
  	
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);
	this.initCameras();
	this.light0=true; this.light1=true; this.run = true; this.speed=3;
	this.launch = false;

	this.initLights();
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.4, 0.7, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

	this.axis = new CGFaxis(this);
	this.submarine = new MySubmarine(this);
	this.cleck = new MyClock(this, 90, 180,270);
	this.post = new MyCylinder(this, 20,20);
	this.materialDefault = new CGFappearance(this);
	this.oceanFloor = new MyQuad(this, -0.5,1.5,-1,1);
	this.trapeze = new MyTrapeze(this);
	this.target = new MyTarget(this);
	this.torpedo = new MyTorpedo(this);
	this.target1 = new MyTarget(this, 5, -1, 10);
	this.target2 = new MyTarget(this, -6, -3, 13);
	this.targets = [this.target2, this.target1];
	


	this.hand2Appearance = new CGFappearance(this);
	this.hand2Appearance.setAmbient(0.3,0.3,0.3,1);
	this.hand2Appearance.setDiffuse(1,0,0,1);
	this.hand2Appearance.setSpecular(0.8,0.8,0.8,1);	
	this.hand2Appearance.setShininess(120);
		
	this.reckAppearance = new CGFappearance(this);
	this.reckAppearance.setAmbient(0.3,0.3,0.3,1);
	this.reckAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.reckAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.reckAppearance.setShininess(120);
	this.reckAppearance.loadTexture("../resources/images/reck.png");
	this.reckAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.handAppearance = new CGFappearance(this);
	this.handAppearance.setAmbient(0.3,0.3,0.3,1);
	this.handAppearance.setDiffuse(0,0,0,1);
	this.handAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.handAppearance.setShininess(120);
	
	this.cleckAppearance = new CGFappearance(this);
	this.cleckAppearance.setAmbient(0.3,0.3,0.3,1);
	this.cleckAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.cleckAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.cleckAppearance.setShininess(120);
	this.cleckAppearance.loadTexture("../resources/images/cleck.png");
	this.cleckAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setAmbient(0.7,0.7,0.7,1);
	this.oceanAppearance.setDiffuse(0.7,1,0.7,1);
	this.oceanAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.oceanAppearance.setShininess(120);
	this.oceanAppearance.loadTexture("../resources/images/ocean.jpg");
	this.oceanAppearance.setTextureWrap("MIRRORED_REPEAT", "MIRORRED_REPEAT");
	
	this.setUpdatePeriod(1);
	
	this.currSubmarineAppearance = 0;
	this.submarineAppearanceList = {'steel': 0, 'artsy': 1, 'cage': 2, 'poolball': 3};
	
};


LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.7,0.7,0.7, 1.0);
	
	// Positions for four lights
	//light 0
	this.lights[0].setPosition(4, 6, 3, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[0].setDiffuse(0.7, 0.7,0.7, 1.0);
	this.lights[0].setConstantAttenuation(0);
	this.lights[0].setLinearAttenuation(0.15);
	this.lights[0].setQuadraticAttenuation(0);
	this.lights[0].enable();
	
	//light 1
	this.lights[1].setPosition(-4, 6, 3, 1);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[1].setDiffuse(0.7, 0.7,0.7, 1.0);
	this.lights[1].setConstantAttenuation(0);
	this.lights[1].setLinearAttenuation(0.15);
	this.lights[1].setQuadraticAttenuation(0);
	this.lights[1].enable();
	
};

LightingScene.prototype.updateLights = function() {
	
	if(this.light0 == true)
		this.lights[0].enable();
	else if(this.light0 == false)
		this.lights[0].disable();
	
	if(this.light1 == true)
		this.lights[1].enable();
	else if(this.light1 == false)
		this.lights[1].disable();	


	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}
		
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	this.materialDefault.apply();
	// Draw axis
	this.axis.display();

	// Update all lights used
	this.updateLights();
	
	this.scale(2,2,2);
	
	this.pushMatrix(); 
		this.reckAppearance.apply();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(1, 1, 8);
	this.popMatrix();

	this.pushMatrix();
		this.cleckAppearance.apply();
		this.scale(0.7,0.7,1)
		this.translate(8/0.7,5/0.7,0);
		this.cleck.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8,0,0);
		this.scale(0.1,5,0.1);
		this.rotate(Math.PI /2, -1,0,0);
		this.reckAppearance.apply();
		this.post.display();
	this.popMatrix();
	
	this.pushMatrix();
		this.oceanAppearance.apply();
		this.translate(0,-4,0);
		this.scale(50,1,50);
		this.rotate(Math.PI /2, -1,0,0);
		this.oceanFloor.display();
	this.popMatrix();

	//Targets
	this.pushMatrix();
		this.targets[0].display();
		this.targets[1].display();
	this.popMatrix();
	
	
	
	//Sub

	this.pushMatrix();
		this.materialDefault.apply();
		this.translate(this.submarine.posX,this.submarine.posY,
		this.submarine.posZ);
		this.submarine.swim();
		var time = Date.now();
		this.submarine.turbinesRotation(time);
	
		this.pushMatrix();
		    this.submarine.display();
		this.popMatrix();
	
		this.translate(0,0,5);
		this.scale(3,.1,1);
	this.popMatrix();
	
	

	//Torpedo
	if(this.launch){
		this.torpedo.readyToFire();
		this.torpedo.display();
	}

	//this.torpedo = new MyTorpedo(this, 0,0,0,0,0);
	//this.torpedo.display();
	
	//this.popMatrix();
	
	// ---- END Background, camera and axis setup
	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section

	// ---- BEGIN Primitive drawing section
	
	// ---- END Primitive drawing section
};



LightingScene.prototype.update = function(currentTime) {
	if(this.run){
		var hourAngle = 30*(1+(currentTime/3600000)%(12));
		var minAngle = 6*((currentTime/(60000))%(60));
		var secAngle = 360*(((currentTime/1000)%60)/60);
		MyClock(this,hourAngle, minAngle, secAngle);
	}
	//this.torpedo.updatePosition(this.submarine.x, this.submarine.y, this.submarine.z);
	this.torpedo.update(currentTime);
	
};

LightingScene.prototype.clock = function() {
	this.run = !this.run;
};

LightingScene.prototype.fire = function() {
	this.launch = !this.launch;
	this.torpedo = new MyTorpedo(this, this.submarine.posX, 
	 this.submarine.posY-.8, this.submarine.posZ, 
	  this.submarine.rotY, this.submarine.currVertRot);

};









