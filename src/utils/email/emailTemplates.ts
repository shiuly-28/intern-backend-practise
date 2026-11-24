import { env } from "../../config/.env.config.js"


// 3. Welcome Email Template (Post-Registration)
export const welcomeEmailTemplate = (name:string)=>{
    return `
    
 <div>
 <h2 style="margin: 0 0 12px; font-size: 20px; color: #18181b;">Welcome aboard, ${name}!</h2>
 <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #3f3f46;">
        Thanks for creating an account with <strong>${env.smtp_user}</strong>. Your account is set up and ready to go.
      </p>
      <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #3f3f46;">
        Click below to jump into your dashboard and get started:
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <p style="display: inline-block; padding: 12px 28px; background-color: #18181b; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
          Time and Date ${new Date().getFullYear}
        </p>
      </div>
      <p style="margin: 0; font-size: 13px; color: #71717a;">
        Need help getting started? Just reply to this email—we're happy to help.
      </p>
      <div>
    
    `
}