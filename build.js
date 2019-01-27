const path = require('path');
const spawn = require('child_process').spawn;

spawn('git', ['submodule', 'init'], { stdio: 'inherit' }).on('exit', () => {
    spawn('git', ['submodule', 'update'], { stdio: 'inherit' }).on('exit', () => {
        spawn('cargo', [
            'build', 
            '--lib',
            '--release',
            '--target', 'wasm32-unknown-unknown',
            '--features', 'wasm',
            '--manifest-path', path.resolve(__dirname, 'raytrace', 'Cargo.toml')
        ], { stdio: 'inherit' }).on('exit', () => {
            spawn('wasm-bindgen', [
                path.resolve(__dirname, 'raytrace', 'target', 'wasm32-unknown-unknown', 'release', 'rtlib.wasm'),
                '--out-dir', path.resolve(__dirname, 'src')
            ], { stdio: 'inherit' });
        });
    });
});
