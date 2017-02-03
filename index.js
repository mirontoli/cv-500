var cv500 = (function(){
    var entries, filterInput, filterText, output;
    var notMatchingClass = 'not-matching';
    var simplify = function(text) {
        //todo: tolowercase
        return text
                .replace(/[\[\]\*]/g, '')
                .replace(/[\n,;\-\—]/g, ' ')
                .replace(/[ӑă]/gi, 'а')
                .replace(/ӗĕ/gi, 'е');
    };
    var print = function(text) {
        output = output || $('#debug-output');
        var p = ['<p>', text, '</p>'].join('');
        output.append(p);
    };
    var showOrHide = function(entry, currentFilterText){
        var entryText = entry.data('simpleText');
        var isMatching = entryText.indexOf(currentFilterText) > -1;
        var wasNotMatching = entry.hasClass(notMatchingClass);
        if (wasNotMatching && isMatching) {
            entry.removeClass(notMatchingClass);
        }
        if (!isMatching) {
            entry.addClass(notMatchingClass);
        }
    };

    var triggerFiltering = function(currentFilterText) {
        entries.each(function(index, element){
            entry = $(element);
            showOrHide(entry, currentFilterText);
        });
    };
    var onFilterInputChange = function() {
        filterInput = filterInput || $('#filter');
        var dirtyFilter = filterInput.val();
        filterText = simplify(dirtyFilter);
        console.log('you are typing ' + filterText);
        triggerFiltering(filterText);
    };
    var setupFiltering = function () {
        filterInput = $('#filter');
        filterInput.on({
            keyup: onFilterInputChange
        });
    };
    //saves jQuery Data object in memory for faster filtering
    var attachData = function(entry) {
        var text = entry.text();
        var simpleText = simplify(text);
        entry.data('simpleText', simpleText);
    };
    var onReady = function() {
        var start = new Date().getTime();
        entries = $(".entry");   
        entries.each(function(index, element){
            attachData($(element));
        });  
        filter = "авӑнмасть"
        var end = new Date().getTime();
        var time = end - start;
        print("ready! It took " + time + ' ms to attach data to all rows. ');
        setupFiltering();
    };
    return {onReady: onReady};
})();

$(document).ready(cv500.onReady);

// todo:
// tests
// comments in functions