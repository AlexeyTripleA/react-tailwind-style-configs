# react-tailwind-style-configs

A minimal set of configuration files for React projects using:
- **Tailwind CSS** (utility-first framework)
- **PostCSS** with
    - `postcss-import`
    - `postcss-simple-vars`
    - `@tailwindcss/nesting`
    - **Tailwind’s PostCSS plugin**
    - `autoprefixer`
- **CSS-Modules** support via `.module.pcss`
- **Class Variance Authority (CVA)**

This repository contains only the core config files. Copy them into your project, install the listed dependencies, and you’re ready to go.

---

## Files

- **`postcss.config.js`** - PostCSS setup: import, vars, nesting, Tailwind, autoprefixer

- **`tailwind.config.js`** - Tailwind content paths and theme extension

- **`webpack.config.js`** - Rules for `.pcss` and `.module.pcss` with `postcss-loader`

- **`types/global.d.ts`** - Global declaration file for using css modules with typescript


---

## Installation of packages

Choose your package manager and install all necessary packages:

```bash
# npm
npm install --save-dev \
  webpack webpack-cli webpack-dev-server \
  css-loader style-loader postcss-loader \
  postcss postcss-import postcss-simple-vars @tailwindcss/nesting tailwindcss autoprefixer \
  class-variance-authority

# yarn
yarn add -D \
  webpack webpack-cli webpack-dev-server \
  css-loader style-loader postcss-loader \
  postcss postcss-import postcss-simple-vars @tailwindcss/nesting tailwindcss autoprefixer \
  class-variance-authority
  
# ...Other package managers are similar
```

## Setting up the project

1. Copy postcss.config.js, tailwind.config.js to the root of your project. If you are using webpack, copy the rules from webpack.config.js.
2. Create a global stylesheet, for example src/styles/index.pcss with the following content:
```scss
@import "tailwindcss";

// ... your custom imports, eg variables file
// ... your custom styles
```

3. Import it into your entry point (src/index.jsx), like this:
```js
import './styles/index.pcss';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

4. If you are using TypeScript and want to use CSS Modules:

Create a global declaration file In your project root, add a file at `types/global.d.ts` (or any path you prefer):
```ts
   // types/global.d.ts
   declare module '*.module.pcss' {
     const classes: { [key: string]: string };
     export default classes;
   }
```

And include it in your tsconfig.json
```json
{
  "compilerOptions": {
    /* ... your existing settings ... */
  },
  "include": [
    /* ... your existing paths ... */
    "types/global.d.ts"
  ]
}
```

## Usage
Okay, now you can use it like in the examples below:

### Tailwind classes, nested classes and variables:
Source:
```scss
// SomeBlockStyles.pcss
$defaultPadding: 1rem;

.Block {
  @apply rounded-md text-gray-900 bg-blue-500;

  &__Element {
    @apply font-bold text-lg;
    padding: $defaultPadding;

    &--Modifier {
      @apply font-light;
      padding: 1.5rem;
    }
  }
}
``` 

Result:
```scss
.Block {
  // ...tailwind styles of classes rounded-md text-gray-900 bg-blue-500
}
.Block__Element {
  // ...tailwind styles of classes font-bold text-lg
  padding: 1rem;
}
.Block__Element--Modifier {
  // ...tailwind styles of font-light class
  padding: 1.5rem;
}
```

### imports:
```scss
// variables.pcss
$brand-color: #60F6D2;
```

```scss
// styles.pcss
@import "variables.pcss";

.BrandButton {
  background-color: $brand-color;
}
```

Result:
```pcss
.BrandButton {
  background-color: #60F6D2;
}
```

### Modules:

**don't forget to include types if you use ts*
```scss
// Test.module.pcss
.test {
  background-color: green;
}
```

Using modules in JavaScript (similarly in typescript):
```js
// Test.jsx
import styles from './Test.module.pcss'

export default function () {
  return (
    <div className={styles.test}>Styled with css module</div>
  )
}
```


### Class Variance Authority (CVA)


```js
// Button.jsx
const buttonStyles = cva('btn-base', {
  variants: {
    state: {
      active: 'bg-green-500',
      disabled: 'bg-gray-500'
    }
  },
  defaultVariants: { state: 'active' }
})

export default function () {
  const isDisabled = false

  return (
    <div className={buttonStyles({ state: isDisabled ? 'disabled' : 'active' })}>
      Click me
    </div>
  )
}
```

## Enjoy using!
If you have any difficulties using the configs or have any suggestions, please write an issue or create a pull request to make changes.