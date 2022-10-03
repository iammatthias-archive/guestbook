//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import './SVG.sol';
import './Utils.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

contract Renderer {
  function render(uint256 _tokenId, string[] memory _metadata)
    public
    pure
    returns (string memory)
  {
    // address and message
    string memory _a = _metadata[0];
    string memory _m = _metadata[1];

    // split address into color codes
    string[7] memory _c = [
      string.concat('#ff', utils.getSlice(3, 6, _a)),
      string.concat('#', utils.getSlice(7, 12, _a)),
      string.concat('#', utils.getSlice(13, 18, _a)),
      string.concat('#', utils.getSlice(19, 24, _a)),
      string.concat('#', utils.getSlice(25, 30, _a)),
      string.concat('#', utils.getSlice(31, 36, _a)),
      string.concat('#', utils.getSlice(37, 42, _a))
    ];
    return _renderMetaData(_tokenId, _c, _m);
  }

  // format the NFT metadata
  function _renderMetaData(
    uint256 _tokenId,
    string[7] memory _c,
    string memory _m
  ) internal pure returns (string memory) {
    string memory _i = _renderSVG(_c, _m); // image
    return
      string.concat(
        'data:application/json;base64,',
        Base64.encode(
          bytes(
            getJSON(
              name(_tokenId),
              // image data
              Base64.encode(bytes(_i))
            )
          )
        )
      );
  }

  function name(uint256 _tokenId) internal pure returns (string memory) {
    return string.concat('Guest #', utils.uint2str(_tokenId + 1));
  }

  function getJSON(string memory _n, string memory _i)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        '{"name": "',
        _n,
        '", "image": "data:image/svg+xml;base64,',
        _i,
        '","decription": "gm.\\n\\nThis NFT commemorates signing a web3 guestbook."',
        '}'
      );
  }

  // svg building blocks

  function _renderSVG(string[7] memory _c, string memory _m)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 400" width="400" height="400" style="background:#fff;font-family:monospace">',
        _renderFrame(),
        _renderMessage(_m),
        _renderGradient(_c),
        _renderColorHexCodes(_c),
        _renderLogo(),
        '</svg>'
      );
  }

  function _renderFrame() internal pure returns (string memory) {
    return
      svg.path(
        string.concat(
          svg.prop('fill', '#fff'),
          svg.prop('stroke-width', '8'),
          svg.prop('stroke', '#000'),
          svg.prop('d', 'M4 4h392v392H4z')
        ),
        utils.NULL
      );
  }

  function _renderMessage(string memory _m)
    internal
    pure
    returns (string memory)
  {
    return
      svg.g(
        utils.NULL,
        string.concat(
          svg.animateTransform(
            string.concat(
              svg.prop('attributeName', 'transform'),
              svg.prop('attributeType', 'XML'),
              svg.prop('type', 'rotate'),
              svg.prop('from', '0 200 200'),
              svg.prop('to', '360 200 200'),
              svg.prop('dur', '120s'),
              svg.prop('repeatCount', 'indefinite')
            )
          ),
          svg.text(
            utils.NULL,
            svg.el(
              'textPath',
              string.concat(
                svg.prop('xlink:href', '#a'),
                svg.prop('font-size', '7.4')
              ),
              svg.el('tspan', utils.NULL, _m)
            )
          ),
          svg.el(
            'defs',
            utils.NULL,
            svg.path(
              string.concat(
                svg.prop('id', 'a'),
                svg.prop(
                  'd',
                  'M100 200a100 100 0 1 1 200 0 100 100 0 1 1-200 0'
                )
              ),
              utils.NULL
            )
          )
        )
      );
  }

  function _renderGradient(string[7] memory _c)
    internal
    pure
    returns (string memory)
  {
    return
      svg.g(
        utils.NULL,
        string.concat(
          svg.el(
            'defs',
            utils.NULL,
            svg.el(
              'linearGradient',
              string.concat(
                svg.prop('id', 'b'),
                svg.prop('gradientTransform', 'rotate(90)')
              ),
              _renderGradientStops(_c)
            )
          ),
          svg.circle(
            string.concat(
              svg.prop('cx', '200'),
              svg.prop('cy', '200'),
              svg.prop('r', '92'),
              svg.prop('fill', 'url(#b)')
            ),
            utils.NULL
          )
        )
      );
  }

  function _renderGradientStops(string[7] memory _c)
    internal
    pure
    returns (string memory)
  {
    return
      string.concat(
        svg.el(
          'stop',
          string.concat(svg.prop('offset', '0%'), svg.prop('stop-color', _c[0]))
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '16.6%'),
            svg.prop('stop-color', _c[1])
          )
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '33.2%'),
            svg.prop('stop-color', _c[2])
          )
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '49.8%'),
            svg.prop('stop-color', _c[3])
          )
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '66.4%'),
            svg.prop('stop-color', _c[4])
          )
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '83%'),
            svg.prop('stop-color', _c[5])
          )
        ),
        svg.el(
          'stop',
          string.concat(
            svg.prop('offset', '100%'),
            svg.prop('stop-color', _c[6])
          )
        )
      );
  }

  function _renderColorHexCodes(string[7] memory _c)
    internal
    pure
    returns (string memory)
  {
    return
      svg.text(
        string.concat(
          svg.prop('x', '35'),
          svg.prop('y', '35'),
          svg.prop('font-size', '10')
        ),
        string.concat(
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[0])),
            string.concat(_c[0], ' ')
          ),
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[1])),
            string.concat(_c[1], ' ')
          ),
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[2])),
            string.concat(_c[2], ' ')
          ),
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[3])),
            string.concat(_c[3], ' ')
          ),
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[4])),
            string.concat(_c[4], ' ')
          ),
          svg.el(
            'tspan',
            string.concat(svg.prop('fill', _c[5])),
            string.concat(_c[5], ' ')
          ),
          svg.el('tspan', string.concat(svg.prop('fill', _c[6])), _c[6])
        )
      );
  }

  function _renderLogo() internal pure returns (string memory) {
    return
      svg.path(
        string.concat(
          svg.prop('fill-rule', 'evenodd'),
          svg.prop(
            'd',
            'M24 344v4.408h3.761v10.704h3.763l.01-10.704h3.75V344H24Zm17.556 0v15.112h3.763v-4.408h3.76v4.408h3.762V344H49.08v6.297h-3.761V344h-3.763Zm17.554 0v15.126l11.286-.014v-4.408h-3.764v-4.407h-3.758v-1.889h7.522V344H59.11ZM24 362.888V378h11.285v-8.815h-3.761l-.002 4.408h-3.76v-6.297h7.523v-4.408H24Zm17.556 0V378h11.285v-15.112h-3.763v10.705h-3.76v-10.705h-3.762Zm17.554 0V378h11.286v-4.407h-3.764l.003-4.408h-3.76v-1.889h7.521v-4.408H59.11Zm17.556 0v8.815h3.763l-.002 1.89h-3.761V378h7.524v-8.815h-3.761v-1.889h3.76v-4.408h-7.523Zm13.795 0v4.408h3.763V378h3.761v-10.704l3.761.003v-4.411H90.461Zm27.589 0V378h11.284v-10.704h-7.522v-4.408h-3.763Zm3.76 8.815.002 1.89h3.759l.002-1.89h-3.763Zm13.793-8.815V378h11.286v-15.112h-11.286Zm3.764 4.408v6.297h3.758l.003-6.297h-3.761Zm13.792-4.408V378h11.287v-15.112h-11.287Zm3.764 4.408v6.297h3.758l.003-6.297h-3.761Zm13.792-4.408V378h3.763v-6.297h3.759V378H182v-8.815h-3.763v-1.889h-3.759v-4.408h-3.763Zm7.524 0-.002 4.408H182v-4.408h-3.761Z'
          ),
          svg.prop('clip-rule', 'evenodd')
        ),
        utils.NULL
      );
  }
}
