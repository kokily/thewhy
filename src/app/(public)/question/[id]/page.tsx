import { ReadQuestion } from '@/components/question/ReadQuestion';
import { getData } from './_getData';

export async function generateMetadata({ params }: { params: { id: any } }) {
  const question = await getData(params.id);

  return {
    title: `${question.title} - 더와이 컨설팅`,
    description: question.body.substring(0, 120),
  };
}

export default async function ReadQuestionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ReadQuestion id={id} />;
}
