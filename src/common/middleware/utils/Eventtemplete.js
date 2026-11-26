export const htmlTemplate = (otp, username = 'User') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Saraha - OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background: #131b2e; border: 1px solid #1e2d4a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">SARAHA</h1>
              <p style="margin: 5px 0 0 0; font-size: 11px; color: rgba(255,255,255,0.8); letter-spacing: 1.5px; text-transform: uppercase;">Anonymous Feedback Platform</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 35px 25px; text-align: left;">
              <h2 style="margin: 0 0 15px 0; font-size: 20px; color: #ffffff; font-weight: 600;">Security Verification</h2>
              <p style="margin: 0 0 25px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                Hello <strong style="color: #ffffff;">${username}</strong>,<br>
                You requested a verification code to authenticate your account. Use the OTP below to complete the process:
              </p>
              
              <!-- OTP Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                <tr>
                  <td align="center" style="background-color: #0f172a; border: 1px dashed #6366f1; border-radius: 12px; padding: 20px;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #38bdf8; text-shadow: 0 0 12px rgba(56, 189, 248, 0.4); display: inline-block; padding-left: 10px;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Badge -->
              <div style="text-align: center; margin-bottom: 25px;">
                <span style="display: inline-block; background-color: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px;">
                  ⏰ Code expires in 5 minutes
                </span>
              </div>

              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; background-color: #0c1220; border-top: 1px solid #1e2d4a; font-size: 12px; color: #475569;">
              &copy; ${new Date().getFullYear()} Saraha App. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;