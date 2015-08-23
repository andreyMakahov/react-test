var gulp   = require("gulp"),
    concat = require('gulp-concat'),
    babel = require("gulp-babel");

gulp.task("js", function () {
    gulp.src([
        "bower_components/react/react.js",
        "bower_components/react/JSXTransformer.js"
    ])
    .pipe(concat('react-lib.js'))
    .pipe(gulp.dest("build/"));

    gulp.src(["frontend/**/*.js"])
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(gulp.dest("build/"));
});

gulp.task('default', ['js']);