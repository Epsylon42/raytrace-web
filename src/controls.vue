<template>
    <div class="controls">
        <div class="input">
            <button @click="postprocess">Compile (WIP)</button>
            <button @click="renderImage">Render</button>
            <span v-if="processing">Processing...</span>
        </div>
        <div class="errors" v-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.component('controls', {
    props: ['processing', 'error'],
    methods: {
        postprocess() {
            this.$emit('postprocess');
        },
        renderImage() {
            this.$emit('renderImage');
        },
    }
});
</script>

<style scoped>
.controls {
    height: 100%;
}

.input {
    display: flex;
    align-items: center;
}

.errors {
    border: 2px dotted red;
}
</style>
