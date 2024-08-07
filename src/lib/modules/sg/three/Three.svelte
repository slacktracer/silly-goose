<script lang="ts">
  import { onMount } from "svelte";
  import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from "three";

  import { getMainEventBus } from "../../core/get-main-event-bus.js";
  import { startTicking } from "../../core/start-ticking.js";
  import { makeCube } from "./make-cube.js";
  import { makeGrid } from "./make-grid.js";
  import { resizeHandler } from "./resize-handler.js";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const mainEventBus = getMainEventBus();

    const renderer = new WebGLRenderer({ antialias: true, canvas });

    const aspect = 2;
    const far = 20;
    const fov = 75;
    const near = 1;

    const camera = new PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 5, 5);

    // camera.lookAt(0, 0, 0);
    camera.rotation.x = -0.7853981633974484;

    const scene = new Scene();

    const boxDepth = 1;
    const boxHeight = 1;
    const boxWidth = 1;
    const color = 0xffffff;

    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
    const intensity = 3;

    const ambientLight = new AmbientLight(0xffffff, 0.5);

    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(color, intensity);

    directionalLight.position.set(-1, 2, 4);

    scene.add(directionalLight);

    const cubes = [
      makeCube({ color: 0x44aa88, geometry, x: 0 }),
      makeCube({ color: 0x8844aa, geometry, x: -2 }),
      makeCube({ color: 0xaa8844, geometry, x: 2 }),
    ];

    cubes.forEach((cube) => {
      scene.add(cube);
    });

    const grid = makeGrid();

    scene.add(grid);

    startTicking({ eventBus: mainEventBus });

    mainEventBus.on("tick", (/*event*/) => {
      resizeHandler({ camera, renderer });

      const time = event.detail * 0.001;

      // go
      cubes.forEach((cube, index) => {
        const speed = 1 + index * 0.1;
        const rotate = time * speed;
        cube.position.z -= 0.01;
        cube.rotation.x = rotate;
        cube.rotation.y = rotate - 1;
      });

      renderer.render(scene, camera);
    });
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    height: 100dvh;
    width: 100dvw;
  }
</style>
