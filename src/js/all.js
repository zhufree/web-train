(function(window){
    var location = window.location;
    var domainArr = location.hostname.split(/\./);
    var linkArr = location.pathname.split(/\//);
    var fileEnd = /\./.test(location.pathname) ? location.pathname.split(/\./) : false;
    var queryArr = location.search.substr(1).split(/&/);
    var query = {};
    for (var i = 0; i < queryArr.length; i++) {
        query[queryArr[i].split(/=/)[0]] = queryArr[i].split(/=/)[1];
    }

    return {
        host: location.host,
        href: location.href,
        port: location.port,
        protocal: location.protocal,
        search: location.search,
        domain: domainArr,
        link: linkArr,
        fileEnd: fileEnd[fileEnd.length - 1],
        query: query
    }
})(window);