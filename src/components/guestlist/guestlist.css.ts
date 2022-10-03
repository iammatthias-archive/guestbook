import { style } from '@vanilla-extract/css';

export const guestWrapper = style({
  display: `grid`,
  gridTemplateColumns: `1fr`,
  gridAutoRows: `minmax(min-content, max-content)`,
  paddingBottom: 16,
  borderBottom: `1px solid #ccc`,
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: `2fr 1fr`,
    },
  },
  selectors: {
    '&:last-child': {
      borderBottom: `none`,
    },
  },
});

export const address = style({
  gridColumn: `1`,
});

export const block = style({
  gridColumn: `1`,
  textAlign: `left`,
  '@media': {
    'screen and (min-width: 768px)': {
      gridColumn: `2`,
      textAlign: `right`,
    },
  },
});

export const message = style({
  gridColumn: `1`,
  '@media': {
    'screen and (min-width: 768px)': {
      gridColumn: `1 / 3`,
    },
  },
});
