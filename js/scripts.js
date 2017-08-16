var rates = null;
var baseCurrency = null;


var apiConnect = new XMLHttpRequest();

apiConnect.open("GET", "http://api.fixer.io/latest?base=EUR");

apiConnect.onreadystatechange = function() {
    
    if(apiConnect.readyState === 4 && apiConnect.status ===200){
        baseCurrency = JSON.parse(this.response).base;
        rates = JSON.parse(this.response).rates;
        
        //wczytanie listy walut do menu
        var navi = document.getElementById('navi');
        var naviList = '';
        Object.keys(rates).forEach(function(element) {
            currency.forEach(function(element2){
                if (element2.kod_waluty == element){
                    naviList += `<li>${element2.nazwa_waluty} (${element})  </li>`;
                }
            },this);
            
                        
        }, this);
        navi.innerHTML= naviList;


        //wczytanie walut do przewijanego paska z kursami
        var animationText = document.getElementById('animationText');
        var pText = `<p>`;
        Object.keys(rates).forEach(function(element){
            console.log(element);
            pText+= `${element}: ${rates[element]}  `;
        },this);
        pText+= '</p>'
        animationText.innerHTML = pText;


        // wczytanie waluty bazowej 
        baseCurrency = JSON.parse(this.response).base;
        var baseCurrencyText = document.getElementById('baseCurrency');
        pText = `<p>${baseCurrency}:</p>`;
        baseCurrencyText.innerHTML = pText;
        


    }
};
apiConnect.send();





