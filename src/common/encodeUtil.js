function encodeUrl(query = {}) {
    for (let preperty in query) {
        var value = JSON.stringify(query[preperty]);
        query[preperty] = encodeURIComponent(value);
    }
    return query;
}

function decodeUrl(query = {}) {
    for (let preperty in query) {
        var value = decodeURIComponent(query[preperty]);
        query[preperty] = JSON.parse(value);
    }
    return query;
}

export default {
    encodeUrl, decodeUrl
}