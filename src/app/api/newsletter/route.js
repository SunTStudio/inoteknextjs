import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    
    const { data } = await request.json();

   
    if (!data || !data.useremail) {
      return new Response(
        JSON.stringify({ error: "Email is required in the data object." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

 
    const { useremail } = data;

    console.log("📩 Email received in Next.js API:", useremail);

   
    const payload = {
      data: {
        useremail: useremail,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/newsletters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_TOKEN_STRAPI}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await res.json();

    if (!res.ok) {
      console.error("❌ Strapi Error:", responseData);
      return new Response(JSON.stringify(responseData), { status: res.status });
    }

    console.log("✅ Strapi Response:", responseData);

    // Kirim email notifikasi ke admin
    await resend.emails.send({
      from: "noreply@inotekkaryamandiri.com",
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: '📩 New Newsletter Subscription',
      html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                        <div style="background-color: #1E40AF; color: white; padding: 16px; text-align: center;">
                        <h2 style="margin: 0;">Pesan Baru dari Website</h2>
                        </div>
                        <div style="padding: 20px; background: #fafafa;">
                        <p style="font-size: 15px; color: #333;">Halo Admin,</p>
                        <p style="font-size: 15px; color: #333; margin-bottom: 20px;">
                            Ada pelanggan baru yang berlangganan newsletter melalui form website.
                        </p>
                        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; background: #fff; border-radius: 6px;">
                            <tr style="border-bottom: 1px solid #eee;">
                            <td style="font-weight: bold; color: #555;">Email</td>
                            <td style="color: #333;">${data.useremail}</td>
                            </tr>
                        </table>
                        <p style="margin-top: 20px; font-size: 13px; color: #777;">
                            Email ini dikirim otomatis dari sistem website. Mohon jangan balas langsung ke alamat ini.
                        </p>
                        </div>
                        <div style="background-color: #f3f4f6; color: #666; text-align: center; padding: 12px; font-size: 12px;">
                        © ${new Date().getFullYear()} Website NICHIHA. All rights reserved.
                        </div>
                    </div>
                    `,
    });
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    return new Response(
      JSON.stringify({ error: `Server Error: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

