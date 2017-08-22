var config = {
  "name": "<%= fontName %>",
  "css_prefix_text": "icon-",
  "css_use_suffix": false,
  "hinting": true,
  "units_per_em": 1000,
  "ascent": 850,
  "glyphs": [
    <% _.each(glyphs, function(glyph, index) { %>
    {
      "uid": "<%= glyph.uid %>",
      "css": "<%= glyph.name %>",
      "code": <%= glyph.codepoint %>,
      "src": "custom_icons",
      "selected": true,
      "svg": {
        "path": "",
        "width": 1000
      },
      "search": [
        "<%= glyph.name %>"
      ]
    }<% if(index!=glyphs.length-1){ %>,<% } %>
    <% }); %>
  ]
};

export default config;