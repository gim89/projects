// Установленные пакеты
const gulp         = require('gulp'), // gulp
      rigger       = require('gulp-rigger'), // для сборки файлов
      browserSync  = require('browser-sync').create(), // для перезагрузки браузера
      htmlmin      = require('gulp-htmlmin'), // минимизация html
      rename       = require('gulp-rename'), // добавление суфикса к окончанию
      sass         = require('gulp-sass'), // перевод sass в css
      autoprefixer = require('gulp-autoprefixer'), // расстановка автопрефиксов
      mmq          = require('gulp-merge-media-queries'), // группировка медиаправилов
      cssnano      = require('gulp-cssnano'), // минифицируем сss
      flatten      = require('gulp-flatten'), // заменяет или удаляет относительные пути к файлам
      babel        = require('gulp-babel'), // использует js следующего поколения
      handlebars   = require('handlebars'), // шаблонизатор
      uglify       = require('gulp-uglifyjs'), // минификация js
      imagemin     = require('gulp-imagemin'), // оптимизация картинок
      pngquant     = require('imagemin-pngquant'), // оптимизация png
      ttf2eot      = require('gulp-ttf2eot'), // перевод формата ttf в eof
      ttf2woff     = require('gulp-ttf2woff'), // перевод формата ttf в woff
      ttf2woff2    = require('gulp-ttf2woff2'), // перевод формата ttf в woff2
      del          = require('del'), // удаление папок
      cache        = require('gulp-cache'); 


// Работа с html
gulp.task('html', () => {
      return gulp.src('./src/html/*.html') // Находим файлы html
            .pipe(rigger()) // собераем файл из html частей (//= в index.html)
            .pipe(gulp.dest('dist')) // выкидуем файл html в папку dist
            .pipe(browserSync.reload({stream: true})) // перезагрузить браузер при изменении файла
            .pipe(htmlmin({collapseWhitespace: true})) // минимизирует html файл
            .pipe(rename({suffix: '.min'})) // добавляет суфикс к файлу
            .pipe(gulp.dest('dist')) // выкидуем минимизируемый файл html в папку dist
            .pipe(browserSync.reload({stream: true})); // перезагружаем браузер
});

//Работа с sass
gulp.task('sass', () => {
      return gulp.src('./src/sass/*.scss') // Находим файлы sass
            .pipe(sass()) // преобразуем sass в css
            .pipe(autoprefixer({ // расстановка автопрефиксов
                  browsers: ['last 15 versions', '> 1%', 'ie 9', 'ie 8', 'ie 7'],
                  cascade: true
            }))
            .pipe(mmq({ // группируем медиаправила
                  log: false
            }))
            .pipe(gulp.dest('./dist/css')) // выкидуем файл css в папку dist
            .pipe(browserSync.reload({stream: true})) // перезагружаем браузер
            .pipe(cssnano()) // минифицируем css
            .pipe(rename({suffix: '.min'})) // добавление суфикса к файлу
            .pipe(flatten()) // замена относительного пути для файлов
            .pipe(gulp.dest('./dist/css')) // выкидуем файл css в папку dist
            .pipe(browserSync.reload({stream: true})); // перезагружаем браузер

});

// Работа с js
gulp.task('js', () => {
      return gulp.src('./src/js/*.js') // находим файлы js
            .pipe(rigger()) // собераем файл из js частей (//= в scripts.js)
            .pipe(
                  babel({ // использует js следующего поколения
                        "presets": [
                              ["env", {
                                    "targets": {
                                    "browsers": ["last 2 versions", "safari >= 7"]
                                    }
                              }]
                        ],
                        "ignore": ["node_modules/handlebars/dist/handlebars.js"]
                  })
            )
            .pipe(gulp.dest('./dist/js')) // выкидуем файл js в папку dist
            .pipe(browserSync.reload({stream: true})) // перезагружаем браузер
            .pipe(uglify('scripts.min.js')) // минифицирует js
            .pipe(gulp.dest('./dist/js')) // выкидуем файл js в папку dist
            .pipe(browserSync.reload({stream: true})); // перезагружаем браузер
});

// Работа с библиотеками js
gulp.task('lib', () => {
      return gulp.src('./src/lib/*.js')
          .pipe(rigger())
          .pipe(gulp.dest('./dist/lib'))
          .pipe(browserSync.reload({stream: true}));
});

// Работа с картинками
gulp.task('img', () => {
      return gulp.src('./src/img/**/*.+(png|jpg|gif|svg)') // находим картинки
            .pipe(cache(imagemin({ // оптимизация картинок
                  interlaced: true,
                  progressive: true,
                  optimizationLevel: 5,
                  svgoPlugins: [{removeViewBox: true}],
                  use: [pngquant()]
            })))
            .pipe(flatten()) // замена относительного пути для картинок
            .pipe(gulp.dest('./dist/img'))
            .pipe(browserSync.reload({stream: true}));
});


// Работа со шрифтами
gulp.task('fontsttf', () => {
      return gulp.src('./src/fonts/**.ttf')
            .pipe(gulp.dest('./dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('fontseot', () => {
      return gulp.src('./src/fonts/**.ttf')
            .pipe(ttf2eot())
            .pipe(gulp.dest('./dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('fontswoff', () => {
      return gulp.src('./src/fonts/**.ttf')
            .pipe(ttf2woff())
            .pipe(gulp.dest('./dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('fontswoff2', () => {
      return gulp.src('./src/fonts/**.ttf')
            .pipe(ttf2woff2())
            .pipe(gulp.dest('./dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
});

// Отслеживание файлов
gulp.task('watch', () => {
      gulp.watch('./src/html/**/*.html', ['html'], browserSync.reload);
      gulp.watch('./src/sass/**/*.scss', ['sass'], browserSync.reload);
      gulp.watch('./src/js/**/*.js', ['js'], browserSync.reload);
      gulp.watch('./src/js/**/*.js', ['lib'], browserSync.reload);
      gulp.watch('./src/img/**/*', ['img'], browserSync.reload);
      gulp.watch('./src/fonts/**/*.ttf', ['fontsttf'], browserSync.reload);
      gulp.watch('./src/fonts/**/*.ttf', ['fontseot'], browserSync.reload);
      gulp.watch('./src/fonts/**/*.ttf', ['fontswoff'], browserSync.reload);
      gulp.watch('./src/fonts/**/*.ttf', ['fontswoff2'], browserSync.reload);
});

// Удаление папки dist
gulp.task('del', () => {
	return del.sync('./dist');
});

gulp.task('server', () => {
      browserSync.init({
          server: {
              baseDir: 'dist'
          },
          notify: false
      });
});

gulp.task('clear', (callback) => {
	return cache.clearAll();
})

// Сборка статических файлов
gulp.task('build', ['html', 'sass', 'js', 'lib', 'img', 'fontsttf', 'fontseot', 'fontswoff', 'fontswoff2']);

// Главный таск, сначала удаляет папку dist,
// потом собирает статику, после чего поднимает сервер
// и затем запускает слежение за файлами
// Запускается из корня проекта командой gulp start
gulp.task('start', ['del', 'clear', 'build', 'server', 'watch']);
