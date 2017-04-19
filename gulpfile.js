var gulp = require('gulp');
var fetch = require('whatwg-fetch');
var minify = require('gulp-minify');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.src('src/*.js')
  .pipe(minify({
  	ext:{
            src:'-sdk.js',
            min:'-sdk.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
  }))
  .pipe(gulp.dest('dist'));
});