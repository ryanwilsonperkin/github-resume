/*global document, $, jQuery*/
function append_meetup(meetup) {
    var $column_div = $('<div>');
    var $meetup_div = $('<div>');
    var $ul = $('<ul>');
    $column_div.addClass('col-md-4');
    $meetup_div.addClass('well well-md');
    
    var $fields = [
        $('<h2>').text(meetup.name),
        $('<p>').text(meetup.city + ', ' + meetup.state + ', ' + meetup.country),
        $('<p>').text('Join ' + meetup.members + ' ' + meetup.who + '.'),
        $('<a>').attr('href',meetup.link).text(meetup.link)
    ];
    $.each($fields, function() {
        $meetup_div.append(this);
    });
    $meetup_div.append($ul);
    $column_div.append($meetup_div);
    $('#meetups').append($column_div);
}

function get_meetups(text) {
    var url = '/meetup/groups/' + text;
    $.getJSON(url)
        .success(function(data) {
            $('#meetups').empty();
            $.each(data, function() {
                append_meetup(this);
            });
            if (data.length === 0) {
                var $column_div = $('<div>');
                var $error = $('<div>');
                $column_div.addClass('col-md-6 col-md-offset-3');
                $error.addClass('alert alert-warning');
                $error.attr('role', 'alert');
                $error.text('Sorry, there are no local meetups that match your search.');
                $column_div.append($error);
                $('#meetups').append($column_div);
            }
        })
        .fail(function() {
            var $column_div = $('<div>');
            var $error = $('<div>');
            $column_div.addClass('col-md-6 col-md-offset-3');
            $error.addClass('alert alert-warning');
            $error.attr('role', 'alert');
            $error.text('error: Could not fetch data from api.meetup.com');
            $column_div.append($error);
            $('#meetups').append($column_div);
        });
}

$(document).ready(function() {
    // Bind get_meetups functionality to form.
    $('#topic_search_button').click(function() {
        get_meetups($('#topic_search_input').val());
    });
    // Initialize material design plugins.
    $.material.init();
});

