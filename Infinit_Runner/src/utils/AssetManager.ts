import { Asset } from 'expo-asset';

interface AssetItem {
  name: string;
  uri: any;
}

class AssetManager {
  private static instance: AssetManager;
  private sprites: Map<string, Asset>;
  private backgrounds: Map<string, Asset>;
  private obstacles: Map<string, Asset>;

  private constructor() {
    this.sprites = new Map<string, Asset>();
    this.backgrounds = new Map<string, Asset>();
    this.obstacles = new Map<string, Asset>();
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async loadSprites(sprites: AssetItem[]): Promise<void> {
    for (const sprite of sprites) {
      const asset = Asset.fromModule(sprite.uri);
      await asset.downloadAsync();
      this.sprites.set(sprite.name, asset);
    }
  }

  public async loadBackgrounds(backgrounds: AssetItem[]): Promise<void> {
    for (const background of backgrounds) {
      const asset = Asset.fromModule(background.uri);
      await asset.downloadAsync();
      this.backgrounds.set(background.name, asset);
    }
  }

  public async loadObstacles(obstacles: AssetItem[]): Promise<void> {
    for (const obstacle of obstacles) {
      const asset = Asset.fromModule(obstacle.uri);
      await asset.downloadAsync();
      this.obstacles.set(obstacle.name, asset);
    }
  }

  public getSprite(name: string): Asset | undefined {
    return this.sprites.get(name);
  }

  public getBackground(name: string): Asset | undefined {
    return this.backgrounds.get(name);
  }

  public getObstacle(name: string): Asset | undefined {
    return this.obstacles.get(name);
  }
}

export default AssetManager;
