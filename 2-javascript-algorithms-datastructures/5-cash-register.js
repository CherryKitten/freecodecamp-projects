const valueMap = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100,
}

function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    let totalCID = 0;
    let change = [];
    let status = "unknown";
    if (cash > price ){
        for (let i in cid){
            totalCID = totalCID +  cid[i][1];
        }
        if (totalCID < changeDue){
            status = "INSUFFICIENT_FUNDS";
        }
        if (totalCID === changeDue){status = "CLOSED"; change = cid; changeDue = 0}
        while (changeDue >= 0.01){
            for (let i = 8; i >= 0; i--){
                let value = valueMap[cid[i][0]];
                let amount = cid[i][1]
                let amountChange = 0;
                while (changeDue >= value && amount > 0){
                    changeDue -= value;
                    amount -= value;
                    amountChange += value;
                    changeDue = Math.round(changeDue * 100) / 100;
                } if (amountChange > 0 ){change.push([cid[i][0], amountChange])}
            }
            if (changeDue >=0.01){ status = "INSUFFICIENT_FUNDS"; change = []; break;}
            status = "OPEN";
        }
    }
    return {status: status, change: change};
}

let tests = [
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) === {status: "OPEN", change: [["QUARTER", 0.5]]},
    checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) === {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]},
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === {status: "INSUFFICIENT_FUNDS", change: []},
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === {status: "INSUFFICIENT_FUNDS", change: []},
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === {status: "INSUFFICIENT_FUNDS", change: []},
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) === {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
]