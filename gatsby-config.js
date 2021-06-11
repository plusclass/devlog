module.exports = {
  siteMetadata: {
    title: `devlog`,
    author: `dev-team`,
    description: `プラスクラスdevチームによるテックブログ。日々の実務で活用している技術や役に立った知見を発信していきます。`,
    siteUrl: `https://dev.plus-class.jp`,
    bio: {
      goran: {
        name: "goran_nasai",
        slug: "goran",
        color: "#A138D9",
        text: "フロントエンド。シンプルで速いWebが好きです。",
        site: "https://goran-nasai.com/"
      },
      motoi: {
        name: "motoi_dev",
        slug: "motoi",
        color: "#000",
        text: "てすと",
        site: "https://motoi.dev/"
      }
    },
    categories: [
      {
        name: "Vue/Nuxt",
        slug: "vue",
        color: "#42b983",
      },
      {
        name: "React/Next",
        slug: "reat",
        color: "#61dafb",
      },
      {
        name: "Firebase",
        slug: "firebase",
        color: "#FFA000",
      },
      {
        name: "JavaScript",
        slug: "javascript",
        color: "#00458b",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        color: "#3178c6",
      },
      {
        name: "SEO",
        slug: "seo",
        color: "#000",
      },
      {
        name: "dev",
        slug: "dev",
        color: "#000",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 650,
              height: 365,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                simple: {
                  classes: "simple",
                  title: "optional",
                },
                info: {
                  classes: "info",
                  title: "optional",
                },
                alert: {
                  classes: "alert",
                  title: "optional",
                },
                notice: {
                  classes: "notice",
                  title: "optional",
                },
                imageSmall: {
                  classes: "image-small",
                },
                imageMedium: {
                  classes: "image-medium",
                },
              },
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devlog`,
        short_name: `dev`,
        start_url: `/`,
        background_color: `#F5F5F7`,
        theme_color: `#0000`,
        display: `minimal-ui`,
        icon: `content/assets/avatar.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-29224954-3",
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
};