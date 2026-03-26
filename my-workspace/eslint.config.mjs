import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'domain:orders',
              onlyDependOnLibsWithTags: ['domain:orders', 'domain:shared'],
            },
            {
              sourceTag: 'domain:users',
              onlyDependOnLibsWithTags: ['domain:users', 'domain:shared'],
            },
            {
              sourceTag: 'domain:catalog',
              onlyDependOnLibsWithTags: ['domain:catalog', 'domain:shared'],
            },
            {
              sourceTag: 'domain:audit',
              onlyDependOnLibsWithTags: ['domain:audit', 'domain:shared'],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            },
            {
              sourceTag: 'domain:cross',
              onlyDependOnLibsWithTags: [
                'domain:cross',
                'domain:orders',
                'domain:users',
                'domain:catalog',
                'domain:audit',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:core',
                'type:ui',
                'type:util',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'type:core',
              onlyDependOnLibsWithTags: [
                'type:core',
                'type:util',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:core',
                'type:ui',
                'type:util',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util', 'domain:shared'],
            },
            {
              sourceTag: 'type:infra',
              onlyDependOnLibsWithTags: [
                'type:infra',
                'type:feature',
                'type:ui',
                'type:util',
                'domain:shared',
              ],
            },
            {
              sourceTag: 'npm:public',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
