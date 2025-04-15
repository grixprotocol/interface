import { forwardRef as reactForwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react';

export type HTMLTags = {
  div: HTMLDivElement;
  p: HTMLParagraphElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  form: HTMLFormElement;
  select: HTMLSelectElement;
  label: HTMLLabelElement;
  button: HTMLButtonElement;
  svg: SVGSVGElement;
  iframe: HTMLIFrameElement;
  link: HTMLAnchorElement;
  table: HTMLTableElement;
  tr: HTMLTableRowElement;
  th: HTMLTableCellElement;
  td: HTMLTableCellElement;
  tbody: HTMLTableSectionElement;
};

export type HTMLTag = keyof HTMLTags;

// eslint-disable-next-line @typescript-eslint/ban-types
export function forwardRef<P = {}, S extends HTMLTag = 'div', TChildren extends boolean = true>(
  render: ForwardRefRenderFunction<HTMLTags[S], P>
) {
  return reactForwardRef<HTMLTags[S], [TChildren] extends [true] ? PropsWithChildren<P> : P>((props, ref) =>
    render(props as P, ref)
  );
}
