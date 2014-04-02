"use strict";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var appConfig = {
        dirsDev: {
            js:   "assets/js",
            css:  "assets/css",
            img:  "assets/img",
            sass: "assets/sass",
            imgOptimized: "assets/img-optimized/"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        
        // Observacao de mudancas nos arquivos
        watch: {
            options: {
                livereload: false
            },
            css: {
                files: ["<%= dirsDev.sass %>/{,*/}*.{scss,sass}"],
                tasks: ["compass", "notify:compass"]
            },
            html: {
                files: [
                    // carregamento automatico do browser para as atualizacoes das extensoes abaixo
                    "/*.{html,htm,shtml,shtm,xhtml,php,jsp,asp,aspx,erb,ctp}"
                ]
            }
        },

        // Compilacao de arquivos Sass/Scss para CSS
        compass: {
            dist: {
                options: {
                    sassDir: "<%= dirsDev.sass %>",
                    cssDir: "<%= dirsDev.css %>",
					imagesDir: '<%= dirsDev.img %>',
					relativeAssets: true
                }
            }
        },

        copy: {
          main: {
            files: [{
                expand: true, 
                cwd: '<%= dirsDev.img %>', 
                src: ['**/*.jpg', '**/*.gif'], 
                dest: '<%= dirsDev.imgOptimized %>'
            }]
          }
        },

        pngmin: {
            options: {
                ext: '.png'
            },
            files: {
                expand: true,
                src: ['**/*.png'],
                cwd: '<%= dirsDev.img %>',
                dest: '<%= dirsDev.imgOptimized %>'
            }
        }
      
    };

    // Iniciando as configuracoes do Grunt
    grunt.initConfig(appConfig);
	
    // Aliases para as tarefas
    grunt.registerTask( "w", [ "watch" ] );
    grunt.registerTask( "o", [ "pngmin", "copy" ] );
};
