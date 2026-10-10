// Scheme -> semester -> links. Empty string = not collected yet.
export type Kind = 'notes' | 'pyq';

export interface MaterialRow {
  scheme: '2019' | '2023';
  semester: number;
  notes: string;
  pyq: string;
}

export const schemes = ['2023', '2019'] as const;

export const materials: MaterialRow[] = [
  { scheme: '2023', semester: 6, notes: 'https://drive.google.com/drive/folders/1qPShngtkjooZL1FW1TwAA6BS-Ue6xcfj', pyq: '' },
  { scheme: '2023', semester: 5, notes: 'https://drive.google.com/drive/folders/1A_4rFXlIvEbfk7rFVJX8yd9HJZAi9e7S', pyq: 'https://drive.google.com/drive/folders/1mUuubgXooWwkUDwwmYkDqCCiLXLKsFUI?usp=drive_link' },
  { scheme: '2023', semester: 4, notes: 'https://drive.google.com/drive/folders/1xD2CspGymDjJrIAzFxb58osySwmhIrlE', pyq: 'https://drive.google.com/drive/folders/1nSpQc9pUHsSHUHEPIq9xRMLCFomNnWDj?usp=drive_link' },
  { scheme: '2023', semester: 3, notes: 'https://drive.google.com/drive/folders/1yiIL4xffU_Vlxh92U_TiBIv3o5gB0s5p', pyq: 'https://drive.google.com/drive/folders/10067GEGUCv2MNsOatvjcCYQX_p808v9R?usp=drive_link' },
  { scheme: '2023', semester: 2, notes: '', pyq: '' },
  { scheme: '2023', semester: 1, notes: '', pyq: '' },
  { scheme: '2019', semester: 8, notes: 'https://drive.google.com/drive/folders/1w33E_k4UQI291wMlHw6bm8Lmp1wFFZpO?usp=drive_link', pyq: '' },
  { scheme: '2019', semester: 7, notes: 'https://drive.google.com/drive/folders/1mZGBKGpAVd_3eIeIeZKrkgsmbIioNB5f?usp=drive_link', pyq: '' },
  { scheme: '2019', semester: 6, notes: 'https://drive.google.com/drive/folders/1wxxsocX0U46-bG6HEGM2UoS8LCEZXVCG?usp=drive_link', pyq: 'https://drive.google.com/drive/folders/1UEEqEMc-jMdf_hb_r-7jwPTidXqWn6Pd?usp=drive_link' },
  { scheme: '2019', semester: 5, notes: 'https://drive.google.com/drive/folders/1JiBnt9Fi9m6Wg96-PryUaBhAMW4_x9tw?usp=drive_link', pyq: 'https://drive.google.com/drive/folders/1MQbkwzRqXHRTXjkJn-y6Rhh74eWPyuKq?usp=drive_link' },
  { scheme: '2019', semester: 4, notes: 'https://drive.google.com/drive/folders/1Oiv4DCJ8isZfWMNzyQS6YDcLH11Qx82q?usp=drive_link', pyq: '' },
  { scheme: '2019', semester: 3, notes: 'https://drive.google.com/drive/folders/1XCClv9KlCtYAY6HwEQ3DHxH0U6TkGGu2?usp=drive_link', pyq: 'https://drive.google.com/drive/folders/1WoUJuc-VMGRd57YUeaD5wyDwOmq9-rD-?usp=drive_link' },
  { scheme: '2019', semester: 2, notes: '', pyq: '' },
  { scheme: '2019', semester: 1, notes: '', pyq: '' },
];
