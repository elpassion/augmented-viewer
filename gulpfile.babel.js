import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import rollupify from 'rollupify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

function lint(files) {
  return () => {
    return gulp.src(files)
      .pipe($.plumber({
        errorHandler(err) {
          console.log(err); // eslint-disable-line no-console
          this.emit('end');
        }
      }))
      .pipe(reload({
        stream: true,
        once: true
      }))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

gulp.task('scripts', () => {
  return browserify({
    entries: './client/src/app.js',
    debug: true,
  })
    .transform(babelify, {
      presets: ['es2015', 'stage-0']
    })
    .transform(rollupify)
    .bundle()
    .on('error', $.notify.onError({
      title: 'Failed running browserify',
      message: 'Error: <%= error.message %>'
    }))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./client/dist'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('clean', () => {
  return del.sync('./client/dist');
});

gulp.task('lint', lint('./client/src/**/*.js'));

gulp.task('serve', ['clean', 'lint', 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      routes: {
        '/css': './client/dist'
      },
      baseDir: './client'
    }
  });

  $.watch('./client/src/**/*.js', () => {
    gulp.start('scripts');
    gulp.start('lint');
  });

  $.watch(['./client/index.html', './client/styles.css']).on('change', reload);
});
