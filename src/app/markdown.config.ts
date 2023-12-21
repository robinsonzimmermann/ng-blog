import { MarkdownService } from "ngx-markdown";

export default function(markdownService: MarkdownService, document: Document) {
  markdownService.options = {
    
  }
  markdownService.renderer.link = (href: string, title: string | null | undefined, text: string) => {
    const external = href.startsWith('http') && !href.includes(document.defaultView?.window?.location.hostname || '');
    return `
      <a href="${href}" ${title ? 'title="' + title + '#' : ''} ${external ? 'target="_blank"' : ''}>
        ${text} ${external ? '<span class="material-icons external">open_in_new</span>' : ''}
      </a>
    `;
  };
  markdownService.renderer.image = (href: string, title: string | null, text: string) => {
    const isVideo = [
      'youtube.com'
    ].some(embed => href.includes(embed));
    if (!isVideo) {
      return `
        <figure>
          <img src="${href}" alt="${title || text}" />
          <figcaption>${text}</figcaption>
        </figure>
      `;
    } else {
      return `
        <figure>
          <iframe src="${href}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <figcaption>${text}</figcaption>
        </figure>
      `;
    }
  };
  markdownService.renderer.heading = (text: string, level: number, raw: string ) => {
    var auxDiv = document.createElement('div');
    auxDiv.innerHTML = text;
    const id = auxDiv.textContent?.toLocaleLowerCase().replace(/\W/gm, '-');
    return `
      <h${level > 1 ? level : 2} id="${id}">${text}</h${level}>
    `;
  }
}