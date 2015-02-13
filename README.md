# My gulpfile

CSSメタ言語を使うと、気がつくとリリース用のCSSファイルを触られて、「マージが大変」とかある。逆に、リリース後のCSSを触れることを前提として、出力前のCSSにマージしやすい思想で作ってみてる。

そんなことをいいつつ、単純にSassとかStylusとかに、飽きてきたというのもある。

とりあえず的な。

## 必要なもの

- Node.js
- gulp
- Bower

下記のコマンドで、Bowerさんも入るようにしている

```
gulp i
```


## CSSでやってること

- @importの結合（パーシャル的な）
- Media Queriesの結合
- autoprefixer
- Source Maps

## CSSで迷ってること

- IE8のフォールバック
- postcss-assetsの導入
- pixremの導入
