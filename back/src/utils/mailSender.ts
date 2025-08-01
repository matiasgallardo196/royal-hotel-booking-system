import sgMail from "@sendgrid/mail";
import { EMAIL_FROM, SENDGRID_API_KEY } from "../config/envs";

sgMail.setApiKey(SENDGRID_API_KEY as string)


export const sender=async(to:string,titulo:string,mensaje:string):Promise<void>=>{
    try {
       await sgMail.send({
        to,
        from: EMAIL_FROM as string,
        subject: titulo,
        html: mensaje,
       }) 
    } catch (error) {
        console.error("Error al enviar correo:", error);
    }
}