import('../raytrace/pkg')
    .then(({ trace_wasm }) => {
        self.addEventListener('message', msg => {
            const { id, scene } = msg.data;

            let arr;
            try {
                arr = trace_wasm(scene);
            } catch (error) {
                self.postMessage({ id, error: error.message || error });
                return;
            }

            const blob = new Blob([arr.buffer], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            self.postMessage({ id, url });
        });
    })
    .catch(() => self.postMessage('ERROR'));

