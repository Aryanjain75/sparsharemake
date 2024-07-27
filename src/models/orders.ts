import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemid: {
        type: String,
        required: [true, "Please provide item id"]
    },
    CloudanaryImageId: {
        type: String,
        required: [true, "Please provide Image Id"]
    },
    DISCOUNT: {
        type: String,
        required: [true, "Please provide Discount"]
    },
    CUSSINE: {
        type: String,
        required: [true, "Please provide Cuisine"]
    },
    FOODNAME: {
        type: String,
        required: [true, "Please provide Item Name"]
    },
    PRICE: {
        type: String,
        required: [true, "Please provide Price of Item"]
    },

    RATINGS: {
        type: Number,
        required: [true, "Please provide ratings"]
    },
    TAGS: {
        type: [String],
        required: [true, "Please provide tags"]
    }
});

const billDetailsSchema = new mongoose.Schema({
    items: [itemSchema],
    subtotal: {
        type: String,
        required: [true, "Please provide sub total"]
    },
    shipping: {
        type: String,
        required: [true, "Please provide shipping charges"]
    },
    shippingAddressStreet: {
        type: String,
        required: [true, "Please provide shipping Address Street line"]
    },
    shippingAddressState: {
        type: String,
        required: [true, "Please provide shipping address state"]
    },
    tax: {
        type: String,
        required: [true, "Please add tax"]
    },
    total: {
        type: String,
        required: [true, "Please provide total"]
    }
});

const orderSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: [true, "Please provide id"]
    },
    customername: {
        type: String,
        required: [true, "Please provide customer name"]
    },
    date: {
        type: String,
        required: [true, "please provide date"]
    },
    amount: {
        type: String,
        required: [true, "please provide amount"]
    },
    method: {
        type: String,
        required: [true, "please provide method"]
    },
    status: {
        type: String,
        required: [true, "please provide status"]
    },
    phone: {
        type: String,
        required: [true, "please provide phone number"]
    },
    email: {
        type: String,
        required: [true, "please provide email"]
    },
    time: {
        type: String,
        required: [true, "please provide time"]
    },
    billDetails: billDetailsSchema
});

const Order =mongoose.models.Order|| mongoose.model("Order", orderSchema);

export default Order;
