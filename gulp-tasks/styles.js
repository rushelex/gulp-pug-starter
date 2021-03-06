'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqpacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';

const argv = yargs.argv,
  production = !!argv.production;

const processors = [cssnano, mqpacker, autoprefixer];

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(plumber())
    .pipe(
      gulpif(
        production,
        rename({
          suffix: '.min',
        })
      )
    )
    .pipe(sass())
    .pipe(gulpif(production, postcss(processors)))
    .pipe(plumber.stop())
    .pipe(gulpif(!production, sourcemaps.write('./maps/')))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(
      debug({
        title: 'CSS files',
      })
    )
    .pipe(browsersync.stream());
});
