$(function () {
    var curYear = null;
    var today = new Date();
    var nowYear = today.getFullYear();
    var nowMonth = today.getMonth();
    $('#calInput').focus(function () {
        //convert string to number -> 0 if null or empty string
        curYear = +($('#selectedYear').html());
        if (curYear === 0) {
            curYear = nowYear;
            $('#selectedYear').html(curYear);
            disableFutureMonths();
        }
        $('#StartMonthYearSelector').fadeIn('fast');
    });

    $('#StartMonthYearSelector>div:nth-child(n+2)').click(function () {
        if ($(this).hasClass('disabled')) {
            return;
        }
        var date = new Date(curYear, this.innerHTML - 1, 1);
        $('#calInput').val(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2));
        $('#StartMonthYearSelector').fadeOut('fast');
    });

    $('#prevYear').click(function () {
        if (curYear === nowYear) {
            $('#nextYear').fadeIn('fast');
            enableAllMonths();
        }
        curYear = curYear - 1;
        $('#selectedYear').html(curYear);

    });

    $('#nextYear').click(function () {
        curYear = curYear + 1;
        $('#selectedYear').html(curYear);
        if (curYear === nowYear) {
            $(this).fadeOut('fast');
            disableFutureMonths();
        }
    });

    $('html').mousedown(function (ev) {
        if (!($(ev.target).is('#container *'))) {
            $('#StartMonthYearSelector').fadeOut('fast');
        }
    });

    function disableFutureMonths() {
        $('#StartMonthYearSelector>div:nth-child(n+' + (3 + nowMonth) + ')').addClass('disabled');
    }

    function enableAllMonths() {
        $('#StartMonthYearSelector>div.disabled').removeClass('disabled');
    }
});