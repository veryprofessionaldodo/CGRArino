/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	var theta = Math.PI*2/this.slices;
	this.vertices = [];
	this.normals = [];
 	for(var i = 0; i < this.slices; i++)
 	{
		this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), 0);
		this.vertices.push(Math.cos((i+1)*theta), Math.sin((i+1)*theta), 0);
		this.normals.push(Math.cos((i+1)*theta+theta/2), Math.sin((i+1)*theta+theta/2), 0);
		this.normals.push(Math.cos((i+1)*theta+theta/2), Math.sin((i+1)*theta+theta/2), 0);
 	}
 	var height = 0;
	for (var j = 0; j < this.stacks ; j++) {
		height += 1 / this.stacks;
 		for(var i = 0; i < this.slices; i++)
 		{
 			this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), height);
			this.vertices.push(Math.cos((i+1)*theta), Math.sin((i+1)*theta), height);

			this.normals.push(Math.cos((i+1)*theta+theta/2), Math.sin((i+1)*theta+theta/2), height);
			this.normals.push(Math.cos((i+1)*theta+theta/2), Math.sin((i+1)*theta+theta/2), height);
 		}
	}
 	height = 0;
 	this.indices = [];

 		for(var i = 0; i < 2 * this.stacks * this.slices; i = i+2)
 		{
			this.indices.push(i,i+1,i+this.slices*2);
			this.indices.push(i+this.slices*2+1,i+this.slices*2,i+1);
		}

	
 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
