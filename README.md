## Thanks to
[catnone99](https://github.com/catnose99)

## Markdown

There are some custom blocks for Markdown(will be automatically converted to styled blocks).

### Set meta data

You have to set post meta data in frontmatter(At the top of each markdown file).

```
title: Example title
date: "2019-01-28T22:40:32.169Z"
description: "This text will be used as meta/og description"
category: "design"
```

_cagegory: must be just 1 category_

### Custom Blocks

#### Gray colored block

```
[[simple | title here]]
| content here
```

#### Info block

```
[[info | title here]]
| content here
```

#### Alert block

```
[[alert | title here]]
| content here
```

#### Notice block

```
[[notice | title here]]
| content here
```

#### Advance

You can use lists like this

```
[[alert | Danger! ]]
| - Don't smoke.
| - Don't each to much.
| - Don't stay home.
```

### Licence
MIT (except for images/icons/blog contents)

You are not allowed to use or distribute images/icons/blogContents included in this project.

### Made with
[Gatsby.js](https://github.com/gatsbyjs/gatsby)