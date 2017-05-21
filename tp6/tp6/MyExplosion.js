/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x,y,z) {
 	CGFobject.call(this,scene);

	this.posX = x;
	this.posY = y;
	this.posZ = z;
	
	this.explosionSphere = new MySphere(scene, 20,20);
	this.currExplosionScale = 0;
	this.isExpanding = true;
	this.startsDecreasing = 0;

 	this.initBuffers();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.display = function() {
 	//this.explosionSphere.display();
 	//this.scene.translate(this.posX, this.posY, this.posZ);
	this.scene.scale(this.currExplosionScale, this.currExplosionScale, this.currExplosionScale);
	this.explosionSphere.display();
	this.scene.rotate(Math.PI,0,1,0);
	this.explosionSphere.display();

	if (this.isExpanding == 1) {
		this.currExplosionScale = this.currExplosionScale + (7 - this.currExplosionScale)/20;
		if (this.currExplosionScale > 6.98) {
			this.isExpanding = 0;
		}
	}
	else {
		this.startsDecreasing = this.startsDecreasing + (7 - 1/this.currExplosionScale)/130;
		this.currExplosionScale = this.currExplosionScale - this.startsDecreasing;
		if (this.currExplosionScale <= 0.001)
			this.scene.exploded = false;
	}
		

};