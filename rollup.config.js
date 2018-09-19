export default {
    entry: './dist/modules/ng2-canvas-whiteboard.es5.js',
    dest: './dist/bundles/ng2-canvas-whiteboard.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ng2CanvasWhiteboard',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}