import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

import gridFragmentShader from "./grid-fragment-shader.glsl";
import gridVertexShader from "./grid-vertex-shader.glsl";

export const makeGrid = () => {
  const gridSize = 10;
  const gridDivisions = 3;

  const gridShaderMaterial = new ShaderMaterial({
    fragmentShader: gridFragmentShader,
    transparent: true,
    uniforms: {
      uDivisions: { value: gridDivisions },
      uGridSize: { value: gridSize },
    },
    vertexShader: gridVertexShader,
  });

  const gridGeometry = new PlaneGeometry(gridSize, gridSize);

  const gridMesh = new Mesh(gridGeometry, gridShaderMaterial);

  gridMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat

  return gridMesh;
};
