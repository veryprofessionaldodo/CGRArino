/**
 * MySphere
 * @constructor
 */
 function MySphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {
 	var theta = Math.PI*2/this.slices;
	var alfa = (Math.PI/2)/(this.stacks);
	var finalvertex = 0;
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];
	for(var i = 0; i < this.slices; i++)
	{
		this.vertices.push(Math.cos(i*theta), Math.sin(i*theta), 0);
  		this.normals.push(Math.cos(i*theta), Math.sin(i*theta),0);
  		this.texCoords.push(i/this.slices, i/this.slices);
		finalvertex++;
	}
	var final = 0;
	var height = 0;
	for (var j = 0; j < this.stacks+1; j++) {
		height = Math.sin(j*alfa);
		for(var i = 0; i < this.slices; i++)
 		{
 			this.vertices.push(Math.cos(i*theta)*Math.cos(j*alfa), Math.sin(i*theta)*Math.cos(j*alfa), height);
  			this.normals.push(Math.cos(i*theta)*Math.cos(j*alfa), Math.sin(i*theta)*Math.cos(j*alfa),Math.sin(j*alfa));
  			this.texCoords.push((i+1)/this.slices,j/this.stacks);
			finalvertex++;

 		}
 		final = i;
	}

	this.vertices.push(0,0,1);
  	this.normals.push(0,0,1);
  	finalvertex++;


 	this.indices = [];
 	var final;
	for(var i = 0; i < this.slices * (this.stacks+1) ; i++)
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

  	// Ultimo verice
	for (var i = 0; i < this.slices ; i++) {
	//	this.indices.push(finalvertex, i, i+1);

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
