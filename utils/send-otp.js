const nodemailer=require("nodemailer")

module.exports=async function(email,otp){
    try{
    const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"xayrullamatyakubov2005@gmail.com",
        pass:process.env.APP_PASS
    }
})

await transport.sendMail({
    from:"xayrullamatyakubov2005@gmail.com",
    to:email,
    subject:"Devbook",
    text:"Verification code",
    html:`<b style="font-size:24px; color:blue;">Verifiy code: ${otp}</b>`
})
    }catch(error){
        throw new Error
    }
}