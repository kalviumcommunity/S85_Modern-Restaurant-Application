import ErrorHandler from "../error/error.js";
import { User } from "../model/user.js";

export const setReservation =async(req,res,next)=>{
    const {firstname,lastName,email,phone,time,date} = req.body;
    if(!firstname||!lastName||!email||!phone||!time||!date){
        return next(new ErrorHandler("Please fill full reservation form!",400));
    }
    try {
        await User.create(firstname,lastName,email,phone,time,date);
        res.status(200).json({
            success:true,
            message:"Reservation Sent Successfully!",
        })
    } catch (error) {
        if(error.name==="ValidationError"){
            const ValidationErrors=Object.values(error.errors).map(
                (err)=>err.message
            );
            return next(new ErrorHandler(ValidationErrors.join(" , "),400))
        }
    }
}
