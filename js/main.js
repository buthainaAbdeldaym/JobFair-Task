import { data, dates, totalAmount} from "./data.js";



$(document).ready(function() {

    let tbody=document.querySelector('tbody');
    function displayCustomers(){
        let displayedCustomers="";
        for(let i=0;i<data.customers.length;i++){
            let transactionNumber="";
            let transactionDate="";
            let transactionAmount="";
            for(let j=0;j<data.transactions.length;j++){
                if (data.customers[i].id===data.transactions[j].customer_id) {
                    transactionNumber +=`<span class="d-block">${data.transactions[j].id}</span>`
                    transactionDate+=`<span class="d-block">${data.transactions[j].date}</span>`
                    transactionAmount+=`<span class="d-block">${data.transactions[j].amount}</span>`
                }
            }
            displayedCustomers +=`
            <tr class='selected'>
                <td class="text-center custmId">${data.customers[i].id}</td>
                <td class="text-center">${data.customers[i].name}</td>
                <td class="text-center">${transactionNumber}</td>
                <td class="text-center">${transactionDate}</td>
                <td class="text-center">${transactionAmount}</td>
            </tr>
            `
        }
        tbody.innerHTML=displayedCustomers;
    }
    displayCustomers();
    function searchByNameAndAmount(term){
        let filteredCustomers=data.transactions.filter(transaction=>String(transaction.amount).includes(term)&&term[0]!='0');
        let displayedCustomers="";
        if(filteredCustomers.length<1){
            for(let i=0;i<data.customers.length;i++){
                if(data.customers[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
                    let transactionNumber="";
                    let transactionDate="";
                    let transactionAmount="";
                    for(let j=0;j<data.transactions.length;j++){
                        if (data.customers[i].id===data.transactions[j].customer_id) {
                            transactionNumber +=`<span class="d-block">${data.transactions[j].id}</span>`
                            transactionDate+=`<span class="d-block">${data.transactions[j].date}</span>`
                            transactionAmount+=`<span class="d-block">${data.transactions[j].amount}</span>`
                        }
                    }
                    displayedCustomers +=`
                    <tr>
                        <td class="text-center">${data.customers[i].id}</td>
                        <td class="text-center">${data.customers[i].name}</td>
                        <td class="text-center">${transactionNumber}</td>
                        <td class="text-center">${transactionDate}</td>
                        <td class="text-center">${transactionAmount}</td>
                    </tr>
                    `
                }
            }
        }
        else{
            for(let i=0;i<data.customers.length;i++){
                let transactionNumber="";
                let transactionDate="";
                let transactionAmount="";
                for(let j=0;j<filteredCustomers.length;j++){
                    if (data.customers[i].id===filteredCustomers[j].customer_id) {
                        transactionNumber +=`<span class="d-block">${filteredCustomers[j].id}</span>`
                        transactionDate+=`<span class="d-block">${filteredCustomers[j].date}</span>`
                        transactionAmount+=`<span class="d-block">${filteredCustomers[j].amount}</span>`
                    }
                }
                if (transactionAmount!=''&&transactionDate!=''&&transactionNumber!='') {
                    displayedCustomers +=`
                    <tr>
                        <td class="text-center">${data.customers[i].id}</td>
                        <td class="text-center">${data.customers[i].name}</td>
                        <td class="text-center">${transactionNumber}</td>
                        <td class="text-center">${transactionDate}</td>
                        <td class="text-center">${transactionAmount}</td>
                    </tr>
                    `
                }
            }
        }
        tbody.innerHTML=displayedCustomers;
    }
    document.querySelector('input').addEventListener('keyup',function(){
        searchByNameAndAmount(this.value);
        let customerId=Number(tbody.children[0].children[0].innerHTML);
        if (this.value!='') {
            showChartForCustomer(customerId);
        }
        else{
            showChartForTotalAmount();
        }
    })



    function getTransactionAmounts(customerId) {
        let transactions = data.transactions.filter(transaction => transaction.customer_id === customerId);
        let customerTransactions=transactions.map(transaction=>({...transaction}));
        let x=0;
        for (let i = 0; i < customerTransactions.length; i++) {
            
            for (let j = 0; j < customerTransactions.length; j++) {
                if(i!=j && customerTransactions[i].date===customerTransactions[j].date && x===0){
                    if (customerTransactions[i].date===customerTransactions[j].date) {
                        customerTransactions[i].amount+=customerTransactions[j].amount;
                        customerTransactions.splice(j,1);
                        ++x;
                    }
                }
            }
            
        }
        return customerTransactions;
    }

    let chart=null;
    const ctx = document.getElementById('myChart').getContext('2d');
    ctx.fillRect(10,10,300,300)



    function showChartForTotalAmount() {
        if (chart!=null) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: dates,
            datasets: [{
                label: 'total amount of all transctions per date',
                data: totalAmount,
                backgroundColor: ['#1ABC9C','#BDC3C7'],
                borderWidth: 1
            }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });
    }
    showChartForTotalAmount();

    function createChart(data,name){
        if (chart!=null) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: data.map(date=>date.date),
            datasets: [{
                label: `amount per date for ${name}`,
                data: data.map(amount=>amount.amount),
                backgroundColor: ['#1ABC9C','#BDC3C7'],
                borderWidth: 1
            }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });
    }


    let selectCustomer = document.querySelectorAll('.selected');
    for (let i = 0; i < selectCustomer.length; i++) {
        selectCustomer[i].addEventListener('click',function(){
            document.querySelector('input').value=this.children[1].innerHTML;
            let customerId=Number(this.children[0].innerHTML);
            showChartForCustomer(customerId);
        })
    }
    $('tbody tr').click(function() {
        $('tbody tr').not(this).hide(100);
        $(this).addClass('clicked');
    });
    $('button').click(function() {
        document.querySelector('input').value='';
        $('tbody tr').show(100);
        $('tbody tr').removeClass('clicked');
        showChartForTotalAmount();
    });

    function showChartForCustomer(id) {
        let customerData=getTransactionAmounts(id);
        let name=''
        for (let i = 0; i < data.customers.length; i++) {
            if(data.customers[i].id==customerData[0].customer_id){
                name=data.customers[i].name;
            }
        }
        createChart(customerData,name);
    }

});

