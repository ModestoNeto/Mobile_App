import { Asset } from 'expo-asset';

class AssetManager {
  private static instance: AssetManager;
  private sprites: Map<string, any>;
  private backgrounds: Map<string, any>;
  private obstacles: Map<string, any>;

  private constructor() {
    this.sprites = new Map<string, any>();
    this.backgrounds = new Map<string, any>();
    this.obstacles = new Map<string, any>();
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async loadSprites(sprites: { name: string, uri: any }[]): Promise<void> {
    for (const sprite of sprites) {
      const asset = Asset.fromModule(sprite.uri);
      await asset.downloadAsync();
      this.sprites.set(sprite.name, asset);
    }
  }

  public async loadBackgrounds(backgrounds: { name: string, uri: any }[]): Promise<void> {
    for (const background of backgrounds) {
      const asset = Asset.fromModule(background.uri);
      await asset.downloadAsync();
      this.backgrounds.set(background.name, asset);
    }
  }

  public async loadObstacles(obstacles: { name: string, uri: any }[]): Promise<void> {
    for (const obstacle of obstacles) {
      const asset = Asset.fromModule(obstacle.uri);
      await asset.downloadAsync();
      this.obstacles.set(obstacle.name, asset);
    }
  }

  public getSprite(name: string): any {
    return this.sprites.get(name);
  }

  public getBackground(name: string): any {
    return this.backgrounds.get(name);
  }

  public getObstacle(name: string): any {
    return this.obstacles.get(name);
  }
}

export default AssetManager;
