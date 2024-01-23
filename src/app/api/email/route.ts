import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { type SendMailOptions } from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, subject, body } = (await req.json()) as SendMailPayload;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const options: SendMailOptions = {
      from: email,
      to: 'thewhy@thewhy.kr',
      subject: '더와이컨설팅 홈페이지 문의 메일 알림',
      html: `
        <h2>제목 : ${subject}</h2>
        <h3>작성자 : ${name} 님 (${email})</h3>
        <p>${body}</p>
      `,
    };

    await transporter.sendMail(options);

    return NextResponse.json({ message: `${subject} 메일 발송!` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
