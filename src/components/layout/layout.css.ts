import { style, globalStyle } from '@vanilla-extract/css';

export const layout = style({
  display: `flex`,
  flexDirection: `column`,
  gap: `16px`,
});

export const content = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  gridAutoRows: `minMax(min-content, max-content)`,
  gap: `16px`,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: `1fr 1fr`,
    },
  },
});

globalStyle(`p`, {
  maxWidth: `60ch`,
});
