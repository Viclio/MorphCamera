# Updating the Morph Camera manual

The manual is plain HTML: open `index.html` in any browser. Nothing needs to be built.

```
Manual/
  index.html        all the text: edit this
  UPDATING.md       this file
  assets/
    manual.css      look (colours, layout): rarely touched
    manual.js       builds the menu, figure numbers, version labels, image zoom
  media/            screenshots (.png) and films (.mp4)
```

## New add-on version

Change one line near the top of `index.html`:

```html
<meta name="addon-version" content="1.7.0">
```

Every place that shows the version (sidebar, header, install step) updates itself.
Then add an entry at the top of the **Version history** section.

## New feature or sub-topic

Copy an existing `<section>` and change its `id` and `<h2>`:

```html
<section id="my-feature" data-since="1.8.0">
  <h2>My feature</h2>
  <p class="lead">One sentence: what it does.</p>
  ...
  <h3 id="my-feature-option">An option</h3>
  ...
</section>
```

- The sidebar menu is built from every `<section id>` (its `<h2>`) and every `<h3 id>`.
  Ids must be unique and contain no spaces.
- `data-since="1.8.0"` adds a "since 1.8.0" badge to the heading. Remove it after a few versions.
- `data-part="Motion Camera"` on a section starts a new group in the menu.
- A shorter menu label: `<h2 data-toc="Short name">Long heading</h2>`.

## Pictures and films

Put files in `media/`, then:

```html
<figure>
  <img src="media/my_shot.png" alt="What the picture shows">
  <figcaption>What the reader should notice.</figcaption>
</figure>

<figure>
  <video src="media/my_film.mp4" controls muted loop playsinline preload="metadata"></video>
  <figcaption>...</figcaption>
</figure>
```

- Figure numbers are added automatically. Every image can be clicked to see it full size.
- Two or four pictures side by side: wrap the figures in `<div class="side">…</div>`.
- Text beside a narrow picture (a panel or dialog): `<div class="with-figure"><div>text</div><figure>…</figure></div>`.
- Dialog screenshots: `<figure class="dialog">` keeps them at their natural size.

## Other building blocks

| Purpose | HTML |
| --- | --- |
| Note | `<div class="callout"><strong>Title</strong><p>Text</p></div>` |
| Warning | `<div class="callout warn">…</div>` |
| Tip | `<div class="callout tip">…</div>` |
| Numbered steps | `<ol class="steps"><li>…</li></ol>` |
| Formula | `<div class="formula">a = b ÷ c</div>` |
| Blender UI name | `<span class="ui">Hold Frames</span>` |
| Menu path | `<span class="path">Add › Camera › Morph Camera</span>` |
| Key | `<kbd>I</kbd>` |

## Media naming used so far

| Prefix | Content |
| --- | --- |
| `ui_` | Properties editor panels |
| `dlg_` | Operator dialogs |
| `interp_` | Viewport: Morph Interpolation paths |
| `graph_` | Graph Editor: Blend curves |
| `bake_` | Bake results |
| `film_` | Rendered example films (Workbench, 250 frames) |
| `trail_` | Viewport: Motion Camera trail around a still Base |
| `motion_` | Motion Camera bake results |
| `poster_` | First image shown on each film before it plays (frame 111) |

The example films come from `P:\Blender\MorphCamDemo\Features\MorphCamDemo1_Features.blend`
(cameras named `MCF_…`). Comparison films are single renders placed side by side.
The Motion Camera films are rendered by `Features\run_motion.py` (one Blender run per film).

## Publishing

The manual is published by GitHub Pages from the `docs` folder of
https://github.com/Viclio/MorphCamera (Settings › Pages: branch `main`, folder `/docs`).
After editing, commit and push: the site updates by itself within a minute or two.
Keep the empty `.nojekyll` file: it tells GitHub to publish the files as they are.
Don't store the films with Git LFS: GitHub Pages doesn't serve LFS files.
