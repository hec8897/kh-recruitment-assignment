import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      // Import 순서 규칙
      'import/order': [
        'error',
        {
          groups: [
            'builtin',   // Node.js 내장 모듈
            'external',  // npm 패키지
            'internal',  // 내부 alias (@/)
            ['parent', 'sibling'],  // 상위/같은 디렉토리
            'index',     // index 파일
            'type',      // 타입 import
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // 중복 import 방지
      'import/no-duplicates': 'error',
      // 순환 의존성 방지
      'import/no-cycle': ['error', { maxDepth: 10 }],
      // self import 방지
      'import/no-self-import': 'error',
    },
  },
])
