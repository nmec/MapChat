module.exports = function(grunt) {

	grunt.initConfig({

		coffee: {
			server: {
				options: {
					bare: true
				},
				files: [
					{
						expand: true,
						cwd: 'src/server',
						src: '**/*.coffee',
						dest: 'build',
						ext: '.js'
					}
				]
			},
			client: {
				options: {
					bare: true
				},
				files: [
					{
						expand: true,
						cwd: 'src/client/coffee',
						src: '**/*.coffee',
						dest: 'build/public/js',
						ext: '.js'
					}
				]
			}
		},

		jade: {
			client: {
				options: {
					pretty: true
				},
				expand: true,
				cwd: 'src/client/jade',
				src: ['**/*.jade', '!**/parts/*.jade', '!**/layouts/*.jade'],
				dest: 'build/public',
				ext: '.html'
			}
		},

		compass: {
			dev: {
				options: {
					noLineComments: true,
					outputStyle: 'compact',
					sassDir: 'src/client/sass/',
					cssDir: 'build/public/css/'
				}
			}
		},

		ember_templates: {
			client: {
				options: {
					templateName: function(sourceFile){
						return sourceFile.replace(/src\/client\/hbs\//, '');
					}
				},
				files: {
					'build/public/js/templates.js' : ['src/client/hbs/**/*.hbs']
				}
			}
		},

		copy: {
			client: {
				files: [
					{
						expand: true,
						cwd: 'src/client/js/',
						src: '**/*.js',
						dest: 'build/public/js/'
					},
					{
						expand: true,
						cwd: 'src/client/css/',
						src: '**/*.css',
						dest: 'build/public/css/'
					}
				]
			}
		},

		watch: {
			jade: {
				files: ['src/**/*.jade'],
				tasks: ['jade']
			},
			compass: {
				files: ['src/**/*.scss'],
				tasks: ['compass']
			},
			coffeeServer: {
				files: ['src/server/**/*.coffee'],
				tasks: ['coffee:server']
			},
			coffeeClient: {
				files: ['src/client/**/*.coffee'],
				tasks: ['coffee:client']
			},
			clientJs: {
				files: ['src/client/js/**/*.js', 'src/client/css/**/*.css'],
				tasks: ['copy:client']
			},
			handlebars: {
				files: ['src/**/*.hbs'],
				tasks: ['ember_templates']
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ember-templates');

	grunt.registerTask('default', [
		'jade',
		//'compass',
		'coffee',
		'ember_templates',
		'copy'
	]);

};