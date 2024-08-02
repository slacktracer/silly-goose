import type { PerspectiveCamera, Renderer } from "three";

export const resizeHandler = ({
  camera,
  renderer,
}: {
  camera: PerspectiveCamera;
  renderer: Renderer;
}) => {
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
