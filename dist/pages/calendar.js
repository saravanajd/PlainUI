const app = angular.module("PlainUI", []);

app.controller("appController", function ($scope, $http) {
    $scope.currentPage = "Calendar";
    $scope.htmlData = "";

    $scope.calendarSettings = {
        //timeInterval : ["00", "15", "30", "45"],
        timeInterval : ["00", "30"],
        calendarTimes : [],
        columns : [
            { name : 'Column 1', id : '1' },
            { name : 'Column 2', id : '2' },
            { name : 'Column 3', id : '3' },
            { name : 'Column 4', id : '4' },
            { name : 'Column 5', id : '5' },
        ]
    }
    
    $scope.initCalendarViewData = function () {
        let zone = 'AM';
        for (var i = 0; i < 2; i++) {
            if (i != 0) {
                zone = 'PM'
            }
            for (var j = 0; j < 12; j++) {
                let time = j;
                if (j > 0 && j < 10) {
                    time = '0' + j;
                } else if(j == 0) {
                    time = 12;
                }

                $scope.calendarSettings.timeInterval.forEach(function (interval, index) {
                    const item = {
                        time: time + ':' + interval + ' ' + zone,
                        rowSpan: false,
                        nonAvailability: false,
                    }
                    if (interval == '00') {
                        item.rowSpan = true;                            
                    }
                    if (i == 0 && j < 8) {
                        item.nonAvailability = true;
                    }
                    if (i == 1 && j == 11) {
                        item.nonAvailability = true;
                    }
                    $scope.calendarSettings.calendarTimes.push(item);
                })
            }
        }
    }

    $scope.initCalendarViewData();

});

const calendar = {
    initCalendarFunction: function (event) {
        var col = $(event).index();
        var row = $(event).closest('tr').index();

        var top = (row * 22) + 3;
        if ((row % 4) == 0) {
            var left = (col - 1) * 220;
        } else {
            var left = col * 220;
        }

        $('.extend').append('<div class="empty-box"></div>').css('display', 'block');
        $('.empty-box').append('<div class="n-arrow"></div><div class="s-arrow"></div>')
        $('.empty-box').css({ 'top': top, 'left': left });
        $('.btn-rounded').css('display', 'none');

        calendar.showDetails();

        var gridY = 25;

        $('.empty-box').resizable({
            handles: ('n, s'),
            grid: [0, gridY],
            minHeight: gridY,
            classes: {
                "ui-resizable": "highlight"
            },
            resize: function (e, ui) {
                const actualHeight = ui.size.height / 22;
                const height = Math.round(actualHeight);
                const positionLeft = (ui.position.left / 220) + 1;
                const top = (ui.position.top / 22) + 1;                
                const column = $('#calendar').find('th:eq(' + positionLeft + ')').text();
                const positionTop = Math.round(top);
                const positionBottom = positionTop + height;            

                const spaceName = $.trim(column);
                const startTime = $('#calendar').find('tr:eq(' + positionTop + ') td .hover-time').html();
                const endTime = $('#calendar').find('tr:eq(' + positionBottom + ') td .hover-time').html();

                console.log(startTime, endTime, spaceName);
                angular.element(document.getElementById('CalendarContorller')).scope().resizeDragTime(startTime, endTime, spaceName);
            }
        });


        $(".empty-box").draggable({
            grid: [220, 22],
            drag: function (e, ui) {
                const actualHeight = ($('.empty-box').height()) / 22;
                const height = Math.round(actualHeight);
                const positionLeft = (ui.position.left / 220) + 1;
                const top = (ui.position.top / 22) + 1;
                const column = $('#calendar').find('th:eq(' + positionLeft + ')').text();
                const positionTop = Math.round(top);
                const positionBottom = positionTop + height;

                const spaceName = $.trim(column);
                const startTime = $('#calendar').find('tr:eq(' + positionTop + ') td .hover-time').html();
                const endTime = $('#calendar').find('tr:eq(' + positionBottom + ') td .hover-time').html();
                
                console.log(startTime, endTime, spaceName);
                angular.element(document.getElementById('CalendarContorller')).scope().resizeDragTime(startTime, endTime, spaceName);
            }
        });
    },
    
    showDetails: function () {
        if ($('#dayFilter').hasClass('d-flex')) {
            $('#dayFilter').removeClass('d-flex').addClass('d-none');
            $('#book').removeClass('d-none');
        } else {
            $('#dayFilter').addClass('d-flex').removeClass('d-none');
            $('#book').addClass('d-none');
        }
    },
    closeDetails: function () {
        if ($('.extend').css('display') == 'none') {
            return;
        } else {
            calendar.showDetails();
            $('.empty-box').remove();
            $('.extend').css('display', 'none');
            $('.btn-rounded').css('display', 'block');
        }       
    },

}