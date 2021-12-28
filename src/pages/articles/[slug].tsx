import LockedContent from "@/components/tricks/LockedContent";
import ArticleService from "@/services/ArticleService";
import { GetServerSideProps, NextPage } from "next";
import Error from 'next/error';
import Head from "next/head";

interface Props {
  slug: string;
}

const ArticleItem: NextPage<Props> = ({ slug }: Props) => {
  const article = ArticleService.getBySlug(slug);

  if (!article) {
    return <Error statusCode={404} />
  }

  return (
    <main>
      <Head>
        <title>{article.title}</title>
      </Head>
      <h1>{article.title}</h1>
      <LockedContent initialMaxHeight={200}>
        {article.body}
      </LockedContent>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.query.slug as string;
  return {
    props: { slug },
  };
};

export default ArticleItem;
