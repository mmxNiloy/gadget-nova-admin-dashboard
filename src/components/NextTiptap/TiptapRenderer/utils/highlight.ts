import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import * as prod from 'react/jsx-runtime';
import type { JSX } from 'react';
import { codeToHast } from 'shiki';

export async function highlight(code: string, lang: string) {
  const out = await codeToHast(code, {
    lang,
    themes: {
      light: 'github-light-default',
      dark: 'one-dark-pro'
    }
    //  structure: "inline",
  });

  return toJsxRuntime(out as any, {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    components: {
      pre: ({ children }) => children as any
    }
  }) as JSX.Element;
}
