/**
 * Created by bugg on 17/06/14.
 */
var SplashScreen = Backbone.View.extend({
    events: {
        'click .run_query': 'run_query',
        'click .run_dashboards': 'run_dashboard',
        'click .head' : 'click_head',
        'click .beg_tut': 'run_tour'
    },
    click_head: function(event){
        event.preventDefault();
        var target = event.target;
        var a = $(target).attr('class').split(' ');
        $('nav li').removeClass('active');
        $(target).parent().addClass('active');
        $('.stabs section').hide();

        var active = "";
        if(a.indexOf("welcome") > -1){
            active = "welcome";
        }
        else if(a.indexOf("features") > -1){
            active = "features";
        }
        else if(a.indexOf("help") > -1){
            active = "help";
        }
        else if(a.indexOf("enterprise") > -1){
            active = "enterprise";
        }

        $('#'+active).fadeIn();

    },
    run_tour: function(){

        this.toolbar = Saiku.toolbar;

        var tour = new Tour({toolbar: this.toolbar});

        tour.run_tour();
    },
    initialize: function(args) {
        _.bindAll(this, "caption");
        _.extend(this, Backbone.Events);




    },
    run_query : function(){
        Saiku.tabs.add(new Workspace());
        return false;
    },
    run_dashboard : function(){
        if(Saiku.Dashboards === undefined){
            alert("Dsl Dashboards Feature Under Implementation")
        }
        else {

            var tab = _.find(Saiku.tabs._tabs, function(tab) {
                return tab.content instanceof Dashboards;
            });

            if (tab) {
                tab.select();
            }
            else {
                Saiku.tabs.add(new Dashboards());
            }

            return false;
        }
        return false;
    },
    template: function() {
        var template = $("<div> <div id='splash'> <nav> <ul> <li class='active'><a class='welcome head'" +
                " href='#'>Welcome</a></li> <li><a class='features head' href='#'>Features</a></li> <li><a" +
                " class='help head' href='#'>Get Help</a></li> <li class='enterprisetoggle enterprise'><a" +
                " class='enterprise head'" +
                " href='#'>Enterprise</a></li> </ul> <h2>Explore Data. Visualise. Act.</h2> </nav> <section" +
                " class='stabs'> <section style='margin-top:50px;min-height:700px;' id='welcome'> <div" +
                " style='width:50%;float:left;'> <h1 class='saikulogo'>DSL</h1>" +
                " DSL UI provides a web based analytics platform" +
                "<i class='icon" +
            " icon-remove' style='"+
        "height: 100px;"+
        "'></i>  </p> <h2>Quick" +
                " Links</h2> <ul class='quicklinks'> <li><a class='run_query' href='#'>Create a new query</a></li>" +
                " <li><a href='#' title='Dashboards' class='run_dashboards'>Create a dashboard</a></li>" +
                /*" <li> <a href='' target='_blank'>Visit the website</a></li> " +*/
                /*"<li><a href='#' class='help head'>Tutorials</a></li> </ul> " +*/
                " <section style='display:none !important;margin-top:50px' id='enterprise'> <h1 class='saikulogo'>DSL</h1> <h2>Enterprise</h2> </section> </section> </div> </div>").html() || "";
        return _.template(template)({
            //    cube_navigation: Saiku.session.sessionworkspace.cube_navigation
        });

    },
    setupPage: function(obj){
        var height = $(window).height();
        $('body').height(height);
        $('.stabs section').each(function(){
            var vH = $(this).height();
            var dif = ((height - vH)/2)-50;
            if(dif<0){
                dif = 20;
            }
            //$(this).css('margin-top',dif+'px').hide();
        });
        var active = $('nav li.active a').attr('class');
        $('#'+active).fadeIn();
    },
    render: function(){
        var self = this;

        var license = new License();
		if(Settings.BIPLUGIN5){
                $(self.el).html(self.template());

                if (Settings.LICENSE.licenseType != undefined &&
                    Settings.LICENSE.licenseType != "trial" && Settings.LICENSE.licenseType != "Open Source License") {

                    $(self.el).find(".enterprisetoggle").css("visibility", "hidden");


				}
                self.getContent();

                self.getNews();

                self.setupPage(self);
                $('#splash').find('> nav > ul > li.active > a').click(function(){
                    var active = $(this).attr('class');
                    $('nav li').removeClass('active');
                    $(this).parent().addClass('active');
                    $('.stabs section').hide();
                    $('#'+active).fadeIn();
                });
		}
		else {
                //$(self.el).html(self.template()).appendTo($('body'));
                $(self.el).html(self.template());

                if (Settings.LICENSE.licenseType != undefined &&
                    Settings.LICENSE.licenseType != "trial" && Settings.LICENSE.licenseType != "Open" +
                    " Source License") {

                    $(self.el).find(".enterprisetoggle").css("visibility", "hidden");


				}
                self.getContent();

                self.getNews();

                self.setupPage(self);
            $('#splash > nav > ul > li.active > a').click(function(){
                var active = $(this).attr('class');
                $('nav li').removeClass('active');
                $(this).parent().addClass('active');
                $('.stabs section').hide();
                $('#'+active).fadeIn();
            });

        }

      return this;
  },
    remove:function(){
        $(this.el).remove();
    },
    caption: function(increment) {
        return '<span class="i18n">Home</span>';
    },
	getNews: function(){
		var that = this;
		/*$.ajax({
			type: 'GET',
			url: "http://meteorite.bi/news.json",
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',    
			jsonpCallback: 'jsonCallback',

			success: function(json) {
				for(var i = 0; i<json.item.length;i++){
					$(that.el).find("#news").append("<h4 style='margin-left: 0.5%;color:#6D6E71;'>"+json.item[i].title+"</h4><strong style='margin-left: 0.5%;color:#6D6E71;'>"+json.item[i].date+"</strong>" +
					"<br/><p style='color:#6D6E71;'>"+json.item[i].body+"</p>")
				}
			},
			error: function(e) {
				console.log(e.message);
			}
		});*/
	},
    getContent: function(){
        var that =this;
        var license = new License();

        $.ajax({
            type: 'GET',
            url: "http://meteorite.bi/content.json",
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            jsonpCallback: 'jsonCallback2',
            cache: true,
            success: function(json) {

                $(that.el).find("#dyn_content").html(json.item[0].content);
                $(that.el).find(".responsive-container").fitVids();
                    //$(self.el).html(self.template()).appendTo($('body'));
                    $(self.el).html(that.template());

                    if (Settings.LICENSE.licenseType != "trial" && Settings.LICENSE.licenseType != "Open Source" +
                        " License") {

                        $(self.el).find(".enterprisetoggle").css("visibility", "hidden");


                    }

            },
            error: function(e) {

                    //$(self.el).html(self.template()).appendTo($('body'));
                    $(self.el).html(self.template());

                    if (Settings.LICENSE.licenseType != "trial" && Settings.LICENSE.licenseType != "Open Source" +
                        " License") {

                        $(self.el).find(".enterprisetoggle").css("visibility", "hidden");


                    }

            }
        });

    }

});
