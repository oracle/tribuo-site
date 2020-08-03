---
comment: "Jekyll will invoke this file with liquid and put generated JSON in the _site dir."
comment2: "Code based entirely on Just the Docs: https://github.com/pmarsceill/just-the-docs/blob/v0.3.1/lib/tasks/search.rake"
comment3: "under the MIT License: https://github.com/pmarsceill/just-the-docs/blob/v0.3.1/LICENSE.txt"
---
{
{%- assign i = 0 -%}
{% for page in site.html_pages %}
{%- if page.version != site.doc_version and page.version or page.search_exclude -%}
{%- continue -%}
{%- endif -%}
{%- comment -%}
"{{ page.url | slugify }}": {
    "title": "{{ page.title | xml_escape }}",
    "content": "{{page.content | strip_html | normalize_whitespace | remove:  "	" | escape | remove: "\"}}",
    "parent": "{{page.parent}}",
    "grand_parent": "{{page.grand_parent}}",
    "url": " {{ page.url | xml_escape }}"
}
{%- unless forloop.last %},{% endunless -%}
{%- endcomment -%}
  {%- assign page_content = page.content -%}
  {%- assign heading_level = site.search.heading_level | default: 2 -%}
  {%- for j in (2..heading_level) -%}
    {%- assign tag = '<h' | append: j -%}
    {%- assign closing_tag = '</h' | append: j -%}
    {%- assign page_content = page_content | replace: tag, '<h1' | replace: closing_tag, '</h1' -%}
  {%- endfor -%}
  {%- assign parts = page_content | split: '<h1' -%}
  {%- assign title_found = false -%}
  {% for part in parts offset: 1 %}
    {%- assign titleAndContent = part | split: '</h1>' -%}
    {%- assign title = titleAndContent[0] | replace_first: '>', '<h1>' | split: '<h1>' -%}
    {%- assign title = title[1] | strip_html -%}
    {%- assign content = titleAndContent[1] -%}
    {%- assign url = page.url -%}
    {%- if title == page.title and parts[0] == '' -%}
      {%- assign title_found = true -%}
    {%- else -%}
      {%- assign id = titleAndContent[0] -%}
      {%- assign id = id | split: 'id="' -%}
      {%- if id.size == 2 -%}
        {%- assign id = id[1] -%}
        {%- assign id = id | split: '"' -%}
        {%- assign id = id[0] -%}
        {%- capture url -%}{{ url | append: '#' | append: id }}{%- endcapture -%}
      {%- endif -%}
    {%- endif -%}
    {%- unless i == 0 -%},{%- endunless -%}
    "{{ i }}": {
      "doc": {{ page.title | jsonify }},
      "title": {{ title | jsonify }},
      "content": {{ content | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '<ul', ' . <ul' | replace: '</ul', ' . </ul' | replace: '<ol', ' . <ol' | replace: '</ol', ' . </ol' | replace: '</tr', ' . </tr' | replace: '<li', ' | <li' | replace: '</li',  ' | </li' | replace: '</td', ' | </td' | replace: '<td', ' | <td' | replace: '</th', ' | </th' | replace: '<th', ' | <th' | strip_html | remove: 'Table of contents' | normalize_whitespace | replace: '. . .', '.' | replace: '. .', '.' | replace: '| |', '|' | append: ' ' | jsonify }},
      "url": "{{ url | absolute_url }}",
      "relUrl": "{{ url }}"
    }
    {%- assign i = i | plus: 1 -%}
  {%- endfor -%}
  {%- unless title_found -%}
    {%- unless i == 0 -%},{%- endunless -%}
    "{{ i }}": {
        "doc": {{ page.title | jsonify }},
        "title": {{ page.title | jsonify }},
        "content": {{ parts[0] | replace: '</h', ' . </h' | replace: '<hr', ' . <hr' | replace: '</p', ' . </p' | replace: '<ul', ' . <ul' | replace: '</ul', ' . </ul' | replace: '<ol', ' . <ol' | replace: '</ol', ' . </ol' | replace: '</tr', ' . </tr' | replace: '<li', ' | <li' | replace: '</li',  ' | </li' | replace: '</td', ' | </td' | replace: '<td', ' | <td' | replace: '</th', ' | </th' | replace: '<th', ' | <th' | strip_html | remove: 'Table of contents' | normalize_whitespace | replace: '. . .', '.' | replace: '. .', '.' | replace: '| |', '|' | append: ' ' | jsonify }},
        "url": "{{ page.url | absolute_url }}",
        "relUrl": "{{ page.url }}"
    }
    {%- assign i = i | plus: 1 -%}
  {%- endunless -%}

{%- endfor -%}
}