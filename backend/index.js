const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require("stripe")

const app = express()
app.use(cors())
app.use(express.json({limit:"10mb"}))


const PORT = 8080
// mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false)
mongoose.connect("mongodb://127.0.0.1:27017/Estore",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//schema
const userSchema = {
    firstName: String,
    lastName: String,
    email:{
        type: String,
        unique: true,
    },
    password: String,
    confirmpassword:String,
    image:String,
}
const userModel = mongoose.model("user",userSchema);

//api
app.get("/",(req,res)=>{
    res.send("Server is running...")
});

//sign up
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            res.status(500).send({ message: "Email Id is already registered", alert: false });
        } else {
            const data = userModel(req.body);
            const savedUser = await data.save();
            res.send({ message: "Successfully signed up", alert: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", alert: false });
    }
});

//api login
app.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;

        const result = await userModel.findOne({ email: email });

        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            console.log(dataSend);
            res.status(200).json({ message: "Login is Successful", alert: true, data: dataSend });
        } else {
            res.status(404).json({ message: "Email is not available, please sign up", alert: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", alert: false });
    }
});

//Product section
const schemaProduct = {
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,
}
const productModel = mongoose.model("product",schemaProduct);

//save product in data
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const dataSave = await data.save()
    res.send({message : "Upoload Successful"})
})

//
app.get("/product",async (req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// Define a schema for contact form submissions
const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });
  
  // Create a model based on the schema
  const ContactModel = mongoose.model("Contact", contactSchema);

  // API to handle form submissions
app.post("/submitContactForm", async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email, message } = req.body;
  
      // Create a new document based on the ContactModel schema
      const contactEntry = new ContactModel({
        name,
        email,
        message,
      });
  
      // Save the document to the database
      await contactEntry.save();
  
      // Respond with success message
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1Op8tmSJ6Q7Zn31R5iPDLr09"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})



//server is listening
app.listen(PORT,()=>console.log("server is running at port: "+PORT))