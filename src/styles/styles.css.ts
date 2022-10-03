import { style } from '@vanilla-extract/css';

export const logo = style({
  lineHeight: 1,
  fontSize: `12px`,
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: `16px`,
    },
  },
});

export const logoWrapper = style({
  display: `flex`,
  flexDirection: `column`,
  gap: `16px`,
});

export const section = style({
  margin: `16px`,
  padding: `16px`,
  display: `flex`,
  flexDirection: `column`,
  gap: `32px`,
  minHeight: `fit-content`,
  selectors: {
    '&:last-child': {
      border: `1px solid #ccc`,
    },
  },
});

export const stickySection = style({
  position: `relative`,
  '@media': {
    'screen and (min-width: 768px)': {
      position: `sticky`,
      top: 16,
      alignSelf: `start`,
    },
  },
});

export const listSection = style({
  maxWidth: `calc(100vw - 32px)`,
  '@media': {
    'screen and (min-width: 768px)': {
      maxWidth: `100%`,
    },
  },
});

export const meta = style({
  paddingBottom: `32px`,
  borderBottom: `1px solid #000`,
  display: `flex`,
  flexDirection: `row`,
  flexWrap: `wrap`,
  gap: `16px`,
  justifyContent: `space-between`,
});

export const metaItem = style({
  width: `100%`,
  '@media': {
    'screen and (min-width: 768px)': {
      width: `unset`,
    },
  },
});

export const overflow = style({
  overflow: `hidden`,
  textOverflow: `ellipsis`,
  whiteSpace: `nowrap`,
});
