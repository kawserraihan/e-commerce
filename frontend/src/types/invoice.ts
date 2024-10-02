export type Invoice = {
    no: number;
    invoiceID: number;
    invoiceAmount: number;
    customer: string;
    customerEmail: string;
    customerAddress: string;
    customerContact: string;
    lastPaymentDate: string;
    product: [{name: string, quantity: number, price:number}, {name: string, quantity: number, price:number} ];
    paymentHistory: [{date: string, amount: number, method:string}];
    productTypes: string;
    discount: number;
    deliveryCharge: number;
    dueAmount: number;
    paymentMethod: string;

  };