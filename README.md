This plugin will add link on headers for your markdown.

To install, run `npm install gatsby-remark-table-caption gatsby-transformer-remark`. This plugin requires
gatsby-transformer-remark.

In gatsby-config, add this under `gatsby-transformer-remark`:

```js
plugins: [{
	//other plugins...

	resolve: `gatsby-transformer-remark`,
	options: {
		plugins: {
			//other remark-plugins...

					resolve: `gatsby-remark-table-caption`,
			options: {
				captionType: `caption`, //could be `figcaption` for sub-title figcaption. Default is `caption`.
			},
		},
	}
}]
```

Insert the caption at the last row between square brackets `[]`. Example:

```
| Fruit  | Color  |
|--------|--------|
| Apple  | Red    |
| Banana | Yellow |
[Tropical Fruits Table]
```

The `Tropical Fruits Table` will be the caption. It only works with single cells between square brackets.
