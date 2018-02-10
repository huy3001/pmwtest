/**
 * Created by Huy on 02/08/2018.
 */

// Requires the gulp and gulp-sass plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    minify = require('gulp-minifier'),
    sourcemap = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

// Create task for browser sync
gulp.task('browserSync', function() {
    browserSync({
        proxy: 'http://localhost/pmwtest/'
    })
});

// Create task for compile sass to css
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass({sourceComments: 'map'}).on('error', sass.logError))
        .pipe(concatCss('main.min.css'))
        .pipe(sourcemap.write())
        .pipe(minify({
            minify: true,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }))
});

// Create task to minify js
gulp.task('minify', function() {
    return gulp.src('js/**/*')
        .pipe(concat('main.min.js'))
        .pipe(minify({
            minify: true,
            minifyJS: {
                sourceMap: false
            },
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(gulp.dest('js/'));
});

// Create task for watch changes
gulp.task('watch', ['browserSync', 'sass', 'minify'], function() {
    // Watch changes of files
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('**/*.html', browserSync.reload);
});

// Default task for gulp
gulp.task('default', ['sass', 'watch']);
