document.addEventListener("DOMContentLoaded", function() {

    const inputQuantity = document.querySelector("#products");
    const inputOrders = document.querySelector("#orders");
    const selectPackage = document.querySelector(".select__input");
    const selectDropDown = document.querySelector(".select__dropdown");
    const selectDropDownLi = selectDropDown.querySelectorAll("li");

    const chkAccounting = document.querySelector("#accounting");
    const chkRental = document.querySelector("#terminal");

    const calcSummary = document.querySelector(".total__price");
    const totalBtn = document.querySelector(".summary__total");



    //obiekt zbierający info:
    const state = {
          quantity: 0,
          orders: 0,
          package: 0,
          accounting: false,
          rental: false,

          stateSum(){
             let sum = this.quantity * 0.5 + this.package + this.orders * 0.5;
             if(this.accounting){
                sum += 10;
             }
             if(this.rental){
                sum += 10;
             }
             console.log(this);
             calcSummary.innerHTML = `$${sum}`
             return sum;
          }
       };


    inputQuantity.addEventListener("input", function () {
        state.quantity = Number(this.value);

        const id = this.id;
        const targetElement = document.querySelector(`[data-id="${id}"]`);
        const elCalc = targetElement.querySelector(".item__calc");
        const elPrice = targetElement.querySelector(".item__price");

        elCalc.innerText = `${this.value} * $0,5`;
        elPrice.innerHTML = `$${this.value * 0.5}`;

        state.stateSum();

        // funkcja

    })

    inputOrders.addEventListener("input", function () {
        state.orders = Number(this.value);

        const id = this.id;
        const targetElement = document.querySelector(`[data-id="${id}"]`);
        const elCalc = targetElement.querySelector(".item__calc");
        const elPrice = targetElement.querySelector(".item__price");

        elCalc.innerText = `${this.value} * $0,5`;
        elPrice.innerHTML = `$${this.value * 0.5}`;

        state.stateSum();
        // funkcja

    })

    selectPackage.addEventListener("click", function () {
        this.parentElement.classList.toggle("open");

    })

    for (let el of selectDropDownLi) {
        el.addEventListener('click', function() {
            selectPackage.parentElement.classList.remove("open");

            const targetElement = document.querySelector(`[data-id="package"]`);
            const elCalc = targetElement.querySelector(".item__calc");
            const elPrice = targetElement.querySelector(".item__price");

            let price = 0;

            if (this.dataset.value === "basic") {
                price = 0;
            }
            if (this.dataset.value === "professional") {
                price = 5;
            }
            if (this.dataset.value === "premium") {
                price = 10;
            }

            const packageName = this.dataset.value[0].toUpperCase() + this.dataset.value.substr(1);

            selectPackage.innerHTML = packageName;
            state.package = price;
            elPrice.innerHTML = `$${price}`;

            elCalc.innerText = `${packageName}`;


            state.stateSum();

        });
    }
    //eventy dla checkboxów:
    chkAccounting.addEventListener("click", function () {
        state.accounting = this.checked;

        const id = this.id;
        const targetElement = document.querySelector(`[data-id="${id}"]`);
        const elPrice = targetElement.querySelector(".item__price");
        if (this.checked){
            elPrice.innerHTML = `$10`;
        }else {
            elPrice.innerHTML = `$0`;
        }
        state.stateSum();
    })

    chkRental.addEventListener("click", function () {
        state.rental = this.checked;

        const id = this.id;
        const targetElement = document.querySelector(`[data-id="${id}"]`);
        const elPrice = targetElement.querySelector(".item__price");
        if (this.checked){
            elPrice.innerHTML = `$10`;
        }else {
            elPrice.innerHTML = `$0`;
        }
        state.stateSum();
    })









});