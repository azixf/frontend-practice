export default {
  install(app) {
    const components = import.meta.glob("@/components/global/*.vue");
    Object.entries(components).forEach(([path, mod]) => {
      mod().then(component => {
        app.component(component.default.name, component.default);
      });
    });
  },
};
