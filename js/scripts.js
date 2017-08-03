var rates = null;


var apiConnect = new XMLHttpRequest();

apiConnect.open("GET", "http://api.fixer.io/latest?base=EUR");

apiConnect.onreadystatechange = function() {
    
    if(apiConnect.readyState === 4 && apiConnect.status ===200){
        rates = JSON.parse(this.response).rates;
        var navi = document.getElementById('navi');
        var naviList = '';

        Object.keys(rates).forEach(function(element) {
            naviList += `<li>${element}</li>`
        }, this);
        navi.innerHTML= naviList;
    }
};
apiConnect.send();

