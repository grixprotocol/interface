export type TableRow = {
  [key: string]: { text: string; link: string | null };
};

export const parseMarkdownTable = (markdown: string): TableRow[] => {
  const lines = markdown.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('Invalid markdown table: should have at least a header row and a delimiter row.');
  }

  const headers = lines[0]
    .trim()
    .split('|')
    .map((header) => stripMarkdownStyles(header.trim()))
    .filter((header) => header.length > 0);

  const dataRows = lines.slice(2);
  const table: TableRow[] = dataRows.map((line) => {
    const cells = line
      .trim()
      .split('|')
      .map((cell) => cell.trim())
      .slice(1, -1);

    return headers.reduce<TableRow>((acc, header, index) => {
      const strippedCell = stripMarkdownStyles(cells[index]);
      acc[header] = extractMarkdownLink(strippedCell);
      return acc;
    }, {});
  });

  return table;
};

const stripMarkdownStyles = (markdown: string) =>
  markdown
    .replace(/\*\*(.*?)\*\*/g, '$1') // **text**
    .replace(/\*(.*?)\*/g, '$1') // *text*
    .replace(/__(.*?)__/g, '$1') // __text__
    .replace(/_(.*?)_/g, '$1'); // _text_

const extractMarkdownLink = (markdown: string) => {
  const match = markdown.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) {
    return { text: markdown, link: null };
  }
  const [, text, link] = match;
  return { text, link };
};
