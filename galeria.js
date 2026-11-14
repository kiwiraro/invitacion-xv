

const cube = document.getElementById("cube");
const toggle = document.getElementById("toggle");
const dots = [...document.querySelectorAll(".dot")];
const faces = [...document.querySelectorAll(".face")];

const totalFotos = 36;
const fotosPorTurno = 6;
const totalTurnos = totalFotos / fotosPorTurno;

let index = 0;
let turno = 0;
let playing = true;

// Orientaciones para los controles manuales.
// Se conservan los cuatro indicadores originales.
const rotations = [
  "rotateX(0deg) rotateY(0deg)",
  "rotateX(0deg) rotateY(-90deg)",
  "rotateX(0deg) rotateY(-180deg)",
  "rotateX(0deg) rotateY(-270deg)"
];

// Genera las rutas locales: imagenes/foto1.jpg ... foto24.jpg
const fotografias = Array.from({ length: totalFotos }, (_, i) => ({
  src: `imagenes/foto${i + 1}.jpeg`,
  alt: `Fotografía ${i + 1}`,
  titulo: `Recuerdo ${i + 1}`
}));

function cargarTurno() {
  const inicio = turno * fotosPorTurno;

  faces.forEach((face, i) => {
    const foto = fotografias[inicio + i];
    const img = face.querySelector("img");
    const caption = face.querySelector("figcaption");

    img.src = foto.src;
    img.alt = foto.alt;

    caption.innerHTML =
      `<small>Mis XV Años</small>${foto.titulo}`;
  });

  console.log(`Turno ${turno + 1} de ${totalTurnos}`);
}

function actualizarIndicadores() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function showFace(nextIndex) {
  index = (nextIndex + rotations.length) % rotations.length;

  cube.classList.remove("autoplay");
  cube.style.transform = rotations[index];

  actualizarIndicadores();
}

function setPlaying(value) {
  playing = value;

  toggle.textContent = playing
    ? "Pausar giro"
    : "Reanudar giro";

  if (playing) {
    cube.style.transform = "";
    cube.classList.add("autoplay");
  } else {
    cube.classList.remove("autoplay");
    cube.style.transform = rotations[index];
  }
}

// Cambia de grupo al terminar un ciclo completo de la animación CSS.
cube.addEventListener("animationiteration", (event) => {
  if (event.target !== cube || !playing) return;

  turno = (turno + 1) % totalTurnos;
  cargarTurno();
});

// Controles de giro manual.
document.getElementById("prev").addEventListener("click", () => {
  setPlaying(false);
  showFace(index - 1);
});

document.getElementById("next").addEventListener("click", () => {
  setPlaying(false);
  showFace(index + 1);
});

// Pausar y reanudar la animación original.
toggle.addEventListener("click", () => {
  setPlaying(!playing);
});

// Indicadores de las cuatro orientaciones.
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    setPlaying(false);
    showFace(Number(dot.dataset.index));
  });
});

// Iniciar con las primeras seis fotografías.
cargarTurno();
actualizarIndicadores();
