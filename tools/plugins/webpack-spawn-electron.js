const spawn = require('child_process').spawn;
const electron = require('electron')


class WebpackElectronPlugin {

      apply(compiler) {
       let electronStarted = false;
          compiler.hooks.afterEmit.tap('webpack-shell-plugin-next', () => {
       if (!electronStarted) {
          electronStarted = true;
            console.log('WebpackShellPlugin> Starting Electron');
            spawn(electron, ["."], { stdio: "inherit" })
              .on("close", async () => {
                process.exit(0)
              });
            }
          }
        )
      }
}

module.exports = WebpackElectronPlugin