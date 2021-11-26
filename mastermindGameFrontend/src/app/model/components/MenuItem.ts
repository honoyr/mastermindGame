export class MenuItem {
  label: string;
  path: string;
  icon?: string;
  enabled?: boolean;

  constructor(label: string, icon: string, url: string, enabled: boolean) {
    this.label = label;
    this.icon = icon;
    this.path = url;
    this.enabled = enabled;
  }
}
