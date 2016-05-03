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