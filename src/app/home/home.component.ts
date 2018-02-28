import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Entry<any>[];
  categories: Entry<any>[];
  featuredArticle: Entry<any>;
  featuredArticleTitle: string;
  featuredArticleImage: object;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getProducts()
    .then(articles => {
      console.log('HomeComponent get articles', articles);
      this.articles = articles;
      this.getFeaturedArticle();
    });

    this.contentfulService.getCategories()
    .then(categories => {
      console.log('HomeComponent get categories', categories);
      this.categories = categories;
    });
  }

  getFeaturedArticle() {
    const filteredArticles = this.articles.filter(article => {
      return article.fields.articleCategory[0].fields.categoryTitle === 'Featured Article';
    });
    this.featuredArticle = filteredArticles[0];
    console.log('this.featuredArticle', this.featuredArticle);

    this.featuredArticleTitle = this.featuredArticle.fields.articleTitle;
    this.featuredArticleImage = this.featuredArticle.fields.articleFeaturedImage;
  }

}
