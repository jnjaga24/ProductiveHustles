const { createApp } = Vue;
var date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
var lastDay = new Date(y, m + 1, 0);
var lastMonthlastDay = new Date(y, m, 0);
var nextMonthlastDay = new Date(y, m+2, 0);
console.log(`Previous Month ${lastMonthlastDay.toLocaleString('en-US', {month: 'short'})}`); // {month:'long'}
console.log(`Current Month ${lastDay.toLocaleString('en-US', {month: 'short'})}`); // {month:'long'}
console.log(`Previous Month ${nextMonthlastDay.toLocaleString('en-US', {month: 'short'})}`); // {month:'long'}

createApp({
  data() {
    return {
      name: "Jagadeesh",
      currentMonthFinalDate: lastDay.getDate(),
      previousMonthFinalDate: lastMonthlastDay.getDate(),
      output: [],
    };
  },
  methods: {
    say(message) {
      var customerMessage = `Dear Customer,
      Request you to kindly settle the Milk amount of Rs ${message.billAmount} on or before 10th of this month.
      Billing Period ${message.billPeriod},
      No of Days ${message.totalDays}
      Packets ${message.productDetails}.
      
      Payment can be done via gpay/phonepay/paytm
                Jagadeesh Manoharan - 8015814398
      `;
      navigator.clipboard.writeText(customerMessage);
      // alert(customerMessage);
    }
  },
  async beforeMount() {
    console.log(`Current Month Final Date ${this.currentMonthFinalDate}`);
    console.log(`Previous Month Final Date ${this.previousMonthFinalDate}`);
    var productMaster = await fetch("./data/tariff.json").then((resp) =>
      resp.json()
    );
    var customerMaster = await fetch("./data/customerMaster.json").then(
      (resp) => resp.json()
    );
    //Iterating the customer Master
    customerMaster.forEach((element) => {
      let tempData = {
        customerName: "",
        totalDays: "",
        productDetails: "",
        billPeriod: "",
        billAmount: "",
        className:"",
        totalAmount:0
      };
      /* Customer Name*/
      tempData["customerName"] = element.customerName;

      /* Class Name*/
      tempData["className"] = element.className;

      /* No of Days*/
      if (element.paymentType == "Advance") {
        tempData["totalDays"] = this.currentMonthFinalDate;
      } else {
        tempData["totalDays"] = this.previousMonthFinalDate;
      }

      /* Product Details*/
      let productDetails = ``;
      element.product.forEach((customerObj)=>{
        let tempProduct = productMaster.filter((tariffObj)=>{
            return customerObj.productId == tariffObj.id;
        });
        if(tempProduct.length >= 1){
        if(tempProduct[0].variant == 'Tonned Milk (Blue)'){
            productDetails += `${customerObj.Quantity} Blue `;
        }else if(tempProduct[0].variant == 'Standardised (Green)'){
            productDetails += `${customerObj.Quantity} Green `;
        }else if(tempProduct[0].variant == 'Full Cream (Orange)'){
            productDetails += `${customerObj.Quantity} Orange `;
        }else if(tempProduct[0].variant == 'Tonned Full Milk (Blue)'){
            productDetails += `${customerObj.Quantity} FullBlue `;
        }else if(tempProduct[0].variant == 'Diet Milk (Pink)'){
            productDetails += `${customerObj.Quantity} Pink `;
        }
        }
        })
    tempData["productDetails"] = productDetails;

      /* Billing Period*/
      if(element.billingPeriod == 'MonthMid'){
        if(element.paymentType == 'PostService'){
            tempData["billPeriod"] = `${lastMonthlastDay.toLocaleString('en-US', {month: 'short'})} 16-${lastDay.toLocaleString('en-US', {month: 'short'})} 15`
        }else{
            tempData["billPeriod"] = `${lastDay.toLocaleString('en-US', {month: 'short'})} 16-${nextMonthlastDay.toLocaleString('en-US', {month: 'short'})} 15`
        }
      }else{
        if(element.paymentType == 'PostService'){
            tempData["billPeriod"] = `${lastMonthlastDay.toLocaleString('en-US', {month: 'short'})} 01-${lastMonthlastDay.toLocaleString('en-US', {month: 'short'})} ${this.previousMonthFinalDate}`
        }else{
            tempData["billPeriod"] = `${lastDay.toLocaleString('en-US', {month: 'short'})} 01-${lastDay.toLocaleString('en-US', {month: 'short'})} ${this.currentMonthFinalDate}`
        }
      }
      /* Billing Amount*/
      if(element.billingPatternId === 1){
        let amount = 0;
        element.product.forEach((customerObj)=>{
            let tempProduct = productMaster.filter((tariffObj)=>{
                return customerObj.productId == tariffObj.id;
            });
            if(tempProduct.length >= 1){
                if(customerObj.productId !== 4){
                    if(element.paymentType == 'Advance'){
                        amount += (((customerObj.Quantity*tempProduct[0].cardAmount)*this.currentMonthFinalDate)+(customerObj.Quantity*50)+(customerObj.Quantity*20));
                    }else{
                        amount += (((customerObj.Quantity*tempProduct[0].cardAmount)*this.previousMonthFinalDate)+(customerObj.Quantity*50)+(customerObj.Quantity*20));
                    }
                }else{
                    if(element.paymentType == 'Advance'){
                        amount += (((customerObj.Quantity*tempProduct[0].cardAmount)*this.currentMonthFinalDate)+(customerObj.Quantity*100)+(customerObj.Quantity*40));
                    }else{
                        amount += (((customerObj.Quantity*tempProduct[0].cardAmount)*this.previousMonthFinalDate)+(customerObj.Quantity*100)+(customerObj.Quantity*40));
                    }
                }   
            }
          })
          tempData["billAmount"] = amount;
      }else if(element.billingPatternId === 2){
        let amount = 0;
        element.product.forEach((customerObj)=>{
            let tempProduct = productMaster.filter((tariffObj)=>{
                return customerObj.productId == tariffObj.id;
            });
            if(tempProduct.length >= 1){
                if(customerObj.productId !== 4){
                    if(element.paymentType == 'Advance'){
                        amount += (((customerObj.Quantity*tempProduct[0].definedTariff)*this.currentMonthFinalDate));
                    }else{
                        amount += (((customerObj.Quantity*tempProduct[0].definedTariff)*this.previousMonthFinalDate));
                    }
                }else{
                    if(element.paymentType == 'Advance'){
                        amount += (((customerObj.Quantity*tempProduct[0].definedTariff)*this.currentMonthFinalDate));
                    }else{
                        amount += (((customerObj.Quantity*tempProduct[0].definedTariff)*this.previousMonthFinalDate));
                    }
                }   
            }
          })
          tempData["billAmount"] = amount;
      }
      this.output.push(tempData);
      this.totalAmount = this.output.reduce((n, {billAmount}) => n + billAmount, 0)
    });
    console.log(this.output);
  },
}).mount("#app");
