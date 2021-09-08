const hiddenInp = document.querySelector("#inp");
const click = document.querySelector("#click");

function handleClick(_e) {
    var target = _e.target;
    hiddenInp.click();
}

var res = null;

function handleRange(_e) {
    if(res) {
        convert(res, +_e.target.value);
    } else {
        alert("Upload your photo.");
    }
}

var int = false;
function toggle() {
    toggle = !toggle;
    if(res) {
        convert(res, +document.querySelector("#range").value, toggle); 
    } else {
        alert("Upload your photo.");
    }
}

function convert(_img, size = 10, colorize = true) {
    const config = {
        image: _img,
        returnValue: "base64",
        size: size,
        colorize: colorize
    };
    const converted = convertToASCII(config);
    const ascii_image = new Image();
    ascii_image.src = converted;
    click.innerHTML = "";
    click.appendChild(ascii_image);
}

function handleFiles(_e) {
    const files = _e.target.files;
    if (files[0]) {
        const content = new Blob([files[0]], {
            type: files[0].type
        });
        const url = URL.createObjectURL(content);
        click.innerHTML = "";
        const img = new Image();
        img.src = url;
        img.onload = function () {
            img.style.width = "50%";
            img.style.height = "auto";
            convert(img);
            res = img;
        }
    }
}

document.querySelector("#toggle").addEventListener("click", toggle);
document.querySelector("#range").addEventListener("input", handleRange);
click.addEventListener("click", handleClick);
hiddenInp.addEventListener("change", handleFiles);