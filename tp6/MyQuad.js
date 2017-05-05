/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var minS, maxS, minT, maxT;

function MyQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	
	this.texCoords = [
		this.maxS,this.minT,
		this.maxS,this.maxT,
		this.minS,this.maxT,
		this.minS,this.minT
	];

	this.vertices = [
          	0.5,0.5,0.5, 
			0.5,-0.5,0.5,
			-0.5,-0.5,0.5,
			-0.5,0.5,0.5,
           ];

	this.indices = [
           0,3,2,
           2,1,0,
			
        ];

        this.normals = [
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1

        ]
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
