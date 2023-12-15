import { MarkdownService } from "ngx-markdown";

export default function(markdownService: MarkdownService, document: Document) {
  markdownService.renderer.link = (href: string, title: string | null | undefined, text: string) => {
    const external = href.startsWith('http') && !href.includes(document.defaultView?.window?.location.hostname || '');
    return `
      <a href="${href}" ${title ? 'title="' + title + '#' : ''} ${external ? 'target="_blank"' : ''}>
        ${text} ${external ? '<span class="material-icons external">open_in_new</span>' : ''}
      </a>
    `;
  };
  markdownService.renderer.image = (href: string, title: string | null, text: string) => {
    return `
      <figure>
        <img src="${href}" alt="${title || text}" />
        <figcaption>${text}</figcaption>
      </figure>
    `;
  };
  markdownService.renderer.heading = (text: string, level: number, raw: string ) => {
    const id = text.toLocaleLowerCase().replace(/\W/gm, '-');
    return `
      <h${level > 1 ? level : 2} id="${id}">${text}</h${level}>
    `;
  }
}