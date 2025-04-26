
module.exports = {
  expo: {
    name: "ProyectoNodos",
    slug: "proyectonodos",
    extra: {
      ngrokTimeout: 120000,
      eas: {
        projectId: "your-project-id"
      }
    },
    updates: {
      url: "https://u.expo.dev/your-project-id"
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://n.expo.dev",
        }
      ]
    ]
  }
};
