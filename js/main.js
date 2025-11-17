// Simple Three.js particle background for hero sections
(function(){
  function initParticles(canvas){
    if(typeof THREE === 'undefined') return;
    const renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true, antialias:true});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50,1,0.1,1000);
    camera.position.z = 100;

    const geometry = new THREE.BufferGeometry();
    const COUNT = 400;
    const positions = new Float32Array(COUNT * 3);
    for(let i=0;i<COUNT;i++){
      positions[i*3] = (Math.random()-0.5) * 200;
      positions[i*3+1] = (Math.random()-0.5) * 100;
      positions[i*3+2] = (Math.random()-0.5) * 200;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));

    const material = new THREE.PointsMaterial({size:2.4,color:0x06b6d4,opacity:0.85,transparent:true});
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize(){
      const w = canvas.clientWidth || canvas.width;
      const h = canvas.clientHeight || canvas.height;
      if(canvas.width !== w || canvas.height !== h){
        renderer.setSize(w,h,false);
        camera.aspect = w/h;
        camera.updateProjectionMatrix();
      }
    }

    let t = 0;
    function animate(){
      t += 0.005;
      points.rotation.y = t * 0.25;
      points.rotation.x = Math.sin(t*0.5) * 0.1;
      points.material.size = 1.8 + Math.sin(t*2)*0.6;
      resize();
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
    // cleanup on removal (not essential here)
  }

  function setup(){
    const canvases = document.querySelectorAll('canvas[data-effect="particles"]');
    canvases.forEach(canvas=>{
      // ensure canvas fills its parent
      canvas.style.width = '100%';
      canvas.style.height = canvas.parentElement ? canvas.parentElement.offsetHeight + 'px' : '400px';
      initParticles(canvas);
      // keep canvas height in sync on resize
      window.addEventListener('resize', ()=>{
        canvas.style.height = canvas.parentElement ? canvas.parentElement.offsetHeight + 'px' : '400px';
      });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
