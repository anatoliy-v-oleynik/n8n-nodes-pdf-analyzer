const gulp = require('gulp');
const { exec } = require('child_process');
const path = require('path');

// Копирование иконок
exports['build:icons'] = function copyIcons() {
    return gulp.src('icons/**/*')
        .pipe(gulp.dest('dist/icons'));
};

// Полная сборка
exports.build = gulp.series(
    function typescript() {
        return new Promise((resolve, reject) => {
            exec('npx tsc', (error, stdout, stderr) => {
                if (error) {
                    console.error(stderr);
                    reject(error);
                } else {
                    console.log(stdout);
                    resolve();
                }
            });
        });
    },
    exports['build:icons']
);

// Разработка с наблюдением
exports.watch = function watchFiles() {
    gulp.watch('nodes/**/*.ts', exports.build);
    gulp.watch('icons/**/*', exports['build:icons']);
};

exports.default = exports.build;