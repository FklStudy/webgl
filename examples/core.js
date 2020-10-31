// 依赖于gl-matrix计算功能

//  初始化着色器程序，让WebGL知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    // 创建着色器程序
    let shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram);
    // 创建失败， alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('无法初始化着色器程序: ' + gl.getProgramInfoLog(shaderProgram))
        return null
    }
    return shaderProgram
}

// 创建指定类型的着色器，上传source源码并编译
function loadShader(gl, type, source) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('编译着色器失败: ' + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}

function getProjectionMatrix(fieldOfView, aspect, zNear, zFar) {
    let projectionMatrix = glMatrix.mat4.create();
    // 场景转化
    glMatrix.mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);
    return projectionMatrix
}


// 位置移动
function translateModelViewMatrix(modelViewMatrix, vector) {
    glMatrix.mat4.translate(modelViewMatrix,     // 结果矩阵
        modelViewMatrix,     // 当前矩阵
        vector);  // 移动向量
    return modelViewMatrix
}

// 旋转
// squareRotation 旋转角
// vector:[0, 0, 1]旋转轴
function rotateModelViewMatrix(modelViewMatrix,squareRotation,vector){
    glMatrix.mat4.rotate(
        modelViewMatrix,modelViewMatrix,squareRotation,vector
    )
    return modelViewMatrix
}


function initBuffers(gl, bufferType, vertices) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer)
    gl.bufferData(bufferType,
        new Float32Array(vertices),
        gl.STATIC_DRAW)
    return buffer
}

function initElementBuffers(gl, bufferType, vertices) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer)
    gl.bufferData(bufferType,
        new Uint16Array(vertices),
        gl.STATIC_DRAW)
    return buffer
}