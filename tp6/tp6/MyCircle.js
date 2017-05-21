/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {
 	var theta = Math.PI*2/this.slices;
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];

	this.vertices.push(0,0,0.2);
	this.texCoords.push(0.5,0.5);
	this.normals.push(0,0,1);	
	var j = 1;
	for(i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), 0.2);
		this.normals.push(0,0,0.2);	
		this.texCoords.push((Math.cos(i*theta)+1)/2, (Math.sin(i*theta)-1)/-2);
	}
	this.indices = [];
	var i;
	for(i = 1; i < this.slices; i++)
	{
		this.indices.push(0, i, i+1);
	}
	this.indices.push(0,this.slices, 1);


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
