var gulp   = require("gulp"),
    concat = require('gulp-concat'),
    babel = require("gulp-babel");

gulp.task("js", function () {
    gulp.src([
        "bower_components/react/react.js",
        "bower_components/react/JSXTransformer.js",

        "frontend/lib/utils.js"
    ])
    .pipe(concat('react-lib.js'))
    .pipe(gulp.dest("build/"));

    gulp.src(["frontend/scripts/**/*.js"])
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(gulp.dest("build/"));
});
gulp.task('default', function() {
    gulp.run('js');

    gulp.watch("frontend/**/*.js", function() {
        gulp.run('js');
    });
});