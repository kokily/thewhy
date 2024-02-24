import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import moment from 'moment';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  const client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const originalFilename = file.name.replaceAll('_', '');
  const fileName = `${moment().format(
    'YYYYMMDDHHmm',
  )}${originalFilename.trim()}`;

  try {
    if (!file) {
      throw new Error('파일 업로드 실패');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const date = new Date();

    date.setMinutes(date.getMinutes() + 1);

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: buffer,
    });

    await client.send(command);

    return NextResponse.json({
      url: `https://${process.env.S3_BUCKET}/${fileName}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
