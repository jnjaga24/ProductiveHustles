var date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
var lastDay = new Date(y, m + 1, 0);
// var currentMonthFinalDate = lastDay.getDate();

const { createApp } = Vue;
createApp({
  data() {
    return {
      appTitle: "Calculator",
      tariffRates: [
        {
          variant: "Tonned Milk (Blue)",
          quantity: "Half Litre",
          amount: 18.5,
        },
        {
          variant: "Standardised (Green)",
          quantity: "Half Litre",
          amount: 21,
        },
        {
          variant: "Full Cream (Orange)",
          quantity: "Half Litre",
          amount: 23,
        },
        {
          variant: "Tonned Milk (Blue)",
          quantity: "One Litre",
          amount: 37,
        },
        {
            variant: "Diet Milk (Pink)",
            quantity: "Half Litre",
            amount: 16.5,
        }
      ],
      currentMonthFinalDate: lastDay.getDate(),
      output:[],
      finalAmount : 0
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      this.output = [];
        if(this.blue !== undefined && this.blue !== null && this.blue !== 0 && this.blue != ''){
            let temp = {
                price:0,
                text: ''
            };
            temp.text = `${this.blue} * (${this.tariffRates[0].amount}*${this.currentMonthFinalDate})`;
            temp.price = this.blue * (this.tariffRates[0].amount * this.currentMonthFinalDate);
            this.output.push(temp);

        }

        if(this.green !== undefined && this.green !== null && this.green !== 0 && this.green != ''){
            let temp = {
                price:0,
                text: ''
            };
            temp.text = `${this.green} * (${this.tariffRates[1].amount}*${this.currentMonthFinalDate})`;
            temp.price = this.green * (this.tariffRates[1].amount * this.currentMonthFinalDate);
            this.output.push(temp);
        }

        if(this.red !== undefined && this.red !== null && this.red !== 0 && this.red != ''){
            let temp = {
                price:0,
                text: ''
            };
            temp.text = `${this.red} * (${this.tariffRates[2].amount}*${this.currentMonthFinalDate})`;
            temp.price = this.red * (this.tariffRates[2].amount * this.currentMonthFinalDate);
            this.output.push(temp);
        }

        if(this.pink !== undefined && this.pink !== null && this.pink !== 0 && this.pink != ''){
            let temp = {
                price:0,
                text: ''
            };
            temp.text = `${this.pink} * (${this.tariffRates[4].amount}*${this.currentMonthFinalDate})`;
            temp.price = this.pink * (this.tariffRates[4].amount * this.currentMonthFinalDate);
            this.output.push(temp);
        }

        if(this.oneblue !== undefined && this.oneblue !== null && this.oneblue !== 0 && this.oneblue != ''){
            let temp = {
                price:0,
                text: ''
            };
            temp.text = `${this.oneblue} * (${this.tariffRates[3].amount}*${this.currentMonthFinalDate})`;
            temp.price = this.oneblue * (this.tariffRates[3].amount * this.currentMonthFinalDate);
            this.output.push(temp);
        }
        if(this.output.length > 0){
            // console.log(this.output);
            this.finalAmount = this.output.reduce((n, {price}) => n + price, 0)
        }
    },
  },
}).mount("#app");
