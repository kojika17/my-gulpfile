'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*', 
    'browser-sync',
    'jshint-stylish',
    'main-bower-files',
    'run-sequence' 
  ]
});


/**
 * Config
 */
var config = {
  src: './src/',
  dist: './build/',

  reload: true,
  injectOption: {
    ignorePath: 'build'
  },
  pleeeaseOption: {
    fallbacks: {
      'autoprefixer': ['last 2 versions', 'Android >= 2.3'],
      'pseudoElements': true,
      'import': true,
      'sourcemaps': true,
      'next': true      
    },
    optimizers: {
        minifier: false
    }
  }
}

/**
 * Inject
 */
gulp.task('inject', function() {
  // # Bowerのリストをターミナルに表示
  // このリストにインストールしたライブラリが表示されないときは、
  // bower.jsonの[overrides]にライブラリを記述する。  
  console.log('Bower List', $.mainBowerFiles());

  /// Stream
  var bowerStream = gulp.src($.mainBowerFiles())
    .pipe($.concat('bower_componets.js'))
    .pipe(gulp.dest(config.dist + 'js/'));

  var jsStream = gulp.src([
      config.dist + 'js/*.js', 
      '!' + config.dist + 'js/bower_componets.js'
    ], {read: false});

  var cssStream = gulp.src(config.dist + 'css/*.css', {read: false});

  // Task
  gulp.src(config.src + '*.html')
    .pipe($.inject(bowerStream, {
      name: 'bower', 
      ignorePath: config.injectOption.ignorePath
    }))
    .pipe($.inject(jsStream, config.injectOption))
    .pipe($.inject(cssStream, config.injectOption))
    .pipe(gulp.dest(config.src));
});



/**
 * Task
 */

// BrowserSync & Server
gulp.task('bs', function() {
  $.browserSync({
    server: {
      baseDir: config.dist
    }
  });
});


/**
 * Build
 */
gulp.task('build:html', function() {
  return gulp.src(config.src + '*.html')
    .pipe(gulp.dest(config.dist))
    .pipe($.if(config.reload, $.browserSync.reload({ stream: true })));
});

gulp.task('build:css', function() {
  return gulp.src(config.src + 'css/*.css')
    .pipe($.pleeease(config.pleeeaseOption))
    .pipe(gulp.dest(config.dist + 'css/'))
    .pipe($.if(config.reload, $.browserSync.reload({ stream: true })));
});

gulp.task('build:js', function() {
  return gulp.src(config.src + 'js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter($.jshintStylish))
    .pipe($.jshint.reporter('fail'))
    .pipe(gulp.dest(config.dist + 'js/'))
    .pipe($.if(config.reload, $.browserSync.reload({ stream: true })));
});


/**
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch(
    config.src + '*.html', 
    ['build:html']);

  gulp.watch(
    config.src + 'css/*.css', 
    ['build:css']);

  gulp.watch(
    config.src + 'js/*.js', 
    ['build:js']);
});



/**
 * Command
 */

// 開発
gulp.task('default', function() {
  $.runSequence(
    'bs', 
    'watch'
  );
});

// 外部ファイルなどの追加時など
gulp.task('build', function() {
  // config.reload = false;
  $.runSequence(
    ['build:css', 'build:js'], 
    'inject',
    'build:html'
  );
});

// リリース
gulp.task('release', function() {
  $.runSequence(
    // task
  );
});


