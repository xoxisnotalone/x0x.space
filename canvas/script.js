const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const reader = new FileReader();
const img = new Image();

const uploadImage = (e) => {
  console.log("change");
  reader.onload = () => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);

function download() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}

document.querySelector("button").addEventListener("click", download);
function findPos(obj) {
  var curleft = 0,
    curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return { x: curleft, y: curtop };
  }
  return undefined;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
  return `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`;
}
$(canvas).mousemove(function (e) {
  var pos = findPos(this);
      var x = e.pageX - pos.x;
      var y = e.pageY - pos.y;
      var coord = "x=" + x + ", y=" + y;
  var c = this.getContext("2d");
  var p = c.getImageData(x, y, 1, 1).data;
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  $("#status").html(coord + "<br>" + hex);
});
