import type { BoxGeometry } from "three";
import { Mesh, MeshPhongMaterial } from "three";

export const makeCube = ({
  color,
  geometry,
  x,
}: {
  color: number;
  geometry: BoxGeometry;
  x: number;
}) => {
  const material = new MeshPhongMaterial({ color });

  const cube = new Mesh(geometry, material);

  cube.position.x = x;

  return cube;
};
