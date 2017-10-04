var currency = (function() {

    var rank, symbol;

    function set(data) {
        rank = data.rank;
        symbol = data.symbol;
    };

    function convert(price) {
        return price * rank + "" + symbol;
    }

    return {
        set: set,
        convert: convert
    }

})();