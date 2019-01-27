const button = document.getElementById('trace-button');
const input = document.getElementById('trace-input');
const output = document.getElementById('trace-output');

button.onclick = () => {
    alert('Raytracer is not ready yet');
};

import('./rtlib')
    .then(rtlib => {
        button.onclick = () => {
            try {
                let arr = rtlib.trace_wasm(input.value);
                console.log(arr);
                let blob = new Blob([arr.buffer], { type: "image/png" });

                output.src = URL.createObjectURL(blob);
            } catch (e) {
                alert(e);
            }
        };
    });
