    //  初始化着色器程序，让WebGL知道如何绘制我们的数据
    function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
        // 创建着色器程序
        const shaderProgram = gl.createProgram()
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
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('编译着色器失败: ' + gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)
            return null
        }
        return shader
    }