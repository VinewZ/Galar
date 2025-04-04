import { app } from "@wailsjs/go/models";

type PluginLoaderProps = {
  plugin: app.Plugin;
}

const API_URL = "http://127.0.0.1:9999/api/plugins/";

export function PluginLoader({ plugin }: PluginLoaderProps) {

  if (!plugin) {
    return null;
  }

  return (
      <div className="w-fulll h-full">
        <iframe
          id="plugin-iframe"
          className="w-full h-full"
          src={`${API_URL}${plugin.dir}/dist/${plugin.entry}`}
        />
      </div>
  );
}

