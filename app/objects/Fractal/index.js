import * as THREE from 'three';
import { randomFloat } from 'utils/math';
const glsl = require('glslify');
const vertexShader = glsl.file('./shaders/fractal.vs');
const fragmentShader = glsl.file('./shaders/fractal.fs');

export default class Fractal extends THREE.Object3D {
  constructor() {
    super();

    this._points = [];

    this._addKoch();
    this._setupGeometry();
    // this._setupMaterial();
    // this._setupMesh();
  }

  _setupGeometry() {
    console.log(this._points);
    for (let i = 0; i < this._points.length; i += 2) {
      this._makeFace(this._points[i], this._points[i + 1]);
    }
    // this._vertices = new Float32Array(this._points.length);
    //
    // for (let i = 0; i < this._points.length; i++) {
    //   this._vertices[i] = this._points[i];
    // }
    //
    // this._geometry = new THREE.BufferGeometry();
    // this._geometry.addAttribute( 'position', new THREE.BufferAttribute( this._vertices, 3 ) );
  }

  _setupMaterial() {
    this._material = new THREE.ShaderMaterial({
      transparent: true,
      wireframe: true,
      uniforms: {},
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
  }

  _setupMesh() {
    this._mesh = new THREE.Mesh( this._geometry, this._material );
    this.add( this._mesh );
  }

  _makeFace(p))

  _addKoch() {
    const p0 = {
      x: -100,
      y: 0,
    };

    const p1 = {
      x: 100,
      y: 0,
    };

    this._points.push(
      p0.x, p0.y, 0
    );

    // this._points.push(
    //   p0.x, p0.y, -50,
    //   p0.x, p0.y, 0,
    //   p0.x + 100, p0.y, -50,
    //
    //   p0.x + 100, p0.y, -50,
    //   p0.x + 100, p0.y, 0,
    //   p0.x, p0.y, 0,
    // );

    this._koch(p0, p1, 3);

    this._points.push(
      p1.x, p1.y, 0
    );
  }

  _koch(p0, p1, limit) {

    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const unit = dist / 3;
    const angle = Math.atan2(dy, dx);
    const pA = {
      x: p0.x + dx / 3,
      y: p0.y + dy / 3,
    };
    const pC = {
      x: p1.x - dx / 3,
      y: p1.y - dy / 3,
    };
    const pB = {
      x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
      y: pA.y + Math.sin(angle - Math.PI / 3) * unit,
    };

    this._points.push(
      pA.x, pA.y, 0,
      pB.x, pB.y, 0,
      pC.x, pC.y, 0
    );

    if (limit > 0) {
      // this._koch(p0, pA, limit - 1);
      // this._koch(p0, pA, limit - 1);
      // this._koch(p0, pA, limit - 1);
    }
  }

  update() {}
}
