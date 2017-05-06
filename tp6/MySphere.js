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
 	var theta = 2*Math.PI/this.slices;
 	var alfa = Math.PI/(2*this.stacks);

 	this.vertices = [];
 	this.texCoords = [];
 	for(var j = 0; j <= this.stacks; j++){
		for (var i = 0; i < this.slices; i++) {			
			this.vertices.push(Math.sin(j*alfa)*Math.cos(i*theta), Math.sin(j*alfa)*Math.sin(i*theta), Math.cos(j*alfa));
			this.texCoords.push(0.5*(Math.sin(j*alfa)*Math.cos(i*theta))+.5, 0.5*(Math.sin(j*alfa)*Math.sin(i*theta))+.5);
		}
	}
	
 	this.indices = [];
	for(var j = 0; j < this.stacks; j++){
		for (var i = 0; i < this.slices; i++) {
		 	var tmp = i + j*this.slices;
		 	if(i != this.slices-1){
		 		this.indices.push(tmp+this.slices, tmp+1, tmp);
 				this.indices.push(tmp+1, tmp+this.slices, tmp+this.slices+1);
 			}
 			else{
 				this.indices.push(tmp+this.slices,j*this.slices, tmp);
 				this.indices.push(j*this.slices,tmp+this.slices,(j+1)*this.slices);
 			}
		}
	}

 	this.normals = [];
 	for(var j = 0; j <= this.stacks; j++){
		for (var i = 0; i < this.slices; i++) {
			this.normals.push(Math.sin(j*alfa)*Math.cos(i*theta), Math.sin(j*alfa)*Math.sin(i*theta), Math.cos(j*alfa));
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };