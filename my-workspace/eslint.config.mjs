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
          enforceBuildableLibDependency: false,
          allowCircularSelfDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['layer:use-cases', 'scope:shared'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:csmgmt',
              onlyDependOnLibsWithTags: ['scope:csmgmt', 'scope:shared'],
            },
            {
              sourceTag: 'scope:ps',
              onlyDependOnLibsWithTags: ['scope:ps', 'scope:shared'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'type:types',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'layer:use-cases',
              onlyDependOnLibsWithTags: ['layer:state', 'layer:types', 'scope:shared'],
            },
            {
              sourceTag: 'layer:state',
              onlyDependOnLibsWithTags: ['layer:data-access', 'layer:types', 'scope:shared'],
            },
            {
              sourceTag: 'layer:data-access',
              onlyDependOnLibsWithTags: ['layer:types', 'scope:shared'],
            },
            {
              sourceTag: 'layer:types',
              onlyDependOnLibsWithTags: [],
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
    rules: {},
  },
];
