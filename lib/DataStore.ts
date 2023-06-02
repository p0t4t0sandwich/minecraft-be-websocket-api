// Data Storage class

// Imports for loading plugin data
import fs from "fs";
import path, { join } from "path";
import { fileURLToPath } from 'url';

export class DataStore {
    // Properties
    private pluginName: string;
    private pluginFolder: string;
    private dataDir: string;
    private data: any;

    // Constructor
    constructor(pluginFolder: string, pluginName: string) {
        this.pluginName = pluginName;
        this.pluginFolder = pluginFolder;

        // Get path to plugins folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        this.dataDir = join(__dirname, "../" + pluginFolder + "/" + pluginName);

        // Create the plugin's storage directory if it doesn't exist
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir);
        }

        // Load data
        this.data = this.loadData();

        console.log("Loaded " + Object.keys(this.data).length + " data files from " + this.pluginName);
    }

    // Methods

    // Load data
    loadData(): any {
        const data: any = {};

        // Loop through files in data directory
        const files = fs.readdirSync(this.dataDir);
        for (const file of files) {
            // If the file is a JSON file, load it
            if (file.endsWith(".json")) {
                const dataFile = join(this.dataDir, file);
                const dataBuffer = fs.readFileSync(dataFile);

                // Load data into memory
                data[file] = JSON.parse(dataBuffer.toString());
            }
        }

        return data;
    }

    // Save data
    async saveData(): Promise<void> {
        // Loop through data stores
        for (const storeName in this.data) {
            // Save the store
            const dataFile = join(this.dataDir, storeName);
            await fs.promises.writeFile(dataFile, JSON.stringify(this.data[storeName]));
        }
    }

    // Create File
    async createDataFile(storeName: string): Promise<void> {
        // Create the store if it doesn't exist
        if (!this.data[storeName]) {
            this.data[storeName] = {};
        }
    }

    // Get data
    async getData(storeName: string): Promise<any> {
        // Create the store if it doesn't exist
        await this.createDataFile(storeName);

        return this.data[storeName];
    }

    // Set data
    async setData(storeName: string, data: any): Promise<void> {
        // Create the store if it doesn't exist
        await this.createDataFile(storeName);

        this.data[storeName] = data;

        await this.saveData();
    }
}