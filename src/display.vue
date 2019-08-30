<template>
    <img v-if="src" :src="src"></img>
</template>

<script>
import Vue from 'vue';

export default Vue.component('display', {
    data() {
        return { 
            src: null,
            worker: new Worker('wasm-render.worker.js'),
            pending: false,
        };
    },
    methods: {
        renderImage(scene) {
            if (this.pending) {
                return Promise.reject(new Error('Another image is already processing'));
            }

            this.pending = true;
            return new Promise((resolve, reject) => {
                this.worker.onmessage = msg => {
                    console.log(msg);

                    this.worker.onmessage = null;
                    this.pending = false;

                    if (msg.data.url) {
                        resolve(msg.data.url);
                    } else {
                        reject(new Error(msg.data.error));
                    }
                    this.$emit('doneProcessing');
                };

                this.worker.postMessage({ id: 0, scene });
            });
        },

        showImage(url) {
            this.src = url;
        },
    }
});
</script>
