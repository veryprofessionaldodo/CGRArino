var hourAngle, minuteAngle, secAngle;

function MyClock(scene,ang1, ang2, ang3) {
 	CGFobject.call(this,scene);
 	hourAngle = ang1;
 	minuteAngle = ang2;
 	secAngle = ang3;
 	this.cylinder = new MyCylinder(this.scene,12,1);
 	this.circle = new MyCircle(this.scene, 12);	
	this.cleckHand = new MyClockHand(this.scene);
	
 };


 
MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyTable;

MyClock.prototype.display = function() {	
	this.circle.display();
	this.scene.scale(1,1,0.2);
	this.scene.reckAppearance.apply();
	this.cylinder.display();

//MINUTOS
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.handAppearance.apply();
		this.cleckHand.setAngle(minuteAngle);
		this.scene.scale(0.7,0.5,1);
		this.scene.translate(0.5,0,1);
		this.cleckHand.display();
	this.scene.popMatrix();
	//HORAS
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.handAppearance.apply();
		this.cleckHand.setAngle(hourAngle);
		this.scene.scale(0.5,0.8,1);
		this.scene.translate(0.5,0,1);
		this.cleckHand.display();
	this.scene.popMatrix();
	//SEGUNDOS
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.hand2Appearance.apply();
		this.cleckHand.setAngle(secAngle);
		this.scene.scale(0.9,.2,1);
		this.scene.translate(0.5,0,1.1);
		this.cleckHand.display();
	this.scene.popMatrix();
	 	
 };

