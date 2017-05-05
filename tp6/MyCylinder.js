/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	var theta = Math.PI*2/this.slices;
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];
	var i;
	for(i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), 0);
		this.normals.push(Math.cos(i*theta), Math.sin(i*theta), 0);
		this.texCoords.push((i+1)/(this.slices), (i+1)/(this.slices));
	}	
 	var height = 0;
	for (var j = 0; j < this.stacks ; j++) {
		 		height += 1 / this.stacks;

		for(var i = 0; i < this.slices; i++)
 		{
 			this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), height);
 			this.texCoords.push((i+1)/this.slices,j/this.stacks);
 			this.normals.push(Math.cos(i*theta), Math.sin(i*theta), height);
		}
 	
 
	}
 	height = 0;
 	this.indices = [];
	for(var i = 0; i < this.slices * this.stacks ; i++)
 	{
 		if ((i + 1) % this.slices != 0) {	
 			this.indices.push(i,i+1, i + this.slices);
 			this.indices.push(i+1,i+1+this.slices, i + this.slices);
 		}
 		else {
 			this.indices.push(i, i+1-this.slices, i+this.slices);
 			this.indices.push(i+1-this.slices, i+1, i+this.slices);

 		}
  	}

	
 	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
