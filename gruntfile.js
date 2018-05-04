/*global module*/
module.exports = function(grunt) {
	"use strict";

	grunt.config("pkg", grunt.file.readJSON("package.json"));

	/*
	 * Sass: Compass (requires compass gem)
	 */
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.config("compass.options", {
		outputStyle: "compressed",
		sassDir: "assets/src/sass",
		cssDir: "assets",
		imagesDir: "assets",
		fontsDir: "assets",
		javascriptsDir: "assets",
		httpPath: "/extensions/entry_nav",
	});
	grunt.config("compass.build.options", { sourcemap: true });
	grunt.config("compass.dist.options", { sourcemap: false, force: true });

	/*
	 * CSS prefixes (-moz-, -webkit-, etc.)
	 */
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.config("autoprefixer.build", {
		options: { map: true },
		files: {
			"assets/entry_nav.css": "assets/entry_nav.css",
			"assets/entry_nav.fields.css": "assets/entry_nav.fields.css"
		}
	});
	grunt.config("autoprefixer.dist", {
		options: { map: false },
		files: grunt.config("autoprefixer.build.files"),
	});

	/* --------------------------------
	 * Javascript
	 * -------------------------------- */

	/*
	 * JSHint:
	 */
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.config("jshint", {
		options: { jshintrc: "./.jshintrc" },
		files: ["assets/src/js/**/*.js"]
	});

	/*
	 * Uglyfy
	 */
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.config("uglify.build", {
		options: {
			sourceMap: true,
			sourceMapIncludeSources: true
		},
		files: {
			"assets/entry_nav.publish_single.js": ["assets/src/js/**/*.js"]
		}
	});
	grunt.config("uglify.dist", {
		options: { sourceMap: false },
		files: grunt.config("uglify.build.files"),
	});

	/*
	 * Watch tasks
	 */
	grunt.loadNpmTasks("grunt-contrib-watch"); // Workflow
	grunt.config("watch", {
		options: {
			livereload: false,
			spawn: false,
			forever: true
		},
		"reload-config": {
			files: ["gruntfile.js"],
		},
		// "process-sources": {
		// 	files: ["assets/src/js/**/*.js"],
		// 	tasks: ["uglify:build"]
		// },
		styles: {
			files: ["assets/src/sass/**/*.scss"],
			tasks: ["compass:build", "autoprefixer:build"]
		},
	});

	// grunt.registerTask("distScripts", ["jshint", "uglify:dist"]);
	// grunt.registerTask("buildScripts", ["uglify:build"]);
	grunt.registerTask("distStyles", ["compass:dist", "autoprefixer:dist"]);
	grunt.registerTask("buildStyles", ["compass:build", "autoprefixer:build"]);
	grunt.registerTask("dist", ["distStyles" /*, "distScripts"*/ ]);
	grunt.registerTask("buildWatch", ["watch"]);
	grunt.registerTask("build", ["buildStyles" /*, "buildScripts"*/ ]);
	grunt.registerTask("default", ["build"]);
};