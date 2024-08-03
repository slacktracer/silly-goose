<script lang="ts">
  import { onMount } from "svelte";
  import {
    BoxGeometry,
    DirectionalLight,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from "three";

  import { getMainEventBus } from "../../core/get-main-event-bus.js";
  import { startTicking } from "../../core/start-ticking.js";
  import { makeCube } from "./make-cube.js";
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

    camera.position.z = 3;

    const scene = new Scene();

    const boxDepth = 0.05;
    const boxHeight = 1;
    const boxWidth = 1;
    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    const color = 0xffffff;
    const intensity = 3;
    const light = new DirectionalLight(color, intensity);

    light.position.set(-1, 2, 4);

    scene.add(light);

    const cubes = [
      makeCube({ color: 0x44aa88, geometry, x: 0 }),
      makeCube({ color: 0x8844aa, geometry, x: -2 }),
      makeCube({ color: 0xaa8844, geometry, x: 2 }),
    ];

    cubes.forEach((cube) => {
      scene.add(cube);
    });

    startTicking({ eventBus: mainEventBus });

    mainEventBus.on("tick", (event) => {
      const time = event.detail * 0.001;

      resizeHandler({ camera, renderer });

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;

        const rot = (time / 2) * speed;

        cube.rotation.x = rot;
        cube.rotation.y = rot - 1;
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
