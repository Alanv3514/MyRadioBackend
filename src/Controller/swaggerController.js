const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
    definition:{
        openapi:"3.0.0",
        info:{ title : "Radio Api", version:"1.0.0"},
    },
    apis:["./src/Controller/*.js"],
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app,port)=>{
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
    app.get("/api-docs.json",(req,res)=>{
        res.setHeader("Content-Type","application/json");
        res.send(specs);
    });
    
}

module.exports = { swaggerDocs };