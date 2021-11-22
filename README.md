# Kirby Vite UnoCSS Kit

A powerful and performant integration of [Vite](https://vitejs.dev), [UnoCSS](https://github.com/antfu/unocss) and [Kirby](https://getkirby.com). This project seeks to provide a best practice that combines these three solutions while focusing on the developer experience.

## Key Features

- ⚡️ [Vite](https://vitejs.dev) – with all its bells and whistles
- 📑 [Module system](./src/modules) inspired by Nuxt.js
- 💡 [On-demand template loading](./src/templates)
- 🪄 Page reload on PHP snippet/template changes
- 🎨 [UnoCSS](https://github.com/antfu/unocss) – on-demand atomic CSS engine similar to Tailwind CSS
- 🤹‍♀️ [Pure CSS icons](https://github.com/antfu/unocss/tree/main/packages/preset-icons/) – use any icon as a single class
- 🔍 [SEO-friendly](https://github.com/johannschopplich/kirby-extended/blob/main/docs/meta.md) defaults
- 🦾 TypeScript, of course

## Why UnoCSS

tl;dr: Write your CSS like you prefer to and pull in only the utilities you need on top.

Let me cite Anthony Fu:

> UnoCSS is an atomic-CSS engine instead of a framework. Everything is designed with flexibility and performance in mind. In UnoCSS, there are no core utilities; all functionalities are provided via presets.
>
> By default, UnoCSS applies the default preset. Which provides a common superset of the popular utilities-first framework, including Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.

For example, for this kit only the following utilities are generated:

```css
/* layer: shortcuts */
.box{padding:1rem;margin-left:auto;margin-right:auto;--un-bg-opacity:1;background-color:rgba(244,244,245,var(--un-bg-opacity));border-radius:0.375rem;--un-shadow-color:0,0,0;--un-shadow:0 1px 2px 0 rgba(var(--un-shadow-color), 0.05);box-shadow:var(--un-ring-offset-shadow, 0 0 #0000), var(--un-ring-shadow, 0 0 #0000), var(--un-shadow);max-width:7xl;}
/* layer: default */
.px-4{padding-left:1rem;padding-right:1rem;}
.py-4{padding-top:1rem;padding-bottom:1rem;}
.mx-auto{margin-left:auto;margin-right:auto;}
.mb-4{margin-bottom:1rem;}
.max-w-screen-md{max-width:768px;}
```

You may also want to give this blog post a read [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css) for the story behind.

## How It Works

When running `npm run dev`:

1. The [@unocss/cli](https://github.com/antfu/unocss/tree/main/packages/cli) is given the glob pattern `site/{layouts,snippets,templates}/**/*` via the `uno` npm script. Once started, it scans each directory and collects all occuring utility class names.
   The CSS for these classes will be generated by UnoCSS and the output saved to `src/styles/uno.css`.
   Each time one of the PHP files changes, the UnoCSS will generate the latest `uno.css` accordingly.

2. At the same time, the Vite development server will be started. It build the JavaScript assets, but also also the [`main.scss`](./src/styles/main.scss), which itself uses the `uno.css` in the same directory.
   Vite will watch for JavaScript asset changes or changes in the `main.scss` (or consequently `uno.css`) and manages those with its HMR capabilities.

3. Vite will also reload the page, if any of the PHP files get changed, so you won't have to reload the window yourself when updating your layout.

## Installation

1. Duplicate the [`.env.development.example`](./.env.development.example) as `.env`:

```bash
cp .env.development.example .env
```

1. Install the required npm dependencies:

```bash
pnpm install
```

1. Install the required Composer dependencies:

```bash
composer install
```

## Configuration

To add custom rules or shortcuts, edit the [`unocss.config.ts`](./unocss.config.ts).

For example, this project already defines a `box` class via a shortcut:

```js
shortcuts: {
  'box': 'max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4'
}
```

## Usage

### Development

1. Start the Vite development server and watch for file changes accordingly:

```bash
npm run dev
```

1. Run the PHP built-in web server or use a development web server of your choice (like Laravel Valet).

```bash
composer start
```

### Production

Build the frontend assets:

```bash
npm run build
```

If you have caching enabled, make sure to wipe the cache after each build:

```bash
rm -rf storage/cache/<your-website>
```

### Deployment

> ℹ️ See [ploi-deploy.sh](./scripts/ploi-deploy.sh) for deployment instructions.

> ℹ️ For Apache web servers: Some hosting environments require to uncomment `RewriteBase /` in [`.htaccess`](./public/.htaccess) to make site links work.

## License

[MIT](./LICENSE) License © 2021 [Johann Schopplich](https://github.com/johannschopplich)
