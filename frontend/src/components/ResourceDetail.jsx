import React from 'react'
import katex from 'katex';
import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";

export default function ResouceDetail() {
  const t = "- Volume = (4/3) \pi R 3 Surface area =4 \pi R 2 Volume =\pi H(R 2-r 2) Curved Surface area =2 \pi R H+2 \pi r H=2 \pi H(R+r) Total surface area =2 \pi H(R+r)+2 \pi(R 2-r 2)"
  const text = katex.renderToString("$\sqrt{3x-1}+(1+x)^2$", {
    throwOnError: false
  });
  const mathJaxOptions = {
    svg: {
      scale: 1,                      // global scaling factor for all expressions
      minScale: .5,                  // smallest scaling factor to use
      mtextInheritFont: false,       // true to make mtext elements use surrounding font
      merrorInheritFont: true,       // true to make merror text use surrounding font
      mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
      skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
      exFactor: .5,                  // default size of ex in em units
      displayAlign: 'center',        // default for indentalign when set to 'auto'
      displayIndent: '0',            // default for indentshift when set to 'auto'
      fontCache: 'local',            // or 'global' or 'none'
      localID: null,                 // ID to use for local font cache (for single equation processing)
      internalSpeechTitles: true,    // insert <title> tags with speech content
      titleID: 0                     // initial id number to use for aria-labeledby titles
    }
  }

  return (
    // <div dangerouslySetInnerHTML={{__html:text}}>
    //   {/* {text} */}
    // </div>
    <>
      <MathJaxProvider options={mathJaxOptions} />
      <Tex2SVG display="inline" latex="e^{i \pi} + 1 = 0" />
    </>
  )
}
