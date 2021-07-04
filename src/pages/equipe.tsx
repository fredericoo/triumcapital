import { GetStaticProps } from 'next';
import { client } from '@/utils/prismic';
import TeamScreen from '@/screens/team';
import { PrismicDocument } from '@/utils/types';
import { RichTextBlock } from 'prismic-reactjs';
import { MemberData } from '@/components/MemberCard';

type TeamDocument = {
  title: RichTextBlock[];
  quote: RichTextBlock[];
  members: { member: PrismicDocument<MemberData> }[];
};
export type TeamProps = { doc: PrismicDocument<TeamDocument> };

const Team: React.FC<TeamProps> = ({ doc }) => {
  if (!doc?.data) return null;
  return <TeamScreen doc={doc} />;
};

export const getStaticProps: GetStaticProps<TeamProps> = async ({ locale }) => {
  const doc = await client.getSingle('equipe', {
    lang: locale || '*',
    fetchLinks: ['membro.title', 'membro.image', 'membro.content'],
  });

  return {
    props: {
      doc: doc || {},
    },
    revalidate: 600,
  };
};

export default Team;
