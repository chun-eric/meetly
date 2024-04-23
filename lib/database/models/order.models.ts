import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {}

export type IOrderItem = {};

const OrderSchema = new Schema({});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
