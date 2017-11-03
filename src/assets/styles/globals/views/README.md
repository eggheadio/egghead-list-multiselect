# styles/globals/views

Place scss files that are topical, such as for devise, flash-area, layout, etc.

Note the `:global` is needed for CSS-Modules.

```
:global {
  .flash-area {
    position: absolute;
    top: 70px;
    left: 10%;
    z-index: $z-index-flash-area;
    width: 80%;

    .alert {
      position: absolute;
      opacity: 1;
      border-radius: 4px;
      width: 100%;
    }
  }
}
```
