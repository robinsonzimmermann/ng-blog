
export function getPermalink(title: string, date?: Date | undefined): string {
  const formattedDate = date ?
    `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}` :
    'unpublished';

  const titleDirectoryName = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-');

  return `${formattedDate}/${titleDirectoryName}`;
}
