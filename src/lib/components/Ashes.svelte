<script>
    import { onMount } from 'svelte';

    // @ts-ignore
    const incr =  ((n) => () => n < .7 ? n = 0.00008  + n : n)(0);
  
    /**
	 * @type {HTMLDivElement}
	 */
    let canvascontainer;
    /**
	 * @type {HTMLCanvasElement}
	 */
    let mainCanvas;
    /**
	 * @type {HTMLCanvasElement}
	 */
    let bufferCanvas;
  
    onMount(() => {
      // Adjusting code to use the locally referenced elements:
      const cntr = canvascontainer;
      const W = cntr.offsetWidth;
      const H = cntr.offsetHeight;
      
      const canvas = [mainCanvas, bufferCanvas];
      const ctxs = [canvas[0].getContext("2d"), canvas[1].getContext("2d")];
      let C = 0;
      let angle = 0;
      // @ts-ignore
      let A = [];
  
      //Get random int between two numbers
      /**
		 * @param {number} from
		 * @param {number} to
		 * @param {number | undefined} [seed]
		 */
      function randomRange(from, to, seed) { 
        return Math.floor((seed ? seed : Math.random()) * (to - from + 1) + from); 
      }
  
      /**
		 * @param {{ y?: any; a: any; d?: any; dp: any; x?: any; } | undefined} [o]
		 */
      function ash(o) {
        var i, j,
            m = Math.random(),
            p = randomRange(4, 8, m);
  
        if(o && o.x) this.x = o.x; else this.x = m * W;
        if(o && o.y) this.y = o.y; else this.y = m * H;
        if(o && o.a) this.a = o.a; else this.a = m * (p - 4) + 1;
  
        this.r = randomRange(233, 255, m);
        this.g = randomRange(181, 192, m);
        this.b = randomRange(72, 88, m);
  
        if(o && o.dp) this.dp = o.dp;
        else {
          this.dp = [{x:0,y:0}];
          for(i = 0; i < p; i++) {
            j = (i == 0 || p/2 > i ? 1 : -1) ;
            this.dp.push({
              x: this.dp[i].x+(randomRange(5, 30)*j), 
              y: this.dp[i].y+(randomRange(5, 30)*j)});
          }
        }
      }
  
      function draw() {
        var grad, i, j, p, ctx;
        if(C == 0) {
          //Show the mainCanvas
          canvas[0].style.visibility = "visible";
          canvas[1].style.visibility = "hidden";
          C = 1;
        } else {
          //Show the bufferCanvas
          canvas[1].style.visibility = "visible";
          canvas[0].style.visibility = "hidden";
          C = 0;
        }
  
        ctx = ctxs[C];
        // @ts-ignore
        ctx.clearRect(0, 0, W, H);
  
        for(i = 0; i < A.length; i++) {
          // @ts-ignore
          p = A[i];
          // @ts-ignore
          grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.a);
          grad.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 1)");
          grad.addColorStop(0.9, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + randomRange(1,10)/10 + ")");
          grad.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
  
          // @ts-ignore
          ctx.beginPath();
          // @ts-ignore
          ctx.moveTo(p.x, p.y);
          for(j = 1; j < p.dp.length; j++) 
            // @ts-ignore
            ctx.lineTo(p.x+p.dp[j].x, p.y+p.dp[j].y);
          // @ts-ignore
          ctx.closePath();
          // @ts-ignore
          ctx.fillStyle = grad;
          // @ts-ignore
          ctx.globalAlpha = incr();
          // @ts-ignore
          ctx.fill();
        }
  
        update();
      }
  
      function update() {
        var i, p;
        angle += 0.01;
  
        for(i = 0; i < A.length; i++) {
          // @ts-ignore
          p = A[i];
  
          p.y += Math.cos(angle + A.length) + 1 + p.a/2;
          p.x += Math.sin(angle) * 2;
  
          if(p.x > W+5 || p.x < -5 || p.y > H) {
            if(i % 3 > 0) A[i] = new ash({y: -10, a: p.a, d: p.d, dp: p.dp});
            else {
              //Enter from the left
              if(Math.sin(angle) > 0) A[i] = new ash({x: -5, a: p.a, d: p.d, dp: p.dp});
              //Enter from the right
              else A[i] = new ash({x: W+5, a: p.a, d: p.d, dp: p.dp});
            }
          }
        }
      }
  
      // Initialize
      canvas[0].width = W;
      canvas[0].height = H;
      canvas[1].width = W;
      canvas[1].height = H;
      for(var i = 0; i < 50; i++) A.push(new ash());
  
      // Start the animation loop
      setInterval(draw, 33);
    });
  </script>
  
  <!-- HTML Structure -->
  <div id="canvascontainer" bind:this={canvascontainer}>
    <canvas id="buffer" bind:this={bufferCanvas}></canvas>
    <canvas id="canvas" bind:this={mainCanvas}></canvas>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      background: var(--bg);
      position: relative; /* ensure body can host positioned children */
    }
    
    #canvascontainer {
      position: fixed;   /* or absolute if working inside another container */
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;       /* places it behind other elements */
    }
  
    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translate3d(0,0,0);
    }
  
    #canvascontainer > div {
      position: absolute;
      color: white;
      /* If you want this text to show over the canvas, 
         give it a z-index greater than -1 or move it outside this container */
    }
  </style>