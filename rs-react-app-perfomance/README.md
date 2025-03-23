# React Performance

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Results of app perfomance check:

- before use react memo, useMemo and useCallback:

  | num   | user interact  | render dur | commit dur | causes       | component max dur | why rendered  |
  | ----- | -------------- | ---------- | ---------- | ------------ | ----------------- | ------------- |
  | 1     | first render   | 23.6ms     | 0.1s       | createRoot   | Main/App          | first timeren |
  | 2     | first render   | 104.9ms    | 3.3s       | Main         | CardListTemplate  | props changed |
  | 3     | first render   | 66.6ms     | 3.4s       | Main         | CardListTemplate  | props changed |
  | 4 - 9 | search country | 0.5-0.7ms  | 22-24.9s   | Search       | Search            |
  | 10    | submit search  | 2.1ms      | 26.7s      | Search,Main  | CardListTemplate  | props changed |
  | 5     | select region  | 28.2ms     | 3.4s       | Filters,Main | Sort              | props changed |
  | 6     | select field   | 20.3ms     | 4.2s       | Sort, Main   | Card              | parent comp   |
  | 7     | select order   | 14.4ms     | 6s         | Sort, Main   | CardListTemplate  | props changed |
  | 8     | change order   | 17.3ms     | 7.9s       | Sort, Main   | CardListTemplate  | props changed |
  | 9     | reset sorting  | 15.2ms     | 11.4s      | Sort, Main   | Card              | parent comp   |

  - after use react memo, useMemo and useCallback:

  | num   | user interact  | render dur | commit dur | causes       | component max dur | why rendered   |
  | ----- | -------------- | ---------- | ---------- | ------------ | ----------------- | -------------- |
  | 1     | firs render    | 33.7ms     | 0.1s       | createRoot   | CardListTemplate  | first time ren |
  | 2     | firs render    | 107.8ms    | 0.9s       | Main         | CardListTemplate  | props changed  |
  | 3     | firs render    | 59.3ms     | 1s         | Main         | CardListTemplate  | props changed  |
  | 4 - 9 | search country | 0.5-0.8ms  | 3.9 -5.1s  | Search       | Search            |
  | 10    | submit search  | 6ms        | 6.9s       | Search,Main  | CardListTemplate  | props changed  |
  | 5     | select region  | 30.1ms     | 3.1s       | Filters,Main | CardListTemplate  | props changed  |
  | 6     | select field   | 6.9ms      | 3.1s       | Sort, Main   | CardListTemplate  | props changed  |
  | 7     | select order   | 3.4ms      | 4.5s       | Sort, Main   | CardListTemplate  | props changed  |
  | 8     | change order   | 3.2ms      | 5.8s       | Sort, Main   | CardListTemplate  | props changed  |
  | 9     | reset sorting  | 2.9ms      | 7.2s       | Sort, Main   | CardListTemplate  | props changed  |

## List of images:

- before use react memo, useMemo and useCallback:

  - flame links

    1. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(978).png>)
    2. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(979).png>)
    3. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(980).png>)
    4. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(981).png>)
    5. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(982).png>)
    6. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(986).png>)
    7. [search submit](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(988).png>)
    8. [select region](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1008).png>)
    9. [select field](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1018).png>)
    10. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1028).png>)
    11. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1031).png>)
    12. [reset sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1040).png>)

  - ranked links

    1. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(988).png>)
    2. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(989).png>)
    3. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(990).png>)
    4. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(991).png>)
    5. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(992).png>)
    6. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(993).png>)
    7. [search submit](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1002).png>)
    8. [select region](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1006).png>)
    9. [select field](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1021).png>)
    10. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1021).png>)
    11. [reset](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/before/Screenshot%20(1041).png>)

- after use react memo, useMemo and useCallback:

  - flame links

    1. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1119).png>)
    2. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1120).png>)
    3. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1121).png>)
    4. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1122).png>)
    5. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1123).png>)
    6. [search submit](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1133).png>)
    7. [select region](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1140).png>)
    8. [select field](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1147).png>)
    9. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1148).png>)
    10. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1149).png>)
    11. [reset sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1150).png>)

  - ranked links

    1. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1124).png>)
    2. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1126).png>)
    3. [first render](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1127).png>)
    4. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1128).png>)
    5. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1129).png>)
    6. [search](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1131).png>)
    7. [search submit](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1132).png>)
    8. [select region](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1138).png>)
    9. [select field](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1143).png>)
    10. [select sort](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1145).png>)
    11. [reset](<https://github.com/Jjjulietta/rs-react-project/blob/performance/rs-react-app-perfomance/public/after/Screenshot%20(1146).png>)

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
