jQuery(function ($) {
    $("#datepicker").datepicker({

        showOtherMonths: true,
        selectOtherMonths: false
    });
    $("#datepicker1").datepicker({

        showOtherMonths: true,
        selectOtherMonths: false
    });

    $('.easy-pie-chart.percentage').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var size = parseInt($(this).data('size')) || 50;
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10),
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
            size: size
        });
    })

    $('.sparkline').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
        $(this).sparkline('html', {
            tagValuesAttribute: 'data-values',
            type: 'bar',
            barColor: barColor,
            chartRangeMin: $(this).data('min') || 0
        });
    });


    var placeholder = $('#piechart-placeholder').css({'width': '90%', 'min-height': '150px'});
    var data = [
        {label: "social networks", data: 38.7, color: "#68BC31"},
        {label: "search gines", data: 24.5, color: "#2091CF"},
        {label: "ad campaigns", data: 8.2, color: "#AF4E96"},
        {label: "direct traffic", data: 18.6, color: "#DA5430"},
        {label: "other", data: 10, color: "#FEE074"}
    ]

    function drawPieChart(placeholder, data, position) {

    }

    drawPieChart(placeholder, data);

    /**
     we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
     so that's not needed actually.
     */
    placeholder.data('chart', data);
    placeholder.data('draw', drawPieChart);


    var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
    var previousPoint = null;

    placeholder.on('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.seriesIndex) {
                previousPoint = item.seriesIndex;
                var tip = item.series['label'] + " : " + item.series['percent'] + '%';
                $tooltip.show().children(0).text(tip);
            }
            $tooltip.css({top: pos.pageY + 10, left: pos.pageX + 10});
        } else {
            $tooltip.hide();
            previousPoint = null;
        }

    });


    var d1 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d1.push([i, Math.sin(i)]);
    }

    var d2 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.5) {
        d2.push([i, Math.cos(i)]);
    }

    var d3 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.2) {
        d3.push([i, Math.tan(i)]);
    }


    var sales_charts = $('#sales-charts').css({'width': '100%', 'height': '220px'});


    $('#recent-box [data-rel="tooltip"]').tooltip({placement: tooltip_placement});

    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('.tab-content')
        var off1 = $parent.offset();
        var w1 = $parent.width();

        var off2 = $source.offset();
        var w2 = $source.width();

        if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
        return 'left';
    }


    $('.dialogs,.comments').slimScroll({
        height: '300px'
    });


    //Android's default browser somehow is confused when tapping on label which will lead to dragging the task
    //so disable dragging when clicking on label
    var agent = navigator.userAgent.toLowerCase();
    if ("ontouchstart" in document && /applewebkit/.test(agent) && /android/.test(agent))
        $('#tasks').on('touchstart', function (e) {
            var li = $(e.target).closest('#tasks li');
            if (li.length == 0) return;
            var label = li.find('label.inline').get(0);
            if (label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation();
        });

    $('#tasks').sortable({
            opacity: 0.8,
            revert: true,
            forceHelperSize: true,
            placeholder: 'draggable-placeholder',
            forcePlaceholderSize: true,
            tolerance: 'pointer',
            stop: function (event, ui) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
                $(ui.item).css('z-index', 'auto');
            }
        }
    );
    $('#tasks').disableSelection();
    $('#tasks input:checkbox').removeAttr('checked').on('click', function () {
        if (this.checked) $(this).closest('li').addClass('selected');
        else $(this).closest('li').removeClass('selected');
    });


})
var app = angular.module('myApp', ['ngCookies']);
app.controller('myCtrl', function ($scope, $http, $cookies) {
    $scope.username = $cookies.get('username');
    $scope.online = "线上";
    $scope.offline = "线下";
    $scope.environment = "线下";
    $scope.env = "offline";
    $scope.res = [];
    $scope.categories = [];
    $scope.cdata = [];
    $scope.tables = ["base_question"];
    $scope.scols = ["store_name", "status", "trans_total", "trans_insert", "trans_update", "trans_delete", "affect_upload", "affect_offline", "create_time", "execute_time"];
    $scope.tinfos = [{
        "trans_total": 1,
        "trans_insert": 2,
        "trans_update": 3,
        "trans_delete": 4,
        "affect_upload": 5,
        "affect_offline": 6,
        "store_name":"base_question",
        "status":0,
        "execute_time":"2018-03-26 22:10:11",
        "create_time":"2018-03-26 22:00:01"
    }];
    $scope.logout = function () {
        $http({

            method: "POST",
            url: "/api/user/logout",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function (response) {
            console.log(response.result);

        });
        window.location.href = 'login.html';
    };
    $scope.change = function (env) {
        $scope.environment = env;
        if (env == "线上") {
            $scope.env = "online";
        }
        else {
            $scope.env = "offline";
        }
    };
    $scope.get_task_status = function (day1) {
        var data = {
            env: "offline",
            day: day1
        }
        $http({

            method: "POST",
            url: "/api/sheet/info",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data,
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (response) {
            console.log(response);

            if (response.status == 0) {
                angular.forEach(response.result, function (each) {
                    $scope.res = response.result;
                    $('#container1').highcharts({
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: '题库任务状态总览'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 35,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: '任务状态占比',
                            data: $scope.res
                        }]
                    });
                });

            }
            else {

                if (response.status == 1001) {
                    window.location.href = 'login.html';
                }
                else {
                    $scope.errmsg = response.error_msg;
                    $scope.task1 = "查询失败：" + response.error_msg;
                }
            }

        });


    };

    $scope.get_task_status(10);
    $scope.get_tblist = function () {

        var data = {
            env: "offline",
        };
        $http({

            method: "POST",
            url: "/api/sync/tblist",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data,
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (response) {
            $scope.result = response.result;
            if (response.status == 0) {
                $scope.tables = response.result;

            }
            else {

                if (response.status == 1001) {
                    window.location.href = 'login.html';
                }
                else {
                    $scope.errmsg = response.error_msg;
                }
            }

        });

    };
    $scope.get_tblist();


    $scope.get_table_info = function (table) {
        var now = new Date();
        console.log($scope.tables);
        var s = now.toJSON().split('T')[0] + ' 00:00:00';
        console.log(s);
        var e = now.toJSON().split('T')[0] + ' 23:59:59';
        var start = document.getElementById("datepicker").value;
        var end = document.getElementById("datepicker1").value;
        console.log(start);
        if (start == "") {
            console.log('sdsdsdsdsdsdsdsdds');
            start = s;
        }
        else {
            console.log('12121212121');
            var temp = start.split('/');
            start = temp[2] + '-' + temp[0] + '-' + temp[1] + ' 00:00:00';
        }
        if (end == "") {
            end = e;
        }
        else {
            var temp = end.split('/');
            end = temp[2] + '-' + temp[0] + '-' + temp[1] + ' 23:59:59';
        }
        var data = {
            env: "offline",
            table: table,
            start: start,
            end: end
        };

        console.log(data);
        $http({

            method: "POST",
            url: "/api/sheet/tbinfo",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data,
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (response) {

            if (response.status == 0) {
                angular.forEach(response.result, function (each) {
                    $scope.res1 = response.result;
                    $scope.categories = [];
                    $scope.cdata = [];
                    angular.forEach($scope.res1, function (each) {

                        $scope.categories.push(each.ctime);
                        $scope.cdata.push(each.affect);

                        var options = {
                            chart: {
                                type: 'bar' //指定图表的类型，默认是折线图（line）
                            },
                            title: {
                                text: '任务详情图表'                 // 标题
                            },

                            yAxis: {
                                title: {
                                    text: '受影响的行数'                // y 轴标题
                                }
                            },
                            xAxis: {
                                categories: $scope.categories  // x 轴分类
                            },
                            series: [{                              // 数据列
                                name: "受影响行数",                 // 数据列名
                                data: $scope.cdata                   // 数据
                            }]
                        };
                        // 图表初始化函数
                        var chart = Highcharts.chart('container', options);


                    });

                });

            }
            else {

                if (response.status == 1001) {
                    window.location.href = 'login.html';
                }
                else {
                    $scope.errmsg = response.error_msg;
                    $scope.task1 = "查询失败：" + response.error_msg;
                }
            }

        });


    };


    $scope.get_table_info($scope.tables[0]);


});
