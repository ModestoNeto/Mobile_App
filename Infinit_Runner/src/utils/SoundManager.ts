import { Audio } from 'expo-av';

interface SoundItem {
  name: string;
  uri: any;
}

class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, Audio.Sound>;

  private constructor() {
    this.sounds = new Map<string, Audio.Sound>();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public async loadSounds(sounds: SoundItem[]): Promise<void> {
    for (const sound of sounds) {
      const { sound: audioSound } = await Audio.Sound.createAsync(sound.uri);
      this.sounds.set(sound.name, audioSound);
    }
  }

  public async playSound(name: string): Promise<void> {
    const sound = this.sounds.get(name);
    if (sound) {
      await sound.playAsync();
    }
  }

  public async stopSound(name: string): Promise<void> {
    const sound = this.sounds.get(name);
    if (sound) {
      await sound.stopAsync();
    }
  }

  public async stopAll(): Promise<void> {
    for (let sound of this.sounds.values()) {
      await sound.stopAsync();
    }
  }
}

export default SoundManager;
