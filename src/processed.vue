<template>
    <textarea v-model="_text" />
</template>

<script>
import Vue from 'vue';

export default Vue.component('processed', {
    data() {
        return { _text: '' };
    },
    computed: {
        text: {
            get() { return this._text; },
            set(text) { this._text = text; }
        }
    }
});
</script>

<style scoped>
textarea {
    width: 100%;
    height: 100%;
    resize: none;
}
</style>
