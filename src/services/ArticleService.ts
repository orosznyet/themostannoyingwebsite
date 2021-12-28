import { articles } from '@/contents';
import { Article, ArticleStatic } from '@/types';
import ReactDOMServer from 'react-dom/server';

interface ArticleFilter {
  isHighlighted?: boolean;
}

interface ArticleSort {
  date: 'asc' | 'desc';
}

class ArticleService {
  public getAll(): Article[] {
    return articles;
  }

  public getAllFiltered(filter: ArticleFilter, sort?: ArticleSort): Article[] {
    const results = articles.filter(article => {
      return (article.isHighlighted === filter.isHighlighted);
    });

    if (sort) {
      return results.sort((a, b) => {
        return a.date.getTime() - b.date.getTime() * (sort.date === 'asc' ? 1 : -1);
      });
    }

    return results;
  }

  public getBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
  }

  public getStatic(article: Article): ArticleStatic {
    return {
      ...article,
      body: ReactDOMServer.renderToString(article.body as React.ReactElement),
      date: article.date.toISOString(),
    }
  }
}

export default new ArticleService();
