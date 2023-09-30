function main() {
    var canvas = document.getElementById("aryansfw");

    /** @type {WebGL2RenderingContext} */
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.55,
        0.1,
        -0.44,
        0.1,
        -0.4,
        0.06,
        -0.4,
        -0.06,
        -0.44,
        -0.1,
        -0.55,
        -0.1, // D Inside

        -0.65,
        0.2,
        -0.4,
        0.2,
        -0.3,
        0.1,
        -0.3,
        -0.1,
        -0.4,
        -0.2,
        -0.65,
        -0.2, // D

        -0.15,
        0.2,
        0.15,
        0.2,
        0.15,
        0.1,
        -0.05,
        0.1,
        -0.05,
        0.05,
        0.15,
        0.05,
        0.15,
        -0.05,
        -0.05,
        -0.05,
        -0.05,
        -0.1,
        0.15,
        -0.1,
        0.15,
        -0.2,
        -0.15,
        -0.2, // E

        0.3,
        0.2,
        0.4,
        0.2,
        0.45,
        0.0,
        0.5,
        0.2,
        0.6,
        0.2,
        0.65,
        0.0,
        0.7,
        0.2,
        0.8,
        0.2,
        0.7,
        -0.2,
        0.6,
        -0.2,
        0.55,
        0.0,
        0.5,
        -0.2,
        0.4,
        -0.2, // W
    ];

    var vertexShaderCode = `
    attribute vec2 aposition;
        void main() {
            gl_Position = vec4(aposition, 0.0, 1.0);
            gl_PointSize = 5.0;
        }
    `;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aposition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 6);
    gl.drawArrays(gl.LINE_LOOP, 6, 6);
    gl.drawArrays(gl.LINE_LOOP, 12, 12);
    gl.drawArrays(gl.LINE_LOOP, 24, 13);
}
