<script lang="ts">
  import { onMount } from "svelte";
  import {
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from "three";

  import { mainEventBus } from "../core/main-event-bus";
  import { startTicking } from "../core/start-ticking.js";

  let canvas: HTMLCanvasElement;

  const makeInstance = ({ color, geometry, x }) => {
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);

    cube.position.x = x;

    return cube;
  };

  const handleResizing = ({ camera, renderer }) => {
    const canvas = renderer.domElement;

    const pixelRatio = window.devicePixelRatio;

    // const height = canvas.clientHeight;
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    // const width = canvas.clientWidth;
    const width = Math.floor(canvas.clientWidth * pixelRatio);

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);

      const canvas = renderer.domElement;

      camera.aspect = canvas.clientWidth / canvas.clientHeight;

      camera.updateProjectionMatrix();
    }
  };

  onMount(() => {
    if (mainEventBus) {
      const renderer = new WebGLRenderer({ antialias: true, canvas });

      const aspect = 2;
      const far = 20;
      const fov = 75;
      const near = 1;

      const camera = new PerspectiveCamera(fov, aspect, near, far);

      camera.position.z = 3;

      const scene = new Scene();

      const boxDepth = 1;
      const boxHeight = 1;
      const boxWidth = 1;
      const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

      const color = 0xffffff;
      const intensity = 3;
      const light = new DirectionalLight(color, intensity);

      light.position.set(-1, 2, 4);

      scene.add(light);

      const cubes = [
        makeInstance({ color: 0x44aa88, geometry, x: 0 }),
        makeInstance({ color: 0x8844aa, geometry, x: -2 }),
        makeInstance({ color: 0xaa8844, geometry, x: 2 }),
      ];

      cubes.forEach((cube) => {
        scene.add(cube);
      });

      startTicking({ eventBus: mainEventBus });

      mainEventBus.on("tick", (event) => {
        const time = event.detail * 0.001;

        handleResizing({ camera, renderer });

        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * 0.1;

          const rot = (time / 5) * speed;

          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });

        renderer.render(scene, camera);
      });
    }
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
