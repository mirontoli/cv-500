var cv500 = (function(){
    var entries, filterInput, wordList, filterText, output;
    var notMatchingClass = 'not-matching';
    var urlParams;
    (function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    })();
    var simplify = function(text) {
        //if empty or null, just return empty string
        return !text ? '' : text
                .toLowerCase()
                .replace(/[\[\]\*]/g, '')
                .replace(/[\n,;\-\—]/g, ' ')
                .replace(/[ӑă]/gi, 'а')
                .replace(/ӗĕ/gi, 'е')
                .replace(/ҫç/gi, 'с')
                .replace(/ӳÿ/gi, 'у');
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
        var filterString = currentFilterText ? '?filter=' + currentFilterText : ''
        var urlSearchAndHash = filterString + window.location.hash;
        window.history.pushState('bajsa', 'Title', urlSearchAndHash);
    };
    var onFilterInputChange = function() {
        filterInput = filterInput || $('#filter');
        var dirtyFilter = filterInput.val();
        filterText = simplify(dirtyFilter);
        //console.log('you are typing ' + filterText);
        triggerFiltering(filterText);
    };
    var setupFiltering = function () {
        filterInput = $('#filter');
        filterInput.on({
            keyup: onFilterInputChange
        });
        var dirtyFilter = urlParams['filter'];
        if (dirtyFilter) {
            filterText = simplify(dirtyFilter);
            filterInput.val(filterText);
            triggerFiltering(filterText);
        }
    };
    var setupSelection = function() {
        var selectedClass = 'selected';
        wordList = wordList || $('#word-list');
        $(document.location.hash).addClass(selectedClass);
        wordList.on('click', '.entry', function(e){
            var elem = $(this);
            //if the same is clicked, unselect
            if (elem.hasClass(selectedClass)) {
                elem.removeClass(selectedClass);
                var uri = window.location.toString();
                if (uri.indexOf("#") > 0) {
                    var clean_uri = uri.substring(0, uri.indexOf("#"));
                    window.history.replaceState({}, document.title, clean_uri);
                }
                e.preventDefault();
            } else { //if other clicked, switch selection
                //clear selection
                wordList.find('.'+selectedClass).removeClass(selectedClass);
                $(this).addClass(selectedClass);
            }
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
        var end = new Date().getTime();
        var time = end - start;
        print("ready! It took " + time + ' ms to attach data to all rows. ');
        setupFiltering();
        setupSelection();
    };
    return {onReady: onReady};
})();

$(document).ready(cv500.onReady);

// todo:
// tests
// comments in functions