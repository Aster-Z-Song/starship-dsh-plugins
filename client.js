window.__ModuleLoader__.load({
  id: '@local/dsh-theme-orca',
  factory() {
    // Moved unchanged from context-map. This plugin intentionally provides
    // the same dark appearance for both light/dark preferences.
    const palette = {
      '--dsw-alias-bg-base': '#0a0d12',
      '--dsw-alias-bg-layer-1': '#0f131c',
      '--dsw-alias-bg-layer-2': '#161d2b',
      '--dsw-alias-bg-overlay': '#1e2636',
      '--dsw-alias-border-l1': '#2a3241',
      '--dsw-alias-border-l2': '#3a4454',
      '--dsw-alias-label-primary': '#eee9f6',
      '--dsw-alias-label-secondary': '#c1b5ce',
      '--dsw-specific-sidebar-fill': '#0f131c',
    };
    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => ctx.theme.overrideTokens(
          '@local/dsh-theme-orca',
          Object.fromEntries(Object.entries(palette).map(([name, value]) => [name, { light: value, dark: value }])),
        ));
      },
    };
  },
});
