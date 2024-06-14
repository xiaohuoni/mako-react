const { join } = require('path');
const {
  getRoutes,
} = require('@umijs/preset-umi/dist/features/tmpFiles/routes');

module.exports = [
  {
    async load(path) {
      console.log(some);
      const cwd = process.cwd();
      const absSrcPath = join(cwd, './src');
      const routerPath = join(absSrcPath, './routes.ts');
      // api
      const absPagesPath = join(absSrcPath, './pages');
      const api = {
        userConfig: {},
        applyPlugins: ({ initialValue }) => initialValue,
        config: {
          // 配置路由
          //routes:[]
          conventionRoutes: {
            // TODO: 这里可以指定 pages 的路径，比如指到 routes 目录
            base: absPagesPath,
            // 规定只有index文件会被识别成路由
            exclude: [
              /(?<!(index|\[index\]|404)(\.(js|jsx|ts|tsx)))$/,
              /model\.(j|t)sx?$/,
              /\.test\.(j|t)sx?$/,
              /service\.(j|t)sx?$/,
              /models\//,
              /components\//,
              /services\//,
            ],
          },
        },
        paths: {
          absApiRoutesPath: '',
          absPagesPath,
          absSrcPath,
        },
      };
      // routes
      const routes = await getRoutes({ api });
      if (path === routerPath) {
        const routesStr = Object.keys(routes)
          .map((key) => {
            const r = routes[key];
            return `{ path: '${r.path}', component: lazy(async () => {
            return await import('${r.__absFile}');
          })}`;
          })
          .join(',');
        return {
          content: `
        import { lazy } from "react";
        const routes = [${routesStr}];
        export default routes;
        `,
          type: 'ts',
        };
      }
    },
  },
];
