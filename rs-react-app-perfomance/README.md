# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Results of app perfomance check:

- before use react memo, useMemo and useCallback:

  | num | user interaction |render duration| commit duration| causes | component max dur | why rendered | flame graph | ranked chart
  | 1 | first render |23.6ms | 0.1s | createRoot | Main | Main/App| first time ren|
  | 2 | first render | 104.9ms| 3.3s | Main | CardListTemplate | props changed |
  | 3 | first render |66.6ms | 3.4s | Main | CardListTemplate | props changed |
  |4 - 9| search country |0.5 - 0.7ms | 21.9 - 24.9s | Search | Search |
  | 10| submit search| 2.1ms|26.7s | Search, Main| CardListTemplate,Main| props changed |
  | 5 | select region |28.2ms | 3.4s |Filters, Main| Sort |props changed|
  | 6 | select sort field|20.3ms | 4.2s |Sort, Main | Card | parent component |
  | 7 | select sort order|14.4ms | 6s |Sort, Main | CardListTemplate | props changed |
  | 8 | change sort order|17.3ms | 7.9s |Sort, Main | CardListTemplate | props changed |
  | 9 |reset all sorting |15.2ms | 11.4s |Sort, Main | Card | parent component |

  - after use react memo, useMemo and useCallback:

  | num | user interaction |render duration| commit duration| causes | component max dur | why rendered | flame graph | ranked chart
  | 1 | firs render |33.7ms | 0.1s | createRoot | CardListTemplate | first time ren|
  | 2 | firs render | 107.8ms|0.9s | Main | CardListTemplate | props changed |
  | 3 | firs render |59.3ms | 1s | Main | CardListTemplate | props changed |
  |4 - 9| search country |0.5-0.8ms | 3.9 -5.1s | Search | Search |
  | 10| submit search| 6ms|6.9s | Search, Main| CardListTemplate| props changed |
  | 5 | select region |30.1ms | 3.1s |Filters, Main| CardListTemplate |props changed|
  | 6 | select sort field| 6.9ms | 3.1s |Sort, Main | CardListTemplate | props changed |
  | 7 | select sort order|3.4ms | 4.5s |Sort, Main | CardListTemplate | props changed |
  | 8 | change sort order| 3.2ms | 5.8s |Sort, Main | CardListTemplate | props changed |
  | 9 |reset all sorting | 2.9ms | 7.2s |Sort, Main | CardListTemplate | props changed |

## List of images:

- before use react memo, useMemo and useCallback:

  - flame
    1 ![first render][1] , [1]: /src/assets/screenchots/Screenshot (978).png 'Flame 1'
    2 ![first render][2] , [2]:Screenshot (979).png 'Flame 2'
    3 ![first render][3] , [3]:Screenshot (980).png 'Flame 3'
    4 ![search][4] , [4]:Screenshot (981).png 'Flame 4'
    5 ![search][5] , [5]:Screenshot (982).png 'Flame 5'
    6 ![search][6] , [6]:Screenshot (986).png 'Flame 6'
    7 ![search submit][7] , [7]:Screenshot (988).png 'Flame 7'
    8 ![select region][8] , [8]:Screenshot (1008).png 'Flame 8'
    9 ![select field][9] , [9]:Screenshot (1018).png 'Flame 9'
    10 ![select sort][10] , [10]:Screenshot (1028).png 'Flame 10'
    11 ![select sort][11] , [11]:Screenshot (1031).png 'Flame 11'
    12 ![reset sort][12] , [12]:Screenshot (1040).png 'Flame 12'

  - ranked
    1 ![first render][1r] , [1r]:Screenshot (988).png 'Ranked 1'
    2 ![first render][2r] , [2r]:Screenshot (989).png 'Ranked 2'
    3 ![first render][3r] , [3r]:Screenshot (990).png 'Ranked 3'
    4 ![search][4r] , [4r]:Screenshot (991).png 'Ranked 4'
    5 ![search][5r] , [5r]:Screenshot (992).png 'Ranked 5'
    6 ![search][6r] , [6r]:Screenshot (993).png 'Ranked 6'
    7 ![search submit][7r] , [7r]:Screenshot (1002).png 'Ranked 7'
    8 ![select region][8r] , [8r]:Screenshot (1006).png 'Ranked 8'
    9 ![select field][9r] , [9r]:Screenshot (1021).png 'Ranked 9'
    10 ![select sort][10r] , [10r]:Screenshot (1021).png 'Ranked 10'
    11 ![reset][11r] , [11r]:Screenshot (1041).png 'Ranked 11'

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
