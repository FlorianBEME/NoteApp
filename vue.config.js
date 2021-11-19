module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Note",
        appId: "NoteByFlorianBEME",
        win: {
          target: ["nsis"],
          icon: "public/icon.ico",
          requestedExecutionLevel: "requireAdministrator",
        },
        nsis: {
          installerIcon: "public/icon.ico",
          uninstallerIcon: "public/icon.ico",
          uninstallDisplayName: "Uninstall",
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
};
