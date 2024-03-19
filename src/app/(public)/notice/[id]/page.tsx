import { ReadNotice } from '@/components/notice/ReadNotice';
import { getData } from './_getData';

// Metadata
export async function generateMetadata({ params }: { params: { id: any } }) {
  const notice = await getData(params.id);

  return {
    title: `${notice.title} - 더와이 컨설팅`,
    description: notice.body.substring(0, 120),
  };
}

export default async function ReadNoticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const notice = await getData(id);

  return <ReadNotice id={id} notice={notice} />;
}
