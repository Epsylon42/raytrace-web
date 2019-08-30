<template>
    <div class="main">
        <div class="editor">
            <editor ref="editor" />
        </div>
        <div class="processed">
            <textarea v-model="scene"></textarea>
        </div>
        <div class="controls">
            <controls 
                @postprocess="postprocess"
                @renderImage="renderImage"
                :processing="processing"
                :error="error"
                />
        </div>
        <div class="display">
            <display 
            ref="display"
            @doneProcessing="doneProcessing"
            />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

import editor from './editor.vue';
import display from './display.vue';
import controls from './controls.vue';

export default Vue.component('main', {
    components: { editor, display, controls },
    data() {
        return { scene: '', processing: false, error: null, };
    },
    methods: {
        postprocess() {
            this.scene = this.$refs.editor.compile();
        },

        renderImage() {
            this.processing = true;
            this.$refs.display.renderImage(this.scene)
                .then(this.$refs.display.showImage)
                .then(() => this.error = null)
                .catch(err => this.error = err);
        },

        doneProcessing() {
            this.processing = false;
        },
    },
});
</script>

<style scoped>
.main {
    display: grid;
    grid-template-areas:
    "editor processed"
    "controls controls"
    "display display";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(50vh, auto) minmax(3em, auto) auto;
}

.editor {
    grid-area: editor;
}

.processed {
    grid-area: processed;
}

.processed > textarea {
    width: 100%;
    height: 100%;
    resize: none;
}

.controls {
    grid-area: controls;
}

.display {
    grid-area: display;
}
</style>
