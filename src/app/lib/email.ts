import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // misal: smtp.gmail.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // email Anda
    pass: process.env.SMTP_PASS, // app password
  },
});

export function generateReceiptHash(
  candidateId: string,
  email: string,
  timestamp: Date
): string {
  const data = `${candidateId}-${email}-${timestamp.getTime()}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function sendVoteReceipt(
  email: string,
  candidateName: string,
  receiptHash: string
) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Bukti Pemilihan - BEM Universitas Advent Indonesia",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Terima Kasih Telah Berpartisipasi!</h2>
        <p>Halo,</p>
        <p>Terima kasih telah memberikan suara dalam pemilihan BEM Universitas Advent Indonesia.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Detail Pemilihan:</h3>
          <p><strong>Kandidat yang dipilih:</strong> ${candidateName}</p>
          <p><strong>Waktu pemilihan:</strong> ${new Date().toLocaleString(
            "id-ID"
          )}</p>
          <p><strong>Receipt Hash:</strong></p>
          <code style="background-color: #e5e7eb; padding: 5px; border-radius: 4px; word-break: break-all;">${receiptHash}</code>
        </div>
        
        <p><strong>Simpanlah email ini sebagai bukti partisipasi Anda.</strong></p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
