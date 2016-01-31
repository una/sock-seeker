'use strict';

var gulp            = require('gulp'),
    nodemon         = require('gulp-nodemon'),
    sass            = require('gulp-sass'),
    rename          = require('gulp-rename'),
    cssmin          = require('gulp-minify-css'),
    jshint          = require('gulp-jshint'),
    prefix          = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    minifyHTML      = require('gulp-minify-html'),
    size            = require('gulp-size'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    webpack         = require('webpack'),
    webpackStream   = require('webpack-stream');

gulp.task('scss', function() {
  var onError = function(err) {
    notify.onError({
        title:    'Gulp',
        subtitle: 'Failure!',
        message:  'Error: <%= error.message %>',
        sound:    'Beep'
    })(err);
    this.emit('end');
  };

  return gulp.src('scss/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    }
  });
});

// gulp.task('nodemon', function () {
//   return nodemon({
//     script: 'app.js'
//   }).on('start', function () {
//       // cb();
//   });
// });

gulp.task('minify-html', function() {
    var opts = {
      comments:true,
      spare:true
    };

  gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('js/*.js', ['jshint', 'webpack']);
  gulp.watch('./*.html', ['minify-html']);
  gulp.watch('img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
  return gulp.src('img/*')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/img'));
});

// wrapper for JS build, supporting both
// minified and unminified versions
function jsBuild(isProduction) {
  return gulp.src('js/main.js')
    .pipe(webpackStream({
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
      },

      // rename files
      entry : {
        j : './js/main.js'
      },
      output: {
        filename: '[name].js'
      },

      // compress if in production
      plugins: isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ] : [],
      pathinfo: !isProduction
    }, webpack))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({ stream : true }));
}

// webpack build
gulp.task('webpack', function() {
  jsBuild(true);
});

// webpack build, but unminified
gulp.task('webpack-dev', function() {
  jsBuild(false);
});

gulp.task('build', ['webpack', 'imgmin', 'minify-html', 'scss']);

gulp.task('default', ['browser-sync', 'webpack-dev', 'imgmin', 'minify-html', 'scss', 'watch']);
