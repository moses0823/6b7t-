import * as THREE
  from "../three/three.module.js";


/* =========================================================
   ELEMENT
========================================================= */

const panorama =
  document.getElementById(
    "panorama"
  );


/* =========================================================
   SCENE
========================================================= */

const scene =
  new THREE.Scene();


/* =========================================================
   CAMERA
========================================================= */

const camera =
  new THREE.PerspectiveCamera(

    60,

    window.innerWidth /
      window.innerHeight,

    0.1,

    1000

  );


camera.position.set(
  0,
  5,
  0
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
  new THREE.WebGLRenderer({

    antialias: true,

    powerPreference:
      "high-performance",

    precision:
      "highp"

  });


/* =========================================================
   PIXEL RATIO
========================================================= */

const pixelRatio =
  Math.min(
    window.devicePixelRatio || 1,
    2.5
  );


renderer.setPixelRatio(
  pixelRatio
);


renderer.setSize(
  window.innerWidth,
  window.innerHeight,
  false
);


/* =========================================================
   COLOR
========================================================= */

renderer.outputColorSpace =
  THREE.SRGBColorSpace;


renderer.toneMapping =
  THREE.NoToneMapping;


renderer.setClearColor(
  0x000000,
  1
);


panorama.appendChild(
  renderer.domElement
);


/* =========================================================
   PANORAMA GEOMETRY
========================================================= */

const PANORAMA_RADIUS = 100;


function createPanoramaGeometry(
  aspect
) {

  const circumference =
    2 *
    Math.PI *
    PANORAMA_RADIUS;


  const height =
    circumference /
    aspect;


  const geometry =
    new THREE.CylinderGeometry(

      PANORAMA_RADIUS,

      PANORAMA_RADIUS,

      height,

      128,

      1,

      true

    );


  return geometry;

}


/* =========================================================
   INITIAL GEOMETRY
========================================================= */

const geometry =
  createPanoramaGeometry(
    5.52
  );


/* =========================================================
   TEXTURE
========================================================= */

const textureLoader =
  new THREE.TextureLoader();


const texture =
  textureLoader.load(
    "./images/background-360.jpg",

    () => {

      console.log(
        "6b7t 360 background loaded"
      );


      const realAspect =
        texture.image.width /
        texture.image.height;


      const newGeometry =
        createPanoramaGeometry(
          realAspect
        );


      sphere.geometry.dispose();


      sphere.geometry =
        newGeometry;

    },

    undefined,

    (error) => {

      console.error(
        "360 background 載入失敗:",
        error
      );

    }

  );


/* =========================================================
   TEXTURE COLOR
========================================================= */

texture.colorSpace =
  THREE.SRGBColorSpace;


/* =========================================================
   TEXTURE QUALITY
========================================================= */

texture.anisotropy =
  renderer
    .capabilities
    .getMaxAnisotropy();


texture.minFilter =
  THREE.LinearMipmapLinearFilter;


texture.magFilter =
  THREE.LinearFilter;


/* =========================================================
   TEXTURE WRAP
========================================================= */

texture.wrapS =
  THREE.ClampToEdgeWrapping;


texture.wrapT =
  THREE.ClampToEdgeWrapping;


/* =========================================================
   MATERIAL
========================================================= */

const material =
  new THREE.MeshBasicMaterial({

    map: texture,

    side: THREE.BackSide

  });


/* =========================================================
   PANORAMA MESH
========================================================= */

const sphere =
  new THREE.Mesh(

    geometry,

    material

  );


scene.add(
  sphere
);


/* =========================================================
   INITIAL ROTATION
========================================================= */

sphere.rotation.y =
  -50;


/* =========================================================
   AUTO ROTATION
========================================================= */

const rotationSpeed =
  0.00003;


/* =========================================================
   ANIMATION
========================================================= */

let lastTime =
  performance.now();


function animate(
  currentTime
) {

  requestAnimationFrame(
    animate
  );


  const delta =
    currentTime -
    lastTime;


  lastTime =
    currentTime;


  sphere.rotation.y +=
    rotationSpeed *
    delta;


  renderer.render(
    scene,
    camera
  );

}


requestAnimationFrame(
  animate
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    const width =
      window.innerWidth;


    const height =
      window.innerHeight;


    camera.aspect =
      width / height;


    camera.updateProjectionMatrix();


    renderer.setPixelRatio(

      Math.min(
        window.devicePixelRatio || 1,
        2.5
      )

    );


    renderer.setSize(
      width,
      height,
      false
    );

  }
);