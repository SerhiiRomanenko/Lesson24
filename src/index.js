//************************FROST-MAN *******************/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawCircle(x, y, radius, filled = false) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawSquare(x, y, z, t, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, z, t);
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//********** BODY ************/
drawCircle(300, 330, 70);
drawCircle(300, 205, 55);
drawCircle(300, 107, 42);

//********** BUTTONS **********/
ctx.strokeStyle = 'black';
drawCircle(300, 185, 5, true);
drawCircle(300, 220, 5, true);
drawCircle(300, 295, 5, true);

//********** HANDS **********/
ctx.lineWidth = 6;
drawLine(202, 220, 270, 160);
drawLine(392, 220, 330, 160);

// ********** FOOTS **********/
ctx.lineWidth = 1;
drawCircle(240, 387, 12);
drawCircle(360, 387, 12);

//********** FACE ************/
ctx.lineWidth = 1;
drawSquare(269, 12, 60, 65);
ctx.fillStyle = '#123d';
drawCircle(285, 94, 6, true);
drawCircle(310, 94, 6, true);

//********** NOSE *********/
ctx.fillStyle = 'orange';
ctx.beginPath();
ctx.moveTo(300, 100);
ctx.lineTo(240, 115);
ctx.lineTo(300, 120);
ctx.lineTo(300, 100);
ctx.fill();

//********** MOUSE *********/
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.arc(300, 127, 12, 0, Math.PI);
ctx.fill();

//********** BROOM *********/
ctx.lineWidth = 9;
drawLine(202, 140, 202, 400);
ctx.lineWidth = 3;
drawLine(180, 90, 203, 146);
drawLine(190, 90, 203, 143);
drawLine(200, 90, 203, 143);
drawLine(210, 90, 203, 143);
drawLine(220, 90, 203, 143);

//************************ CORE *******************/

const scene = new THREE.Scene(); // создаем сцену
const fov = 70; // указываем угол обзора (обычно)
const aspectRatio = window.innerWidth / window.innerHeight; // чтобы на всю ширину и всю высоту
const near = 0.1; // указываем минимальную т.
const far = 1000; // указываем максимальную т.
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far); // камера
camera.position.z = 20; //смещаем камеру

const renderer = new THREE.WebGLRenderer({ antialias: true }); // создаем рендерер (antialias: true -> сглаживает линии)
renderer.setSize(window.innerWidth, window.innerHeight); // тоже чтобы на всю ширину и всю высоту
renderer.setClearColor('#ccc'); // устанавливаем цвет фона сцены
document.body.append(renderer.domElement); // добавляем в боди как дом елемент

const geometry = new THREE.ConeGeometry(
    (radius = 1),
    (height = 2),
    (radialSegments = 8),
    (heightSegments = 1),
    (openEnded = false),
    (thetaStart = 0),
    (thetaLength = Math.PI * 2)
); // создаем обьект (набор вершин -> строится обьект)
const material = new THREE.MeshPhongMaterial({ color: 'yellow' }); // создаем материал нашего обьекта
const cone = new THREE.Mesh(geometry, material); // создаем сущность конус
cone.scale.set(7, 7, 7);
scene.add(cone); // добавляем на сцену конус

const pointLight = new THREE.PointLight(0xff0000, 1, 100); // создаю свет (выбрал другой => смотреть документацию)
pointLight.position.set(2, 5, 10); // устанавливаю точку размещения света
scene.add(pointLight); // добавляю на сцену

// создаем функцию для вращения обьекта
function animate() {
    requestAnimationFrame(animate); // 8-работа
    renderer.render(scene, camera); // рендерим сцену и камеру (уже есть результат)
    cone.rotation.z += 0.01; // смещаем позицию куба по оси *** на ***
    cone.rotation.y += 0.02; // смещаем позицию куба по оси *** на ***
    cone.rotation.x += 0.01; // смещаем позицию куба по оси *** на ***
}

animate();
