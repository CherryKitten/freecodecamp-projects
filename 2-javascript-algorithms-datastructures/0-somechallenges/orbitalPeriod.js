function orbitalPeriod(arr) {
    const GM = 398600.4418;
    const earthRadius = 6367.4447;
    let orbitalPeriod = 0;
    const response = [];
    for (let elem in arr){
        let avgAlt = arr[elem]['avgAlt'];
        let name = arr[elem]['name'];

        response.push({name: name, orbitalPeriod: orbitalPeriod})
    }
    return response;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);