
/*=================================
=            Variables            =
=================================*/

var fontName                = 'alopeyk-icons',
	assetsDirectory          = process.cwd(),
	rootDirectory            = assetsDirectory.replace('/app/assets', ''),
	gulp                     = require('gulp'),
	runSequence              = require('run-sequence'),
	chokidar                 = require('chokidar'),
	rename                   = require('gulp-rename'),
	iconfont                 = require('gulp-iconfont'),
	consolidate              = require('gulp-consolidate'),
	spawn                    = require('child_process').spawn,
 	font_output_tpl_name     = 'config.js',
	font_input               = ['./icons/glyphs/**/*.svg'],
	font_output              = './fonts/',
	font_input_tpl           = './icons/template/' + font_output_tpl_name,
	font_output_tpl          = './icons/',
	font_input_preview_css   = './icons/template/preview/alopeyk-style.css',
	font_input_preview_html  = './icons/template/preview/alopeyk-style.html',
	font_output_preview_html = './icons/preview',
	font_output_preview_css = './icons/preview/css',
	font_output_types        = 'ttf',
	timestamp                = Math.round(Date.now() / 1000),
	mapGlyphs                = function (glyph) {
		return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0), uid: (new Date().getTime()).toString(16) }
	},
	runCmd                   = function (cmd, options, wd, outCb, errCb) {
		return new Promise((resolve, reject) =>
		{
			cmd = spawn( cmd, options, { cwd: wd } );
			cmd.stdout.on('data', (data) => {
				console.log(`${data}`);
				if(outCb) outCb( data, resolve, reject );
			});

			cmd.stderr.on('data', (err) => {
				console.log(`${err}`);
				if(errCb) errCb( err, resolve, reject );
			});

			cmd.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
				resolve();
			});
		});
	}


/*=============================
=            Tasks            =
=============================*/

// Icon Fonts
gulp.task('iconfont', function () {
	return gulp.src(font_input)
		.pipe(iconfont({
			fontName: fontName,
			formats: font_output_types,
			centerHorizontally: true,
			appendCodepoints: true,
			timestamp,
		}))
		.on('glyphs', function (glyphs) {
			const className = fontName;
			var options = {
				className,
				fontName,
				fontPath: '../../../fonts/',
				glyphs: glyphs.map(mapGlyphs)
			}
			// Template file
			gulp.src(font_input_tpl)
				.pipe(consolidate('underscore', options))
				.pipe(gulp.dest(font_output_tpl));
			// HTML preview for all icons
			gulp.src(font_input_preview_css)
				.pipe(consolidate('underscore', options))
				.pipe(rename({ basename: fontName }))
				.pipe(gulp.dest(font_output_preview_css));
			gulp.src(font_input_preview_html)
				.pipe(consolidate('underscore', options))
				.pipe(rename({ basename: fontName }))
				.pipe(gulp.dest(font_output_preview_html));
		})
		.pipe(gulp.dest(font_output));
});

// Linking
gulp.task('link', function (done) {
	Promise.resolve()
	.then(() => { return runCmd( 'react-native', [ 'link' ], rootDirectory ) })
	.catch((err) => {console.log(err)})
	.then(done)
});

// Watch
gulp.task('watch', function () {
	var watcherOptions = {
		ignored: /[\/\\]\./,
		persistent: true,
		ignoreInitial: true,
	};
	chokidar.watch([font_input, font_input_tpl, font_input_preview_html, font_input_preview_css], watcherOptions).on('all', function (event, path) {
		runSequence('iconfont');
	});
	chokidar.watch([font_output], watcherOptions).on('all', function (event, path) {
		runSequence('link');
	});
});

// Initialazation
gulp.task('init', function (done) {
	runSequence('iconfont', 'link', 'watch');
});

// Default
gulp.task('default', ['init']);

