export class Image {
  center: string;
  date_created: string;
  description: string;
  keywords: Array<{id: number, text: string}> = [];
  media_type: string;
  nasa_id: string;
  photographer: string;
  title: string;
  href: string;
}
