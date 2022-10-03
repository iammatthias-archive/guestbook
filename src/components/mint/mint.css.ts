import { style } from '@vanilla-extract/css';

export const button = style({
  width: `fit-content`,
  height: `40px`,
  padding: `0 14px`,
  background: `white`,
  color: `black`,
  border: `none`,
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  fontWeight: 700,
  fontSize: `16px`,
  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
  selectors: {
    '&:hover': {
      transform: `scale(1.025)`,
    },
  },
});

export const input = style({
  width: `100%`,
  padding: `14px`,
  border: `1px solid #ccc`,
});
