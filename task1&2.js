
function main() {
  	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;

	
	var loc = [];
	loc[0] = 0;
	loc[1] = 0;
	loc[2] = 0;
	var numberOfVertices = initVertices(program, gl,canvas);
	
	render(gl,program,numberOfVertices,loc);
}

function initTransformations(gl, modelMatrix){
	var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');
	gl.uniformMatrix4fv(transformationMatrix, false, flatten(modelMatrix));	

}
function click(ev, gl, canvas, a_Position,program,numberOfVertices){
	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
	// Store the coordinates to g_points array
	var loc = [];
	loc[0] = x;
	loc[1] = y;
	loc[2] = 0;
 	render(gl,program,numberOfVertices,loc);
	
}

function render (gl, program,numberOfVertices,array){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);


	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
		if (u_FragColor < 0) { 
			console.log ("Failed to Get Color"); 
			return;	
		}
	c = 1.0/255;
	
	gl.uniform4f(u_FragColor,c*158 , c*11 ,c*15,1.0 );
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,mvMatrix,array);
	mat4.translate(mvMatrix, mvMatrix, [0.7, 0, 0.0]);
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3 );

	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0.3, 0.0, 0.0]);
		initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();
	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [-0.3, 0.0, 0.0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();

	
	mat4.translate(mvMatrix, mvMatrix, [0,1.4, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,3.14);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPushMatrix();


	mat4.translate(mvMatrix, mvMatrix, [0.3, 0, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();
	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [-0.3, 0, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 4);

	mvPopMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0.7,0.7, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0,1.4, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,3.14);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	gl.uniform4f(u_FragColor,c*66 , c*190 ,c*216,1.0 );

	mat4.translate(mvMatrix, mvMatrix, [0,0.7, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLE_FAN, 3, 4);
	
	gl.uniform4f(u_FragColor,c*65 , c*114 ,c*50,1.0 );
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,mvMatrix,array);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.LINES, 7, 2);

	mvPushMatrix();
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.LINES, 7, 2);
	
		
}

function initVertices(program, gl,canvas){
	var vertices = [-0.1 , -0.1, 0.1, -0.1, 0, 0.1,-0.3,-0.3 ,-0.3,0.3,0.3,0.3,0.3,-0.3,-0.63,0,0.63,0];
	
	var noOfDim = 2;
	var numberOfVertices = vertices.length / noOfDim;
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}
	canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position,program,numberOfVertices);};

	gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);
	
	return numberOfVertices;
}

