import {Schema,model} from "mongoose";

interface ICustomer{
    fullname:string;
    id:string;
    email:string;
    phone:string
}


const customerSchema = new Schema<ICustomer>({
    fullname:String,
    id:String,
    email:String,
    phone:String
})

const Customer=model<ICustomer>('Customer',customerSchema);
export {Customer};
