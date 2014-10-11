# jQuery domAutocomplete

#### jQuery plugin that allows you to make autocomplete from DOM

## Usage

1. Include jQuery and plugin's code:
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="dist/domAutocomplete.jquery.min.js"></script>
```

2. Call the plugin:
```javascript
$('input').domAutocomplete({
  datas: '.keyword',
  limit: 10,
  insensitive: true
});
```
