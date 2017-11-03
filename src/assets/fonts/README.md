1. Put fonts in this directory, including eot, svg, ttf, woff files.
2. Reference these files in _fonts.scss

This is an example of what you would do for the OpenSans fonts.

```scss
$fonts-url-path: "../../fonts";

$opensans-light-path: "#{$fonts-url-path}/OpenSans-Light";
$opensans-regular-path: "#{$fonts-url-path}/OpenSans-Regular";
$opensans-semibold-path: "#{$fonts-url-path}/OpenSans-Semibold";
$opensans-bold-path: "#{$fonts-url-path}/OpenSans-Bold";

@font-face {
  font-family: "OpenSans";
  font-weight: 300;
  font-style: normal;
  src: url("#{$opensans-light-path}.eot");
  src: url("#{$opensans-light-path}.eot?#iefix") format("embedded-opentype"),
       url("#{$opensans-light-path}.woff") format("woff"),
       url("#{$opensans-light-path}.ttf") format("truetype");
}

@font-face {
  font-family: "OpenSans";
  font-weight: 400;
  font-style: normal;
  src: url("#{$opensans-regular-path}.eot");
  src: url("#{$opensans-regular-path}.eot?#iefix") format("embedded-opentype"),
  url("#{$opensans-regular-path}.woff") format("woff"),
  url("#{$opensans-regular-path}.ttf") format("truetype");
}

@font-face {
  font-family: "OpenSans";
  font-weight: 600;
  font-style: normal;
  src: url("#{$opensans-semibold-path}.eot");
  src: url("#{$opensans-semibold-path}.eot?#iefix") format("embedded-opentype"),
  url("#{$opensans-semibold-path}.woff") format("woff"),
  url("#{$opensans-semibold-path}.ttf") format("truetype");
}

@font-face {
  font-family: "OpenSans";
  font-weight: 700;
  font-style: normal;
  src: url("#{$opensans-bold-path}.eot");
  src: url("#{$opensans-bold-path}.eot?#iefix") format("embedded-opentype"),
       url("#{$opensans-bold-path}.woff") format("woff"),
       url("#{$opensans-bold-path}.ttf") format("truetype");
}
```
