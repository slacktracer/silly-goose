uniform float uGridSize;
uniform float uDivisions;
varying vec2 vUv;

float gridLine(vec2 pos, float width) {
    vec2 grid = abs(fract(pos - 0.5) - 0.5) / fwidth(pos);
    return 1.0 - min(min(grid.x, grid.y), 1.0);
}

void main() {
    vec2 pos = vUv * uGridSize * uDivisions;

    float majorGrid = gridLine(pos / uDivisions, 1.0) * 0.5;
    float minorGrid = gridLine(pos, 1.0) * 0.15;

    float grid = max(majorGrid, minorGrid);

    gl_FragColor = vec4(vec3(1.0), grid);
}
