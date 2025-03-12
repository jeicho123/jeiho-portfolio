import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ 
    color: localStorage.getItem('light') === 'active' ? "#5481e8" : "#6a923f", 
    transparent: true, 
    opacity: 0.5 
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: localStorage.getItem('light') === 'active' ? 0x000000 : 0xffffff }));

document.getElementById("theme-switch").addEventListener("click", function() {
    mesh.material.color.set(localStorage.getItem('light') === 'active' ? "#5481e8" : "#6a923f");
    line.material.color.set(localStorage.getItem('light') === 'active' ? 0x000000 : 0xffffff);
});

const group = new THREE.Group();
group.add(mesh);
group.add(line);
scene.add(group);


const sizes = {
    width: document.querySelector('body').clientWidth,
    height: Math.max(250, window.innerHeight - document.querySelector('.webgl').getBoundingClientRect().top)
}

window.addEventListener('resize', () => {
    sizes.width = document.querySelector('body').clientWidth
    sizes.height = Math.max(250, window.innerHeight - document.querySelector('.webgl').getBoundingClientRect().top)

    renderer.setSize(sizes.width, sizes.height)

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2.5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableZoom = false
controls.enablePan = false
controls.update()


const clock = new THREE.Clock()
const tick = () => 

{
    requestAnimationFrame( tick );
    
    const elapsedTime = clock.getElapsedTime()

    group.rotation.y = elapsedTime


	controls.update();

	renderer.render( scene, camera );

}

tick()