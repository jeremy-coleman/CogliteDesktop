

// NOTE: this is the global app config type definition
declare var AppConfig : {
    production?: boolean;
    env?: any;
    basePath?: string,
	publicPath?: any,
	fabricFontBasePath?: any,
	fabricIconBasePath?: any,
	buildVersion?: any,
	buildDate?: any,
	configId?: any,
};

// Global variable used to open info dialog only on first visit
declare global {
  interface Window { isFirstVisit: boolean; }
}