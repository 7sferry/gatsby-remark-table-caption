// noop
const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");
const toHast = require("mdast-util-to-hast");
const toHtml = require("hast-util-to-html");

module.exports = async ({markdownAST}, pluginOptions) => {
	visit(markdownAST, "table", (node) => {
		const rows = node.children;
		if (!rows || rows.length === 0) {
			return;
		}

		const lastRow = rows[rows.length - 1];
		const firstCell = lastRow.children?.[0];

		if (!firstCell) {
			return;
		}
		const text = toString(firstCell).trim();
		const captionMatch = text.match(/^\[(.+?)]$/);

		function renderCaptionHtml(hastNode, captionText) {
			return toHtml(hastNode).replace(
					/<table>/,
					`<table><caption class="gatsby-table-caption">${captionText}</caption>`
			);
		}

		function renderFigcaptionHtml(hastNode, captionText) {
			return `<figure class="gatsby-table-figure">${toHtml(hastNode).replace(/<\/table>/, `</table><figcaption class="gatsby-table-figcaption">${captionText}</figcaption>`)}</figure>`;
		}

		function getHtml(type, hastNode, captionText) {
			if (type === "figcaption") {
				return renderFigcaptionHtml(hastNode, captionText);
			}
			return renderCaptionHtml(hastNode, captionText);
		}

		if (captionMatch) {
			rows.pop();
			const captionText = captionMatch[1];
			let hastNode = toHast(node);
			const type = pluginOptions?.captionType ?? "caption";
			let html = getHtml(type, hastNode, captionText);
			node.type = "html";
			node.children = undefined;
			node.value = html;
		}
	});

	return markdownAST;
};
