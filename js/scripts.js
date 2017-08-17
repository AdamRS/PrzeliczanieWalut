var rates = null;

function currencyChange(currencyNavi) {
var apiConnect = new XMLHttpRequest();

apiConnect.open("GET", "http://api.fixer.io/latest?base="+currencyNavi,true);

apiConnect.onreadystatechange = function() {
    
    if(apiConnect.readyState === 4 && apiConnect.status ===200){
        baseCurrency = JSON.parse(this.response).base;
        rates = JSON.parse(this.response).rates;
        
        //wczytanie listy walut do menu
        var navi = document.querySelector("#navi");
        var naviList = '';
        Object.keys(rates).forEach(function(element) {
            currency.forEach(function(element2){
                if (element2.kod_waluty == element){
                    naviList += `<li data-currency="${element}">${element2.nazwa_waluty} (${element})  </li>`;
                }
            },this);
            
                        
        }, this);
        navi.innerHTML= naviList;


        //wczytanie walut do przewijanego paska z kursami
        var animationText = document.querySelector("#animationText");
        var pText = `<p>`;
        Object.keys(rates).forEach(function(element){
        pText+= `${element}: ${rates[element]}  `;
        },this);
        pText+= '</p>'
        animationText.innerHTML = pText;


        // wczytanie waluty bazowej 
        var baseCurrency = JSON.parse(this.response).base;
        var baseCurrencyText = document.querySelector("#baseCurrency");
        pText = `<p>${baseCurrency}:</p>`;
        baseCurrencyText.innerHTML = pText;

        // wczytywanie szczegółów waluty bazowej
        pText = '';
        var date = JSON.parse(this.response).date;
        var baseCurrencyDetails = document.querySelector("#CurrenciesDetails");
        pText += `<H3>Waluta zostanie przeliczona po kursie z dnia ${date}</H3>`;
        currency.forEach(function(element){
            if (element.kod_waluty == baseCurrency){
                pText += `<p>Nazwa waluty: ${element.nazwa_waluty}</p>`;
                pText += `<p>Kraj: ${element.kraj}</p>`;

            }
        },this);
        baseCurrencyDetails.innerHTML = pText;

        //dodanie formularza

        var calculatingCurrencies = document.querySelector("#calculatingCurrencies");
        pText = '';
        pText+=`<div><label>Kwota:  </label>`;
        pText+= `<input type="number" id="amount"></div>`;
        pText+=`<div><label>Waluta:</label>`;
        pText += `<select id="waluta"><option value disabled selected> Waluta</option>`;
        Object.keys(rates).forEach(function(element) {
        pText+=`<option value="${element}">${element}</option>`;         
            
                        
        }, this);
        pText+= `</select></div>`;
        pText+= `<div><label>Kurs: </label><label id="activeCourse">Nie wybrano waluty</label></div>`
        pText+=`<div><input type="submit" value="Przelicz"></div>`
        calculatingCurrencies.innerHTML = pText;


        var result = document.querySelector("#result");
        var calculatingCurrenciesForm = document.querySelector("#calculatingCurrencies");
        
        //przeliczanie waluty

        calculatingCurrenciesForm.addEventListener("submit",function(e){
            e.preventDefault();
            if (isNaN(rates[document.querySelector("#waluta").value]*document.querySelector("#amount").value)===true || document.querySelector("#amount").value <=0) {
                pText='';
                pText='Wpisz poprawne dane';
            }
            else{
                pText='';
                pText+=`${document.querySelector("#amount").value}  ${baseCurrency} to ${(rates[document.querySelector("#waluta").value]*document.querySelector("#amount").value).toFixed(2)}  ${document.querySelector("#waluta").value}`;

                
            }
            result.innerHTML = pText;
            
            


        },false);

        var activeCourse = document.querySelector("#activeCourse");
        var activeCourseChange = document.querySelector("#waluta");
        activeCourseChange.addEventListener("change",function(e){
            pText='';
            pText+= rates[activeCourseChange.value];
            activeCourse.innerHTML = pText;
        },false);


    }
};
apiConnect.send();    

};

currencyChange("EUR");


document.querySelector("#navi").addEventListener("click",function(e){
currencyChange(e.target.dataset.currency);

});





