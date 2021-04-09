---
title: Pronounced
theme: blog
critical:
  - css/blocks/button-pronounce.css
scripts:
  inline:
    - "scripts/index.js"
---
People sometimes [have trouble](https://twitter.com/ashur/status/1313899815823011840) saying my name.

It's pronounced <span class="[][ visually-hidden ][]">Asher</span> <button class="[][][ button-pronounce ]" aria-hidden="true">/'a-sher/ {% svgmin %}{% include ("images/icon-pronounce-button.svg") %}{% endsvgmin %}</button>. It rhymes with {{ rhymes.slice( 0, rhymes.length - 1 ) | join( ", ") }}, and {{ rhymes[rhymes.length - 1] }}.

Thanks!
