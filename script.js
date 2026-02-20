var imagenes = [
  'https://picsum.photos/seed/a1/500/330?grayscale',
  'https://picsum.photos/seed/a2/500/330?grayscale',
  'https://picsum.photos/seed/a3/500/330?grayscale',
  'https://picsum.photos/seed/a4/500/330?grayscale',
  'https://picsum.photos/seed/a5/500/330?grayscale',
  'https://picsum.photos/seed/a6/500/330?grayscale',
  'https://picsum.photos/seed/a7/500/330?grayscale',
  'https://picsum.photos/seed/a8/500/330?grayscale',
  'https://picsum.photos/seed/a9/500/330?grayscale'
];

var cuadros = document.querySelectorAll('.pieza');
var imagenVacia = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

function numeroAleatorio(maximo) {
  return Math.floor(Math.random() * maximo);
}

for (var i = 0; i < cuadros.length; i++) {
  var img = cuadros[i].querySelector('img');
  img.src = imagenVacia;

  cuadros[i].addEventListener('mouseenter', function () {
    var imagen = this.querySelector('img');
    var posicion = numeroAleatorio(imagenes.length);
    imagen.src = imagenes[posicion];
    this.classList.add('activa');
  });
}
