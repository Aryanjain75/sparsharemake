import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Order from "@/models/orders";
import shortid from 'shortid';

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { customername, date, time, amount, method, status, phone, email, billDetails } = req;

    // Check for missing fields
    if (!customername) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }
    if (!time) {
      return NextResponse.json({ error: "Time is required" }, { status: 400 });
    }
    if (!method) {
      return NextResponse.json({ error: "Method is required" }, { status: 400 });
    }
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!billDetails) {
      return NextResponse.json({ error: "Bill details are required" }, { status: 400 });
    }
    if (!billDetails.items || billDetails.items.length === 0) {
      return NextResponse.json({ error: "Bill items are required" }, { status: 400 });
    }
    if (!billDetails.shippingAddressStreet) {
      return NextResponse.json({ error: "Shipping address street is required" }, { status: 400 });
    }
    if (!billDetails.shippingAddressState) {
      return NextResponse.json({ error: "Shipping address state is required" }, { status: 400 });
    }

    const orderid = shortid.generate();
    
    const newOrder = new Order({
      orderid,
      customername,
      date,
      amount,
      method,
      status,
      phone,
      email,
      billDetails: {
        items: billDetails.items.map((item: any) => ({
          itemid: item._id,
          CloudanaryImageId: item.CloudanaryImageId,
          DISCOUNT: item.DISCOUNT,
          CUSSINE: item.CUSSINE,
          FOODNAME: item.FOODNAME,
          PRICE: item.PRICE,
          RATINGS: item.RATINGS,
          TAGS: item.TAGS
        })),
        subtotal: billDetails.subtotal,
        shipping: billDetails.shipping,
        shippingAddressStreet: billDetails.shippingAddressStreet,
        shippingAddressState: billDetails.shippingAddressState,
        tax: billDetails.tax,
        total: billDetails.total
      },
      time
    });

    await newOrder.save();

    return NextResponse.json({ message: "Order created successfully" }, { status: 202 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || e.toString() }, { status: 500 });
  }
}
