<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8"> <!-- 设置正确的字符编码为UTF-8，确保能显示中文等字符 -->
  <title>Matrix Rain with Chinese Text</title>
  <style>
    /* 简单的样式，让画布占满整个页面可视区域，可根据实际需求调整 */
    body,
    html {
      margin: 0;
      padding: 0;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  </style>
</head>

<body>
  <canvas id="c"></canvas>
  <script>
    var root = {
      wavecolor: {
        r: 125,
        g: 52,
        b: 253
      },
      rainbowSpeed: 0.5,
      rainbow: true,
      matrixspeed: 50
    };

    var c = document.getElementById("c");
    var ctx = c.getContext("2d");

    var hueFw = false;
    var hue = 0; // 将hue初始值修改为0，避免负数可能带来的一些潜在问题
    // making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    // the characters
    var konkani = "我陈平安，唯有一剑，可搬山，倒海，降妖，镇魔，敕神，摘星，断江，摧城，开天";
    // converting the string into an array of single characters
    var characters = konkani.split("");
    var font_size = 16; // 适当增大字体大小，方便查看，可根据实际需求调整
    var columns = Math.floor(c.width / font_size); // 确保columns为整数，避免坐标计算出现小数问题
    var gradient = ctx.createLinearGradient(0, 10, 0, 200);
    // an array of drops - one per column
    var drops = [];
    // x below is the x coordinate
    // 1 = y-coordinate of the drop (same for every drop initially)
    for (var x = 0; x < columns; x++)
      drops[x] = 1;

    // drawing the characters
    function draw() {
      // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
      // translucent BG to show trail
      ctx.fillStyle = "rgba(0,0,0, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#BBB"; // grey text
      ctx.font = font_size + "px arial";

      // looping over drops
      for (var i = 0; i < drops.length; i++) {
        // background color
        ctx.fillStyle = "rgba(10, 10, 10, 1)";
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size

        if (root.rainbow) {
          hue += (hueFw)? 0.01 : -0.01;
          var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
          var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
          var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
          ctx.fillStyle = 'rgba(' + Math.max(0, Math.min(255, rr)) + ',' + Math.max(0, Math.min(255, rg)) + ',' + Math.max(0, Math.min(255, rb)) + ')';
          // 增加对颜色值的范围限制，确保在0-255之间，避免出现异常颜色值
        } else {
          ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]++;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.95) {
          // 适当调整了重置的概率值，使重置更自然些，可根据实际效果再调整
          drops[i] = 0;
        }
      }
    }

    setInterval(draw, root.matrixspeed);


    function livelyPropertyListener(name, val) {
      switch (name) {
        case "matrixColor":
          root.wavecolor = hexToRgb(val);
          break;
        case "rainBow":
          root.rainbow = val;
          break;
        case "rainbowSpeed":
          root.rainbowSpeed = val / 100;
          break;
      }
    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  </script>
</body>

</html>
